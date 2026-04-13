import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Play as PlayIcon, Volume2, VolumeX, Maximize2 } from 'lucide-react'
import { useAnimeEpisodes } from '../hooks/useAnime'

export default function NetflixPlayer({ anime, onClose }) {
  const { episodes, loading, error } = useAnimeEpisodes(anime?.id, true)
  const [currentEpisode, setCurrentEpisode] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  const displayEpisode = episodes[currentEpisode] || null

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Header with close button */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 sm:p-6 z-20">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-white hover:text-red-500 transition text-sm sm:text-base"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
          Exit
        </button>
      </div>

      <div className="w-full h-full flex flex-col lg:flex-row">
        {/* Video Player Section */}
        <div className="flex-1 flex flex-col bg-black">
          {/* Main Player */}
          <div className="flex-1 flex items-center justify-center relative bg-black">
            {displayEpisode ? (
              <div className="w-full h-full relative group bg-gradient-to-br from-gray-800 to-gray-900">
                {/* Anime background image */}
                {anime?.images?.jpg?.image_url && (
                  <img
                    src={anime.images.jpg.image_url}
                    alt={displayEpisode.title}
                    className="w-full h-full object-cover opacity-30"
                  />
                )}

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4">
                      <PlayIcon className="w-16 h-16 sm:w-20 sm:h-20 text-red-600 fill-red-600 mx-auto" />
                    </div>
                    <p className="text-white text-lg sm:text-2xl font-bold mb-2">{displayEpisode.title}</p>
                    <p className="text-gray-300 text-xs sm:text-sm mb-6">
                      Episode {currentEpisode + 1} • {displayEpisode.aired || 'N/A'}
                    </p>
                    <button className="px-6 sm:px-8 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition">
                      <PlayIcon className="w-5 h-5 fill-white inline mr-2" />
                      Play Episode
                    </button>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button className="text-white hover:text-red-500 transition">
                        <PlayIcon className="w-5 h-5 fill-white" />
                      </button>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white hover:text-red-500 transition"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <button className="text-white hover:text-red-500 transition">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-2 w-full h-1 bg-gray-700 rounded cursor-pointer hover:h-2 transition">
                    <div className="h-full bg-red-600 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                {loading ? 'Loading episodes...' : error ? 'Error loading episodes' : 'No episodes available'}
              </div>
            )}
          </div>

          {/* Episode Info */}
          <div className="bg-black border-t border-gray-700 p-4 sm:p-6">
            <h2 className="text-white font-bold text-lg sm:text-2xl mb-2">{anime?.title}</h2>
            {displayEpisode && (
              <div>
                <p className="text-gray-300 font-semibold mb-2">
                  Episode {currentEpisode + 1}: {displayEpisode.title}
                </p>
                <p className="text-gray-400 text-sm max-h-20 overflow-y-auto">
                  {displayEpisode.synopsis || 'No description available'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Episodes List Section */}
        <div className="lg:w-96 bg-gray-900 border-l border-gray-700 flex flex-col max-h-screen lg:max-h-full">
          {/* Episodes Header */}
          <div className="p-4 sm:p-6 border-b border-gray-700 sticky top-0 bg-gray-900/95 backdrop-blur">
            <h3 className="text-white font-bold text-lg">Episodes</h3>
            <p className="text-gray-400 text-sm">{episodes.length} episodes available</p>
          </div>

          {/* Episodes Grid */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {loading ? (
              <div className="text-center text-gray-400 py-8">Loading episodes...</div>
            ) : error ? (
              <div className="text-center text-red-400 py-8">Error loading episodes</div>
            ) : episodes.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No episodes available</div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {episodes.map((episode, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEpisode(index)}
                    className={`p-3 rounded lg text-left transition ${
                      currentEpisode === index
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-semibold text-sm truncate">
                      Ep {index + 1}: {episode.title}
                    </div>
                    <div className="text-xs opacity-75 truncate">
                      {episode.aired || 'N/A'}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {episodes.length > 0 && (
            <div className="p-4 border-t border-gray-700 flex items-center justify-between bg-gray-900/95 sticky bottom-0">
              <button
                onClick={() => setCurrentEpisode(Math.max(0, currentEpisode - 1))}
                disabled={currentEpisode === 0}
                className="p-2 hover:bg-gray-700 disabled:opacity-50 rounded transition text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-300 text-sm">
                {currentEpisode + 1} / {episodes.length}
              </span>
              <button
                onClick={() => setCurrentEpisode(Math.min(episodes.length - 1, currentEpisode + 1))}
                disabled={currentEpisode === episodes.length - 1}
                className="p-2 hover:bg-gray-700 disabled:opacity-50 rounded transition text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
