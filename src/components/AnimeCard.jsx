import { Play, Info } from 'lucide-react'
import { useState } from 'react'
import NetflixPlayer from './NetflixPlayer'

export default function AnimeCard({ anime }) {
  const [showPlayer, setShowPlayer] = useState(false)

  const handleInfo = () => {
    alert([
      anime.title,
      `Rating: ${anime.rating > 0 ? anime.rating.toFixed(1) : 'N/A'}/10`,
      `Episodes: ${anime.episodes || 'Unknown'}`,
      `Status: ${anime.status || 'Unknown'}`,
      `Genres: ${anime.genre?.join(', ') || 'N/A'}`
    ].join('\n'))
  }

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
            {anime.rating > 0 ? anime.rating.toFixed(1) : 'N/A'} score
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 text-base font-semibold text-white">{anime.title}</h3>
          <p className="mt-1 line-clamp-1 text-xs text-slate-300">{anime.genre?.slice(0, 2).join(', ') || 'Unknown genre'}</p>
          <p className="mt-2 line-clamp-3 flex-1 text-xs text-slate-400">{anime.description || 'No description available.'}</p>

          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-300">
            <span>{anime.episodes || '?'} episodes</span>
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
              onClick={handleInfo}
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
    </>
  )
}
