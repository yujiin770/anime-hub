<<<<<<< HEAD
import { useEffect, useMemo, useRef, useState } from 'react'
=======
>>>>>>> origin/main
import AnimeCard from './AnimeCard'
import { getTopAnime, searchAnime, transformAnimeData } from '../services/animeApi'

<<<<<<< HEAD
const PAGE_LIMIT = 24
const INITIAL_SKELETON_COUNT = 12

const normalize = (text = '') => text.toLowerCase().trim()

function rankSearchResults(items, query) {
  const q = normalize(query)

  if (!q) return items

  return [...items].sort((a, b) => {
    const aTitle = normalize(a.title)
    const bTitle = normalize(b.title)

    const aExact = aTitle === q ? 1 : 0
    const bExact = bTitle === q ? 1 : 0
    if (aExact !== bExact) return bExact - aExact

    const aStarts = aTitle.startsWith(q) ? 1 : 0
    const bStarts = bTitle.startsWith(q) ? 1 : 0
    if (aStarts !== bStarts) return bStarts - aStarts

    const aIncludes = aTitle.includes(q) ? 1 : 0
    const bIncludes = bTitle.includes(q) ? 1 : 0
    if (aIncludes !== bIncludes) return bIncludes - aIncludes

    return (b.rating || 0) - (a.rating || 0)
  })
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/85 p-4">
      <div className="h-64 animate-pulse rounded-xl bg-slate-700/70" />
      <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-slate-700/70" />
      <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-slate-700/60" />
      <div className="mt-5 flex gap-2">
        <div className="h-8 flex-1 animate-pulse rounded-lg bg-slate-700/60" />
        <div className="h-8 flex-1 animate-pulse rounded-lg bg-slate-700/60" />
      </div>
    </div>
  )
}

export default function AnimeGrid({ searchQuery }) {
  const [animeList, setAnimeList] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const sentinelRef = useRef(null)
  const trimmedQuery = searchQuery.trim()

  useEffect(() => {
    setPage(1)
    setAnimeList([])
    setHasMore(true)
    setError(null)
  }, [trimmedQuery])

  useEffect(() => {
    let cancelled = false

    const fetchPage = async () => {
      if (!hasMore) return

      try {
        if (page === 1) {
          setLoading(true)
        } else {
          setLoadingMore(true)
        }
        setError(null)

        const rawData = trimmedQuery
          ? await searchAnime(trimmedQuery, page)
          : await getTopAnime(page, PAGE_LIMIT)

        if (cancelled) return

        const transformed = rawData.map(transformAnimeData)
        const ranked = trimmedQuery ? rankSearchResults(transformed, trimmedQuery) : transformed

        setAnimeList((prev) => {
          const existing = new Set(prev.map((item) => item.id))
          const dedupedNew = ranked.filter((item) => !existing.has(item.id))
          return [...prev, ...dedupedNew]
        })

        setHasMore(rawData.length >= PAGE_LIMIT)
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load anime')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
          setLoadingMore(false)
        }
      }
    }

    fetchPage()

    return () => {
      cancelled = true
    }
  }, [page, trimmedQuery, hasMore])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || loading || loadingMore || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1)
        }
      },
      { rootMargin: '700px 0px' }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [loading, loadingMore, hasMore])

  const sectionTitle = useMemo(() => {
    return trimmedQuery ? 'Search Results' : 'Anime Library'
  }, [trimmedQuery])
=======
export default function AnimeGrid({ searchQuery }) {
  const page = 1
  const trimmedQuery = searchQuery.trim()

  const { anime: topAnime, loading: topLoading, error: topError } = useTopAnime(page)
  const { anime: searchResults, loading: searchLoading, error: searchError } = useSearchAnime(trimmedQuery)

  const displayAnime = trimmedQuery ? searchResults : topAnime
  const loading = trimmedQuery ? searchLoading : topLoading
  const error = trimmedQuery ? searchError : topError
>>>>>>> origin/main

  return (
    <section id="library" className="mx-auto mt-14 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 sm:p-6">
<<<<<<< HEAD
        <h2 className="font-heading text-3xl font-semibold text-white">{sectionTitle}</h2>
        <p className="mt-1 text-sm text-slate-300">
          {trimmedQuery
            ? `Showing direct anime results for "${trimmedQuery}".`
            : 'Scroll down to load more anime continuously.'}
        </p>
      </div>

      {loading && animeList.length === 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: INITIAL_SKELETON_COUNT }).map((_, idx) => (
            <SkeletonCard key={`skeleton-initial-${idx}`} />
=======
        <h2 className="font-heading text-3xl font-semibold text-white">Anime Library</h2>
        <p className="mt-1 text-sm text-slate-300">
          {trimmedQuery
            ? `Showing direct results for "${trimmedQuery}".`
            : 'Showing top anime picks.'}
        </p>
      </div>

      {loading && (
        <div className="py-14 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-cyan-300" />
          <p className="mt-3 text-slate-300">Loading anime...</p>
        </div>
      )}

      {!loading && error && (
        <div className="mt-6 rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 text-sm text-rose-200">
          {error}
        </div>
      )}

      {!loading && !error && displayAnime.length === 0 && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-base text-slate-200">No anime found.</p>
          <p className="mt-1 text-sm text-slate-400">Try another anime title in search.</p>
        </div>
      )}

      {!loading && !error && displayAnime.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayAnime.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
>>>>>>> origin/main
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mt-6 rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 text-sm text-rose-200">
          {error}
        </div>
      )}

      {!loading && !error && animeList.length === 0 && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-base text-slate-200">No anime found.</p>
          <p className="mt-1 text-sm text-slate-400">Try another anime title in search.</p>
        </div>
      )}

      {animeList.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {animeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}

          {loadingMore &&
            Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonCard key={`skeleton-more-${idx}`} />
            ))}
        </div>
      )}

      <div ref={sentinelRef} className="h-2 w-full" />

      {!loading && !loadingMore && !hasMore && animeList.length > 0 && (
        <p className="mt-6 text-center text-xs text-slate-400">You have reached the end of the list.</p>
      )}
    </section>
  )
}
