import { useState } from 'react'
import { Search, Play, Menu, X } from 'lucide-react'

export default function Header({ searchQuery, setSearchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 text-lg sm:text-2xl font-bold text-white flex-shrink-0">
            <Play className="w-6 sm:w-8 h-6 sm:h-8 fill-red-500 text-red-500" />
            <span className="hidden sm:inline">AnimeHub</span>
            <span className="sm:hidden">Hub</span>
          </div>

          {/* Search Bar - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:flex flex-1 mx-4 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none transition text-sm"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#" className="text-gray-300 hover:text-red-500 transition">Home</a>
            <a href="#" className="text-gray-300 hover:text-red-500 transition">Trending</a>
            <a href="#" className="text-gray-300 hover:text-red-500 transition">Genres</a>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
              Sign In
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-3 sm:mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none transition text-sm"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-3 sm:mt-4 flex flex-col gap-3 border-t border-gray-800 pt-3 sm:pt-4">
            <a href="#" className="text-gray-300 hover:text-red-500 transition py-2">Home</a>
            <a href="#" className="text-gray-300 hover:text-red-500 transition py-2">Trending</a>
            <a href="#" className="text-gray-300 hover:text-red-500 transition py-2">Genres</a>
            <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
              Sign In
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
