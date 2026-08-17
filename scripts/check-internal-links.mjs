import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'

import GithubSlugger from 'github-slugger'

const repositoryRoot = process.cwd()
const contentRoot = path.join(repositoryRoot, 'content')

async function walk(directory) {
  const files = []

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...await walk(absolutePath))
    } else {
      files.push(absolutePath)
    }
  }

  return files
}

function routeFromFile(file) {
  const relativePath = path
    .relative(contentRoot, file)
    .split(path.sep)
    .join('/')
  const withoutExtension = relativePath.slice(0, -4)

  if (withoutExtension === 'index') return '/'
  if (withoutExtension.endsWith('/index')) {
    return `/${withoutExtension.slice(0, -6)}`
  }
  return `/${withoutExtension}`
}

function maskFencedCode(source) {
  let insideFence = false

  return source
    .split('\n')
    .map(line => {
      if (/^\s*```/.test(line)) {
        insideFence = !insideFence
        return ' '.repeat(line.length)
      }
      return insideFence ? ' '.repeat(line.length) : line
    })
    .join('\n')
}

function headingText(markdown) {
  return markdown
    .replace(/<[^>]+>/g, '')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*~]/g, '')
    .replaceAll('&bull;', '•')
    .replaceAll('&rarr;', '→')
    .replaceAll('&amp;', '&')
    .trim()
}

function anchorsFromSource(source) {
  const anchors = new Set()
  const slugger = new GithubSlugger()

  for (const line of maskFencedCode(source).split('\n')) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line)
    if (!match) continue

    const text = headingText(match[2])
    if (text) anchors.add(slugger.slug(text))
  }

  return anchors
}

function lineAt(source, offset) {
  return source.slice(0, offset).split('\n').length
}

function normalizeTarget(sourceRoute, rawTarget) {
  const decodedTarget = rawTarget.replaceAll('&amp;', '&')

  if (decodedTarget.startsWith('#')) {
    return `${sourceRoute}${decodedTarget}`
  }
  if (decodedTarget.startsWith('/')) return decodedTarget

  const baseRoute = sourceRoute === '/'
    ? '/'
    : `${path.posix.dirname(sourceRoute)}/`
  return path.posix.resolve(baseRoute, decodedTarget)
}

async function publicAssetExists(routePath) {
  try {
    const asset = await stat(path.join(repositoryRoot, 'public', routePath.slice(1)))
    return asset.isFile()
  } catch {
    return false
  }
}

const mdxFiles = (await walk(contentRoot)).filter(file => file.endsWith('.mdx'))
const sourceByFile = new Map()
const routeByFile = new Map()
const fileByRoute = new Map()

for (const file of mdxFiles) {
  const route = routeFromFile(file)
  routeByFile.set(file, route)
  fileByRoute.set(route, file)
  sourceByFile.set(file, await readFile(file, 'utf8'))
}

const routesByLowercase = new Map()
for (const route of fileByRoute.keys()) {
  const lowercaseRoute = route.toLowerCase()
  const routes = routesByLowercase.get(lowercaseRoute) ?? []
  routes.push(route)
  routesByLowercase.set(lowercaseRoute, routes)
}

const anchorsByRoute = new Map()
for (const [file, route] of routeByFile) {
  anchorsByRoute.set(route, anchorsFromSource(sourceByFile.get(file)))
}

const findings = []

for (const file of mdxFiles) {
  const source = sourceByFile.get(file)
  const searchableSource = maskFencedCode(source)
  const sourceRoute = routeByFile.get(file)
  const candidates = []
  const markdownLinkPattern = /(!?)\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^)]*)?\)/g
  const hrefPattern = /\bhref=["']([^"']+)["']/g

  for (const match of searchableSource.matchAll(markdownLinkPattern)) {
    if (match[1] === '!') continue
    candidates.push({ target: match[2], offset: match.index })
  }
  for (const match of searchableSource.matchAll(hrefPattern)) {
    candidates.push({ target: match[1], offset: match.index })
  }

  for (const candidate of candidates) {
    const rawTarget = candidate.target
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(rawTarget)) continue
    if (rawTarget.startsWith('{') || rawTarget.includes('<') || rawTarget.includes('>')) continue

    const normalizedTarget = normalizeTarget(sourceRoute, rawTarget)
    const hashIndex = normalizedTarget.indexOf('#')
    const targetWithoutHash = hashIndex < 0
      ? normalizedTarget
      : normalizedTarget.slice(0, hashIndex)
    const routePath = targetWithoutHash
      .split('?', 1)[0]
      .replace(/\/$/, '') || '/'

    if (await publicAssetExists(routePath)) continue

    if (!fileByRoute.has(routePath)) {
      const caseMatches = routesByLowercase.get(routePath.toLowerCase()) ?? []
      findings.push({
        type: caseMatches.length === 1 ? 'route casing' : 'missing route',
        file,
        line: lineAt(source, candidate.offset),
        target: rawTarget,
        suggestion: caseMatches.length === 1 ? caseMatches[0] : undefined
      })
      continue
    }

    if (hashIndex < 0) continue

    const anchor = decodeURIComponent(normalizedTarget.slice(hashIndex + 1))
    if (!anchor || anchorsByRoute.get(routePath).has(anchor)) continue

    findings.push({
      type: 'missing anchor',
      file,
      line: lineAt(source, candidate.offset),
      target: rawTarget
    })
  }
}

if (findings.length > 0) {
  for (const finding of findings) {
    const location = `${path.relative(repositoryRoot, finding.file)}:${finding.line}`
    const suggestion = finding.suggestion ? `; use ${finding.suggestion}` : ''
    console.error(`${location}: ${finding.type}: ${finding.target}${suggestion}`)
  }
  console.error(`Internal link check failed with ${findings.length} finding(s).`)
  process.exit(1)
}

console.log(`Checked internal routes and anchors across ${mdxFiles.length} MDX files.`)
