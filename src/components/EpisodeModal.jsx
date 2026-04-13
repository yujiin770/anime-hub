import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useAnimeEpisodes } from '../hooks/useAnime'

export default function EpisodeModal({ animeId, animeTitle, onClose }) {
  const [page, setPage] = useState(1)
  const { episodes, loading, error } = useAnimeEpisodes(animeId, true)

  const episodesPerPage = 10
  const startIdx = (page - 1) * episodesPerPage
  const displayedEpisodes = episodes?.slice(startIdx, startIdx + episodesPerPage) || []
  const hasMorePages = episodes && episodes.length > startIdx + episodesPerPage

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-96 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white truncate">{animeTitle} - Episodes</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {loading && !episodes?.length && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin mb-3">
                <div className="w-8 h-8 border-4 border-gray-700 border-t-red-600 rounded-full"></div>
              </div>
              <p className="text-gray-400">Loading episodes...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-500 mb-2">⚠️ Could not load episodes</p>
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          )}

          {!loading && episodes?.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No episodes available for this anime</p>
            </div>
          )}

          {displayedEpisodes.length > 0 && (
            <div className="space-y-2">
              {displayedEpisodes.map((ep, index) => (
                <div
                  key={ep.mal_id || index}
                  className="bg-gray-800 hover:bg-gray-700 p-3 rounded transition cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 bg-red-600 text-white px-3 py-1 rounded font-bold text-sm min-w-12">
                      Ep {ep.mal_id || startIdx + index + 1}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-white font-semibold truncate group-hover:text-red-500 transition">
                        {ep.title || `Episode ${ep.mal_id || startIdx + index + 1}`}
                      </h3>
                      {ep.aired && (
                        <p className="text-gray-400 text-xs mt-1">
                          Aired: {new Date(ep.aired).toLocaleDateString()}
                        </p>
                      )}
                      {ep.synopsis && (
                        <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                          {ep.synopsis}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {episodes && episodes.length > episodesPerPage && (
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 rounded transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <span className="text-gray-400 text-sm">
                Page {page} · Showing {displayedEpisodes.length}/{episodes.length}
              </span>

              <button
                onClick={() => setPage(p => p + 1)}
                disabled={!hasMorePages}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300 rounded transition"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
