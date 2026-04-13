import AnimeCard from './AnimeCard'
import { useTopAnime, useSearchAnime } from '../hooks/useAnime'

export default function AnimeGrid({ searchQuery }) {
  const page = 1
  const trimmedQuery = searchQuery.trim()

  const { anime: topAnime, loading: topLoading, error: topError } = useTopAnime(page)
  const { anime: searchResults, loading: searchLoading, error: searchError } = useSearchAnime(trimmedQuery)

  const displayAnime = trimmedQuery ? searchResults : topAnime
  const loading = trimmedQuery ? searchLoading : topLoading
  const error = trimmedQuery ? searchError : topError

  return (
    <section id="library" className="mx-auto mt-14 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 sm:p-6">
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
          ))}
        </div>
      )}
    </section>
  )
}
