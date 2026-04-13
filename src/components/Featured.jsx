import { useState } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { useTrendingAnime } from '../hooks/useAnime'
import NetflixPlayer from './NetflixPlayer'

export default function Featured() {
  const { anime: featuredAnime, loading, error } = useTrendingAnime()
  const [activeAnime, setActiveAnime] = useState(null)

  if (loading) {
    return (
      <section id="trending" className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="font-heading text-3xl font-semibold text-white">Trending This Week</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-72 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="trending" className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-semibold text-white">Trending This Week</h2>
        <div className="mt-5 rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 text-rose-200">
          Failed to load trending anime.
        </div>
      </section>
    )
  }

  return (
    <section id="trending" className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-white">Trending This Week</h2>
          <p className="mt-1 text-sm text-slate-300">Hand-picked top titles anime fans are watching right now.</p>
        </div>
        <a
          href="#library"
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
        >
          Browse All
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {featuredAnime.slice(0, 4).map((anime, index) => (
          <article
            key={anime.id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-lg shadow-black/25"
          >
            <div className="relative h-48 overflow-hidden">
              {anime.image ? (
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : (
                <div className="h-full w-full bg-slate-800" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/35 to-transparent" />

              <span className="absolute left-3 top-3 rounded-full bg-cyan-300 px-3 py-1 text-xs font-bold text-slate-950">
                #{index + 1}
              </span>
            </div>

            <div className="p-4">
              <h3 className="line-clamp-1 text-lg font-semibold text-white">{anime.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-300">{anime.description || 'No description available.'}</p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-200">
                <span className="rounded-full bg-white/10 px-2.5 py-1">{anime.episodes || '?'} eps</span>
                <span className="rounded-full bg-white/10 px-2.5 py-1">{anime.rating > 0 ? anime.rating.toFixed(1) : 'N/A'} score</span>
              </div>

              <button
                onClick={() => setActiveAnime(anime)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                <Play className="h-4 w-4 fill-current" />
                Play
              </button>
            </div>
          </article>
        ))}
      </div>

      {activeAnime && (
        <NetflixPlayer
          anime={activeAnime}
          onClose={() => setActiveAnime(null)}
        />
      )}
    </section>
  )
}
