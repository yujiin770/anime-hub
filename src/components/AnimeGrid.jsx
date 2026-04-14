import { useEffect, useMemo, useRef, useState } from 'react'
import AnimeCard from './AnimeCard'
import { getTopAnime, searchAnime, transformAnimeData } from '../services/animeApi'

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
  const [yearFilter, setYearFilter] = useState('All')
  const [ratingFilter, setRatingFilter] = useState(0)
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

  const yearOptions = useMemo(() => {
    const years = animeList
      .map((anime) => anime.year)
      .filter((year) => typeof year === 'number')
      .sort((a, b) => b - a)

    return ['All', ...new Set(years)]
  }, [animeList])

  const filteredAnimeList = useMemo(() => {
    return animeList.filter((anime) => {
      const passesYear = yearFilter === 'All' || String(anime.year) === yearFilter
      const passesRating = (anime.rating || 0) >= ratingFilter
      return passesYear && passesRating
    })
  }, [animeList, yearFilter, ratingFilter])

  return (
    <section id="library" className="mx-auto mt-14 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 sm:p-6">
        <h2 className="font-heading text-3xl font-semibold text-white">{sectionTitle}</h2>
        <p className="mt-1 text-sm text-slate-300">
          {trimmedQuery
            ? `Showing direct anime results for "${trimmedQuery}".`
            : 'Scroll down to load more anime continuously.'}
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-xs text-slate-300">
            Year
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white outline-none"
            >
              {yearOptions.map((year) => (
                <option key={String(year)} value={String(year)} className="bg-slate-900">
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs text-slate-300">
            Minimum Rating
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(Math.max(0, Math.min(10, Number(e.target.value) || 0)))}
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white outline-none"
            />
          </label>
        </div>
      </div>

      {loading && animeList.length === 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: INITIAL_SKELETON_COUNT }).map((_, idx) => (
            <SkeletonCard key={`skeleton-initial-${idx}`} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mt-6 rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 text-sm text-rose-200">
          {error}
        </div>
      )}

      {!loading && !error && filteredAnimeList.length === 0 && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-base text-slate-200">No anime found.</p>
          <p className="mt-1 text-sm text-slate-400">Try changing search or filters.</p>
        </div>
      )}

      {filteredAnimeList.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAnimeList.map((anime) => (
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
