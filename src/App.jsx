import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import AnimeGrid from './components/AnimeGrid'
import Featured from './components/Featured'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Hero />
      <Featured />
      <AnimeGrid searchQuery={searchQuery} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
    </div>
  )
}

export default App
