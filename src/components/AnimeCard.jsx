import { Play, Info } from 'lucide-react'
import { useState } from 'react'
import NetflixPlayer from './NetflixPlayer'

export default function AnimeCard({ anime }) {
  const [showPlayer, setShowPlayer] = useState(false)

  const handleInfo = () => {
    alert(`${anime.title}\n\nRating: ${anime.rating}/10\nEpisodes: ${anime.episodes || 'Unknown'}\nStatus: ${anime.status}\nGenres: ${anime.genre.join(', ')}`)
  }

  return (
    <>
      <div className="group relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-105 transition duration-300 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative h-64 md:h-80 bg-gradient-to-b from-gray-700 to-gray-900 overflow-hidden">
          {anime.image ? (
            <img
              src={anime.image}
              alt={anime.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-300"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800" />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <div className="bg-red-600 hover:bg-red-700 p-3 rounded-full">
              <Play className="w-6 h-6 fill-white text-white" />
            </div>
          </div>

          {/* Badge */}
          <div className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
            {anime.year || 'N/A'}
          </div>

          {/* Rating */}
          {anime.rating > 0 && (
            <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-yellow-400 text-sm font-semibold">
              ★ {anime.rating.toFixed(1)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-bold text-white text-sm md:text-base mb-1 line-clamp-2 group-hover:text-red-500 transition">
            {anime.title}
          </h3>
          <p className="text-gray-400 text-xs mb-2 line-clamp-1">
            {anime.genre.slice(0, 2).join(', ') || 'N/A'}
          </p>
          <p className="text-gray-500 text-xs line-clamp-2 flex-grow">
            {anime.description || 'No description available'}
          </p>

          {/* Stats */}
          <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between text-xs text-gray-400">
            <span>{anime.episodes || '?'} Episodes</span>
            <span className="capitalize">{anime.status || 'Unknown'}</span>
          </div>

          {/* Buttons */}
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setShowPlayer(true)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold py-2 rounded transition active:scale-95"
            >
              Episodes
            </button>
            <button 
              onClick={handleInfo}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-xs sm:text-sm font-bold py-2 rounded transition flex items-center justify-center gap-1 active:scale-95"
            >
              <Info className="w-4 h-4" />
              Info
            </button>
          </div>
        </div>
      </div>

      {/* Netflix Player */}
      {showPlayer && (
        <NetflixPlayer
          anime={anime}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </>
  )
}

