import { useState, useEffect } from 'react'
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTrendingAnime } from '../hooks/useAnime'
import NetflixPlayer from './NetflixPlayer'

export default function Hero() {
  const { anime: allAnime, loading } = useTrendingAnime()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [showPlayer, setShowPlayer] = useState(false)

  const featured = allAnime?.[currentIndex] || null

  // Auto-advance carousel every 8 seconds
  useEffect(() => {
    if (!autoPlay || loading || allAnime.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allAnime.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [autoPlay, loading, allAnime.length])

  const goToPrevious = () => {
    setAutoPlay(false)
    setCurrentIndex((prev) => (prev - 1 + allAnime.length) % allAnime.length)
  }

  const goToNext = () => {
    setAutoPlay(false)
    setCurrentIndex((prev) => (prev + 1) % allAnime.length)
  }

  const handleWatchNow = () => {
    setShowPlayer(true)
  }

  const handleMoreInfo = () => {
    alert(`Title: ${featured?.title}\n\nScore: ${featured?.score?.toFixed(1) || featured?.rating?.toFixed(1) || 'N/A'}/10\n\nStatus: ${featured?.status}\n\nEpisodes: ${featured?.episodes || '?'}`)
  }

  return (
    <div className="relative w-full bg-black overflow-hidden group h-96 md:h-screen max-h-screen">
      {/* Background Image with smooth transition */}
      {featured?.images?.jpg?.image_url && (
        <div className="absolute inset-0 transition-opacity duration-1000">
          <img
            src={featured.images.jpg.image_url}
            alt={featured.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}

      {/* Dark Gradient Overlay - More prominent */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-end md:items-center px-4 sm:px-6 md:px-12 pb-8 md:pb-12 z-10">
        <div className="max-w-2xl animate-fade-in-up">
          <div className="mb-2 sm:mb-4 inline-block px-3 py-1 bg-red-600/40 text-red-300 rounded-full text-xs font-semibold border border-red-500/50">
            TRENDING NOW • {currentIndex + 1} / {allAnime.length}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 sm:mb-4 leading-tight drop-shadow-lg">
            {loading ? 'Loading Amazing Anime...' : featured?.title || 'Anime Hub'}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 md:mb-6 max-w-xl line-clamp-3 drop-shadow">
            {featured?.synopsis || 'Discover amazing anime series with stunning animation'}
          </p>

          {/* Rating and Info */}
          <div className="flex gap-3 sm:gap-4 items-center mb-4 md:mb-6 flex-wrap">
            {featured?.score > 0 && (
              <span className="text-yellow-300 font-semibold text-sm sm:text-base drop-shadow">★ {featured.score.toFixed(1)}/10</span>
            )}
            {featured?.genres?.length > 0 && (
              <span className="text-gray-300 text-xs sm:text-sm drop-shadow">{featured.genres.slice(0, 2).map(g => g.name).join(' • ')}</span>
            )}
            {featured?.year && (
              <span className="text-gray-300 text-xs sm:text-sm drop-shadow">{featured.year}</span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2 sm:gap-4 flex-wrap">
            <button 
              onClick={handleWatchNow}
              className="flex items-center gap-2 px-4 sm:px-8 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition transform hover:scale-105 text-sm sm:text-base active:scale-95 shadow-lg hover:shadow-red-600/50"
            >
              <Play className="w-4 sm:w-5 h-4 sm:h-5 fill-white" />
              Watch Now
            </button>
            <button 
              onClick={handleMoreInfo}
              className="flex items-center gap-2 px-4 sm:px-8 py-2 sm:py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg transition text-sm sm:text-base active:scale-95 backdrop-blur-sm"
            >
              <Info className="w-4 sm:w-5 h-4 sm:h-5" />
              More Info
            </button>
          </div>

          {/* Stats */}
          {featured && (
            <div className="mt-4 md:mt-6 flex gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300 flex-wrap drop-shadow">
              <span>📺 {featured.episodes || '?'} Episodes</span>
              <span className="capitalize">📌 {featured.status || 'Unknown'}</span>
              {featured.type && <span>🎬 {featured.type}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Carousel Navigation - Left */}
      <button
        onClick={goToPrevious}
        disabled={loading}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-red-600/80 hover:bg-red-600 disabled:opacity-50 rounded-full transition transform hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Carousel Navigation - Right */}
      <button
        onClick={goToNext}
        disabled={loading}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-red-600/80 hover:bg-red-600 disabled:opacity-50 rounded-full transition transform hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {allAnime.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setAutoPlay(false)
              setCurrentIndex(idx)
            }}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition ${
              idx === currentIndex ? 'bg-red-600 w-6 sm:w-8' : 'bg-gray-400 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Netflix Player Modal */}
      {showPlayer && featured && (
        <NetflixPlayer 
          anime={featured} 
          onClose={() => setShowPlayer(false)}
        />
      )}
    </div>
  )
}
