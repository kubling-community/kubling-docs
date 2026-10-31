'use client'

import { useMemo, useRef, useState } from 'react'
import {
  providerCatalog,
  providerCapabilities,
  providerCategories,
  providerDistributionChannels,
  providerKinds
} from './provider-catalog-data'

const allCategories = 'All categories'
const allKinds = 'All types'
const allCapabilities = 'All capabilities'
const allDistributions = 'All distributions'
const pageSize = 12

export default function ProviderCatalog() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(allCategories)
  const [kind, setKind] = useState(allKinds)
  const [capability, setCapability] = useState(allCapabilities)
  const [distribution, setDistribution] = useState(allDistributions)
  const [page, setPage] = useState(1)
  const resultsRef = useRef<HTMLDivElement>(null)

  const providers = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()

    return providerCatalog
      .filter(provider => {
        const matchesCategory =
          category === allCategories || provider.category === category
        const matchesKind = kind === allKinds || provider.kind === kind
        const matchesCapability =
          capability === allCapabilities ||
          provider.capabilities.some(value => value === capability)
        const matchesDistribution =
          distribution === allDistributions ||
          provider.distributions.some(value => value.channel === distribution)
        const searchableText = [
          provider.name,
          provider.description,
          provider.category,
          provider.kind,
          provider.status,
          provider.publisher,
          ...provider.capabilities,
          ...provider.distributions.flatMap(value => [
            value.channel,
            value.identifier
          ]),
          ...provider.keywords
        ]
          .join(' ')
          .toLocaleLowerCase()

        return (
          matchesCategory &&
          matchesKind &&
          matchesCapability &&
          matchesDistribution &&
          (!normalizedQuery || searchableText.includes(normalizedQuery))
        )
      })
      .sort((left, right) => left.name.localeCompare(right.name))
  }, [capability, category, distribution, kind, query])

  const pageCount = Math.ceil(providers.length / pageSize)
  const pageStart = (page - 1) * pageSize
  const visibleProviders = providers.slice(pageStart, pageStart + pageSize)
  const rangeStart = providers.length === 0 ? 0 : pageStart + 1
  const rangeEnd = pageStart + visibleProviders.length

  const hasFilters =
    query.trim() !== '' ||
    category !== allCategories ||
    kind !== allKinds ||
    capability !== allCapabilities ||
    distribution !== allDistributions

  function clearFilters() {
    setQuery('')
    setCategory(allCategories)
    setKind(allKinds)
    setCapability(allCapabilities)
    setDistribution(allDistributions)
    setPage(1)
  }

  function goToPage(nextPage: number) {
    setPage(nextPage)
    window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <div className="not-prose mt-8">
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/60">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 md:col-span-2 lg:col-span-4 dark:text-gray-200">
            Search
            <input
              type="search"
              value={query}
              onChange={event => {
                setQuery(event.target.value)
                setPage(1)
              }}
              placeholder="Name, technology, capability or package"
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-gray-950 outline-none transition focus:border-kubling-green focus:ring-2 focus:ring-kubling-green/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Category
            <select
              value={category}
              onChange={event => {
                setCategory(event.target.value)
                setPage(1)
              }}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-gray-950 outline-none transition focus:border-kubling-green focus:ring-2 focus:ring-kubling-green/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
            >
              <option>{allCategories}</option>
              {providerCategories.map(value => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Type
            <select
              value={kind}
              onChange={event => {
                setKind(event.target.value)
                setPage(1)
              }}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-gray-950 outline-none transition focus:border-kubling-green focus:ring-2 focus:ring-kubling-green/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
            >
              <option>{allKinds}</option>
              {providerKinds.map(value => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Capability
            <select
              value={capability}
              onChange={event => {
                setCapability(event.target.value)
                setPage(1)
              }}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-gray-950 outline-none transition focus:border-kubling-green focus:ring-2 focus:ring-kubling-green/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
            >
              <option>{allCapabilities}</option>
              {providerCapabilities.map(value => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Distribution
            <select
              value={distribution}
              onChange={event => {
                setDistribution(event.target.value)
                setPage(1)
              }}
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-gray-950 outline-none transition focus:border-kubling-green focus:ring-2 focus:ring-kubling-green/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
            >
              <option>{allDistributions}</option>
              {providerDistributionChannels.map(value => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
          <p className="m-0 text-gray-600 dark:text-gray-400" aria-live="polite">
            Showing {rangeStart}–{rangeEnd} of {providers.length}{' '}
            {providers.length === 1 ? 'provider' : 'providers'}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-md px-2 py-1 font-medium text-kubling-green hover:bg-kubling-green/10 focus:outline-none focus:ring-2 focus:ring-kubling-green/30"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {providers.length > 0 ? (
        <div ref={resultsRef} className="scroll-mt-20 pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {visibleProviders.map(provider => (
              <article
                key={provider.name}
                className="flex min-h-72 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-kubling-green/50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="m-0 text-xl font-semibold text-gray-950 dark:text-white">
                      {provider.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      by {provider.publisher}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <span className="rounded-full bg-kubling-green/10 px-2.5 py-1 text-xs font-semibold text-teal-700 dark:text-teal-300">
                      {provider.status}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:bg-neutral-800 dark:text-gray-300">
                      {provider.kind}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  {provider.description}
                </p>

                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {provider.category}
                </p>

                {provider.capabilities.length > 0 && (
                  <div
                    className="mt-3 flex flex-wrap gap-2"
                    aria-label={provider.name + ' capabilities'}
                  >
                    {provider.capabilities.map(value => (
                      <span
                        key={value}
                        className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-800 dark:border-teal-900 dark:bg-teal-950/50 dark:text-teal-200"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-4">
                  <p className="m-0 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Available as
                  </p>
                  <div
                    className="mt-2 flex flex-wrap gap-2"
                    aria-label={provider.name + ' distribution channels'}
                  >
                    {provider.distributions.map(value => {
                      const isExternal = value.href.startsWith('http')

                      return (
                        <a
                          key={value.channel}
                          href={value.href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noreferrer' : undefined}
                          title={value.identifier}
                          aria-label={`${provider.name}: ${value.channel} (${value.identifier})`}
                          className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition hover:border-kubling-green/50 hover:bg-kubling-green/5 hover:text-kubling-green focus:outline-none focus:ring-2 focus:ring-kubling-green/30 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-200 dark:hover:border-kubling-green/60 dark:hover:bg-kubling-green/10"
                        >
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-kubling-green"
                          />
                          {value.channel}
                          {isExternal && (
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="h-3.5 w-3.5"
                            >
                              <path
                                d="M6 3h7v7M13 3 5 11"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </a>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-4 border-t border-gray-100 pt-4 text-sm dark:border-neutral-800">
                  <a
                    href={provider.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-kubling-green hover:underline"
                  >
                    Documentation and source
                  </a>
                </div>
              </article>
            ))}
          </div>

          {pageCount > 1 && (
            <nav
              aria-label="Provider catalog pagination"
              className="mt-6 flex items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:border-kubling-green hover:text-kubling-green focus:outline-none focus:ring-2 focus:ring-kubling-green/30 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-950 dark:text-gray-200"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {page} of {pageCount}
              </span>
              <button
                type="button"
                onClick={() => goToPage(page + 1)}
                disabled={page === pageCount}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:border-kubling-green hover:text-kubling-green focus:outline-none focus:ring-2 focus:ring-kubling-green/30 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-950 dark:text-gray-200"
              >
                Next
              </button>
            </nav>
          )}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-neutral-700">
          <p className="m-0 font-medium text-gray-800 dark:text-gray-200">
            No providers match these filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 rounded-md px-3 py-1.5 text-sm font-medium text-kubling-green hover:bg-kubling-green/10 focus:outline-none focus:ring-2 focus:ring-kubling-green/30"
          >
            Show all providers
          </button>
        </div>
      )}

    </div>
  )
}
