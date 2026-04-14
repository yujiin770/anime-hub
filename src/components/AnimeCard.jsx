import { useState } from 'react'
import NetflixPlayer from './NetflixPlayer'
import { Play, Info, X } from 'lucide-react'

export default function AnimeCard({ anime }) {
  const [showPlayer, setShowPlayer] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const episodeOrSeason = anime.episodes > 0
    ? `${anime.episodes} episodes`
    : anime.season
      ? `${anime.season} season`
      : 'Episodes/Season TBA'

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/85 shadow-lg shadow-black/20 transition hover:-translate-y-1">
        <div className="relative h-64 overflow-hidden bg-slate-800">
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
            <div className="h-full w-full bg-slate-700" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

          <span className="absolute right-2 top-2 rounded-full bg-cyan-300 px-2.5 py-1 text-xs font-bold text-slate-950">
            {anime.year || 'N/A'}
          </span>

          <div className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-cyan-200">
            {anime.rating > 0 ? anime.rating.toFixed(1) : 'N/A'} rating
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 text-base font-semibold text-white">{anime.title}</h3>
          <p className="mt-1 line-clamp-1 text-xs text-slate-300">{anime.genre?.slice(0, 2).join(', ') || 'Unknown genre'}</p>

          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-300">
            <span className="capitalize">{episodeOrSeason}</span>
            <span className="truncate pl-2">{anime.status || 'Unknown'}</span>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setShowPlayer(true)}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-cyan-400 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Play
            </button>
            <button
              onClick={() => setShowInfoModal(true)}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
            >
              <Info className="h-3.5 w-3.5" />
              Info
            </button>
          </div>
        </div>
      </article>

      {showPlayer && (
        <NetflixPlayer
          anime={anime}
          onClose={() => setShowPlayer(false)}
        />
      )}

      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" onClick={() => setShowInfoModal(false)}>
          <div
            className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/15 bg-slate-900 p-5 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-heading text-2xl font-semibold text-white">{anime.title}</h2>
              <button
                onClick={() => setShowInfoModal(false)}
                className="rounded-lg border border-white/15 p-2 text-slate-200 transition hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200 sm:text-sm">
              <span className="rounded-full bg-white/10 px-3 py-1">{anime.year || 'Unknown Year'}</span>
              <span className="rounded-full bg-white/10 px-3 py-1 capitalize">{episodeOrSeason}</span>
              <span className="rounded-full bg-white/10 px-3 py-1">{anime.rating > 0 ? `${anime.rating.toFixed(1)} rating` : 'No rating'}</span>
              <span className="rounded-full bg-white/10 px-3 py-1">{anime.status || 'Unknown status'}</span>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              {anime.description || 'No description available.'}
            </p>

            <p className="mt-3 text-xs text-slate-400">
              Genres: {anime.genre?.join(', ') || 'N/A'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
