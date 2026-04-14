import { useState, useEffect } from 'react'
import { Play, Info, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useTrendingAnime } from '../hooks/useAnime'
import NetflixPlayer from './NetflixPlayer'

export default function Hero({ selectedGenre = 'All' }) {
  const { anime: allAnime, loading } = useTrendingAnime()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [showPlayer, setShowPlayer] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const filteredAnime = selectedGenre === 'All'
    ? allAnime
    : allAnime.filter((anime) => anime.genre?.includes(selectedGenre))

  const safeIndex = filteredAnime.length > 0 ? Math.min(currentIndex, filteredAnime.length - 1) : 0
  const featured = filteredAnime[safeIndex] || null

  useEffect(() => {
    if (!autoPlay || loading || filteredAnime.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredAnime.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [autoPlay, loading, filteredAnime.length])

  return (
    <section id="hero" className="relative mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative isolate h-[72vh] min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
        {featured?.image && (
          <img
            src={featured.image}
            alt={featured.title}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />

        <div className="relative z-10 flex h-full items-end p-6 sm:p-10">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
              Top Picks {filteredAnime.length > 0 ? `${safeIndex + 1}/${filteredAnime.length}` : ''}
            </span>

            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              {loading ? 'Loading anime lineup...' : featured?.title || 'No anime found for this genre'}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setShowPlayer(true)}
                disabled={!featured}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Play className="h-4 w-4 fill-current" />
                Play Episodes
              </button>
              <button
                onClick={() => setShowInfo(true)}
                disabled={!featured}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Info className="h-4 w-4" />
                More Info
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setAutoPlay(false)
            setCurrentIndex((prev) => (prev - 1 + filteredAnime.length) % filteredAnime.length)
          }}
          disabled={loading || filteredAnime.length < 2}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-slate-950/70 p-2 text-white transition hover:bg-slate-900 disabled:opacity-40"
          aria-label="Previous anime"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => {
            setAutoPlay(false)
            setCurrentIndex((prev) => (prev + 1) % filteredAnime.length)
          }}
          disabled={loading || filteredAnime.length < 2}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-slate-950/70 p-2 text-white transition hover:bg-slate-900 disabled:opacity-40"
          aria-label="Next anime"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {filteredAnime.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {filteredAnime.map((entry, idx) => (
              <button
                key={entry.id}
                onClick={() => {
                  setAutoPlay(false)
                  setCurrentIndex(idx)
                }}
                className={`h-2 rounded-full transition ${idx === safeIndex ? 'w-8 bg-cyan-300' : 'w-2 bg-white/60 hover:bg-white'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {showPlayer && featured && (
        <NetflixPlayer
          anime={featured}
          onClose={() => setShowPlayer(false)}
        />
      )}

      {showInfo && featured && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" onClick={() => setShowInfo(false)}>
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-slate-900 p-5 sm:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-heading text-2xl font-semibold text-white">{featured.title}</h2>
              <button onClick={() => setShowInfo(false)} className="rounded-lg border border-white/15 p-2 text-slate-200 transition hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200 sm:text-sm">
              <span className="rounded-full bg-white/10 px-3 py-1">{featured.year || 'Unknown Year'}</span>
              <span className="rounded-full bg-white/10 px-3 py-1">{featured.episodes || '?'} episodes</span>
              <span className="rounded-full bg-white/10 px-3 py-1">{featured.rating > 0 ? `${featured.rating.toFixed(1)} rating` : 'No rating'}</span>
              <span className="rounded-full bg-white/10 px-3 py-1">{featured.status || 'Unknown status'}</span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              {featured.description || 'No description available.'}
            </p>

            <p className="mt-3 text-xs text-slate-400">
              Genres: {featured.genre?.join(', ') || 'N/A'}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
