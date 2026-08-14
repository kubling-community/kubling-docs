import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname, origin, search } = request.nextUrl

  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next()
  }

  const lowercasePath = pathname.toLowerCase()

  if (pathname !== lowercasePath) {
    return NextResponse.redirect(new URL(`${origin}${lowercasePath}${search}`))
  }

  return NextResponse.next()
}
