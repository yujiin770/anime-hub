import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Play as PlayIcon, Volume2, VolumeX, ExternalLink } from 'lucide-react'
import { useAnimeEpisodes } from '../hooks/useAnime'

export default function NetflixPlayer({ anime, onClose }) {
  const { episodes, loading, error } = useAnimeEpisodes(anime?.id, true)
  const [currentEpisode, setCurrentEpisode] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  const safeEpisodeIndex = episodes.length > 0 ? Math.min(currentEpisode, episodes.length - 1) : 0
  const displayEpisode = episodes[safeEpisodeIndex] || null

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const handlePlayEpisode = () => {
    if (anime?.url) {
      window.open(anime.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm">
      <div className="absolute left-0 right-0 top-0 z-20 bg-gradient-to-b from-black/90 to-transparent p-4 sm:p-6">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/40 px-3 py-2 text-sm text-white transition hover:bg-black/60"
        >
          <X className="h-4 w-4" />
          Close Player
        </button>
      </div>

      <div className="flex h-full flex-col lg:flex-row">
        <div className="flex flex-1 flex-col bg-black">
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black">
            {anime?.image && (
              <img
                src={anime.image}
                alt={anime.title}
                className="absolute inset-0 h-full w-full object-cover opacity-25"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

            {displayEpisode || loading ? (
              <div className="relative z-10 px-6 text-center">
                <PlayIcon className="mx-auto h-14 w-14 fill-cyan-300 text-cyan-300" />
                <p className="mt-4 text-xl font-semibold text-white sm:text-2xl">{anime?.title}</p>
                <p className="mt-1 text-sm text-slate-200">
                  {loading
                    ? 'Loading episodes...'
                    : `Episode ${safeEpisodeIndex + 1}: ${displayEpisode?.title || 'Untitled Episode'}`}
                </p>
                <button
                  onClick={handlePlayEpisode}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  <PlayIcon className="h-4 w-4 fill-current" />
                  Play
                </button>
              </div>
            ) : (
              <p className="relative z-10 text-sm text-slate-300">{error ? 'Error loading episodes' : 'No episodes available'}</p>
            )}

            <div className="absolute bottom-4 left-4 right-4 z-10 rounded-xl border border-white/10 bg-black/60 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayEpisode}
                    className="rounded-lg p-2 text-white transition hover:bg-white/10"
                    aria-label="Play"
                  >
                    <PlayIcon className="h-4 w-4 fill-current" />
                  </button>
                  <button
                    onClick={() => setIsMuted((prev) => !prev)}
                    className="rounded-lg p-2 text-white transition hover:bg-white/10"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </div>

                {anime?.url && (
                  <a
                    href={anime.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                  >
                    Official Page
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-slate-950 p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-white">{anime?.title}</h2>
            <p className="mt-2 text-sm text-slate-300">
              {displayEpisode?.synopsis || anime?.description || 'No description available.'}
            </p>
          </div>
        </div>

        <aside className="flex max-h-screen flex-col border-l border-white/10 bg-slate-900/90 lg:w-96">
          <div className="border-b border-white/10 p-4">
            <h3 className="text-lg font-semibold text-white">Episodes</h3>
            <p className="text-sm text-slate-300">{episodes.length} available</p>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-4">
            {loading && <p className="py-8 text-center text-sm text-slate-300">Loading episodes...</p>}
            {!loading && error && <p className="py-8 text-center text-sm text-rose-300">Error loading episodes.</p>}
            {!loading && !error && episodes.length === 0 && <p className="py-8 text-center text-sm text-slate-300">No episodes available.</p>}

            {!loading && !error && episodes.map((episode, index) => (
              <button
                key={`${episode.mal_id || index}-${episode.title || 'episode'}`}
                onClick={() => setCurrentEpisode(index)}
                className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                  safeEpisodeIndex === index
                    ? 'border-cyan-300/60 bg-cyan-300/20 text-white'
                    : 'border-white/10 bg-slate-800/70 text-slate-200 hover:bg-slate-700/80'
                }`}
              >
                <p className="truncate text-sm font-medium">Ep {index + 1}: {episode.title || 'Untitled Episode'}</p>
                <p className="mt-1 truncate text-xs opacity-80">{episode.aired ? new Date(episode.aired).toLocaleDateString() : 'No air date'}</p>
              </button>
            ))}
          </div>

          {episodes.length > 0 && (
            <div className="flex items-center justify-between border-t border-white/10 p-4">
              <button
                onClick={() => setCurrentEpisode((prev) => Math.max(0, prev - 1))}
                disabled={safeEpisodeIndex === 0}
                className="rounded-lg border border-white/10 p-2 text-white transition hover:bg-white/10 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-slate-200">{safeEpisodeIndex + 1} / {episodes.length}</span>
              <button
                onClick={() => setCurrentEpisode((prev) => Math.min(episodes.length - 1, prev + 1))}
                disabled={safeEpisodeIndex === episodes.length - 1}
                className="rounded-lg border border-white/10 p-2 text-white transition hover:bg-white/10 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
