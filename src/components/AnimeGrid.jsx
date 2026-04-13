import { useState } from 'react'
import AnimeCard from './AnimeCard'
import { useTopAnime, useSearchAnime } from '../hooks/useAnime'

const genreIds = {
  'All': null,
  'Action': 1,
  'Adventure': 2,
  'Comedy': 4,
  'Drama': 8,
  'Fantasy': 10,
  'Horror': 14,
  'Sci-Fi': 24,
  'Supernatural': 37,
  'Thriller': 41,
  'School': 23
}

export default function AnimeGrid({ searchQuery, selectedGenre, setSelectedGenre }) {
  const page = 1
  const { anime: topAnime, loading: topLoading } = useTopAnime(page)
  const { anime: searchResults, loading: searchLoading } = useSearchAnime(searchQuery)
  
  const anime = searchQuery.trim() ? searchResults : topAnime
  const loading = searchQuery.trim() ? searchLoading : topLoading

  // For now, we're not filtering by genre due to API limitations
  // Genre filtering would require additional API calls per genre
  const displayAnime = anime

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Genre Filter */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Genres (Browse by Top)</h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {Object.keys(genreIds).map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
                selectedGenre === genre
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <p className="text-gray-400 text-xs sm:text-sm mt-3">
          💡 Tip: Use search to find specific anime. Showing top {displayAnime.length} anime from database.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin">
            <div className="w-12 h-12 border-4 border-gray-700 border-t-red-600 rounded-full"></div>
          </div>
          <span className="ml-3 text-gray-400">Loading anime...</span>
        </div>
      )}

      {/* Error State */}
      {!loading && displayAnime.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No anime found for "{searchQuery}"</p>
          <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
        </div>
      )}

      {/* Anime Grid */}
      {!loading && displayAnime.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {displayAnime.map(anime => (
            <AnimeCard
              key={anime.id}
              anime={anime}
            />
          ))}
        </div>
      )}
    </section>
  )
}

