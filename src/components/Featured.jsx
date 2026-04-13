import { ArrowRight } from 'lucide-react'
import { useTrendingAnime } from '../hooks/useAnime'

export default function Featured() {
  const { anime: featuredAnime, loading, error } = useTrendingAnime()

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Trending This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-gray-800 rounded-lg h-64 animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Trending This Week</h2>
        <div className="text-center py-8">
          <p className="text-red-500">⚠️ Failed to load trending anime</p>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Trending This Week</h2>
        <a href="#" className="flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold transition text-sm sm:text-base">
          View All <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {featuredAnime.slice(0, 4).map((anime, index) => (
          <div
            key={anime.id}
            className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 sm:p-6 overflow-hidden cursor-pointer hover:border-red-500 border-2 border-gray-700 transition h-full flex flex-col"
          >
            {/* Rank Badge */}
            <div className="absolute -top-3 -left-3 w-14 sm:w-16 h-14 sm:h-16 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-2xl shadow-lg">
              #{index + 1}
            </div>

            {/* Anime Image */}
            {anime.image && (
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="relative z-10 pt-4 flex-grow flex flex-col">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-red-500 transition line-clamp-2">
                {anime.title}
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-gray-400 flex-grow">
                <div className="flex justify-between">
                  <span>Episodes: {anime.episodes || '?'}</span>
                  <span className="text-yellow-400 font-semibold">★ {anime.score?.toFixed(1) || 'N/A'}</span>
                </div>
                <div className="pt-2 border-t border-gray-700">
                  <span className="text-green-500 font-bold">Popular anime</span>
                </div>
              </div>

              <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition transform hover:scale-105 text-sm">
                Watch
              </button>
            </div>

            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition" />
          </div>
        ))}
      </div>
    </section>
  )
}
