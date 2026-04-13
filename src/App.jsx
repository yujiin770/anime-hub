import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import AnimeGrid from './components/AnimeGrid'
import Featured from './components/Featured'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg)] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-28 -left-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-rose-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />
      </div>

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main>
        <Hero />
        <Featured />
        <AnimeGrid searchQuery={searchQuery} />
      </main>
    </div>
  )
}

export default App
