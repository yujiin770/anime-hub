import { useEffect, useRef, useState } from 'react'
import { Search, Play, Menu, X, User, ChevronDown } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Trending', href: '#trending' },
  { label: 'Library', href: '#library' }
]

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  genreOptions
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || document.documentElement.scrollTop || 0
      const delta = currentY - lastScrollY.current

      if (currentY <= 12) {
        setHiddenOnScroll(false)
      } else if (delta > 4) {
        setHiddenOnScroll(true)
      } else if (delta < -4) {
        setHiddenOnScroll(false)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenus = () => {
    setMobileMenuOpen(false)
    setDropdownOpen(false)
  }

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl transition-transform duration-300 will-change-transform ${hiddenOnScroll ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <a href="#hero" className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-white transition hover:bg-white/10">
            <Play className="h-5 w-5 fill-cyan-300 text-cyan-300" />
            <span className="font-heading text-base font-semibold tracking-wide sm:text-lg">AnimePulse</span>
          </a>

          <div className="relative hidden md:block">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              Menu
              <ChevronDown className={`h-4 w-4 transition ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-44 rounded-xl border border-white/10 bg-slate-900 p-2 shadow-xl shadow-black/25">
                {navItems.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={closeMenus}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400/70"
            >
              {genreOptions.map((genre) => (
                <option key={genre} value={genre} className="bg-slate-900">
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="relative ml-auto hidden w-full max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search anime title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-300/25"
            />
          </div>

          <button className="hidden items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 md:inline-flex">
            <User className="h-4 w-4" />
            Sign In
          </button>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex rounded-lg border border-white/10 p-2 text-slate-200 transition hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mt-3 space-y-3 rounded-2xl border border-white/10 bg-slate-900/95 p-4 md:hidden">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search anime"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-400 outline-none"
              />
            </div>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none"
            >
              {genreOptions.map((genre) => (
                <option key={genre} value={genre} className="bg-slate-900">
                  {genre}
                </option>
              ))}
            </select>

            <nav className="grid gap-1">
              {navItems.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={closeMenus}
                  className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </nav>

            <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
              <User className="h-4 w-4" />
              Sign In
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
