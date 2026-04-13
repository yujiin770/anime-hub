import { useState, useEffect } from 'react'
import {
  getTopAnime,
  searchAnime,
  getTrendingAnime,
  getAnimeEpisodes,
  getAnimeByGenre,
  transformAnimeData
} from '../services/animeApi'

// Hook for fetching top anime
export const useTopAnime = (page = 1) => {
  const [anime, setAnime] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getTopAnime(page, 25)
        setAnime(data.map(transformAnimeData))
      } catch (err) {
        setError(err.message || 'Failed to load anime')
        setAnime([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page])

  return { anime, loading, error }
}

// Hook for searching anime
export const useSearchAnime = (query, page = 1) => {
  const [anime, setAnime] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query.trim()) {
      setAnime([])
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await searchAnime(query, page)
        setAnime(data.map(transformAnimeData))
      } catch (err) {
        setError(err.message || 'Failed to search anime')
        setAnime([])
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const timer = setTimeout(fetchData, 500)
    return () => clearTimeout(timer)
  }, [query, page])

  return { anime, loading, error }
}

// Hook for fetching trending anime
export const useTrendingAnime = () => {
  const [anime, setAnime] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getTrendingAnime()
        setAnime(data.map(transformAnimeData))
      } catch (err) {
        setError(err.message || 'Failed to load trending anime')
        setAnime([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { anime, loading, error }
}

// Hook for fetching episodes
export const useAnimeEpisodes = (animeId, enabled = false) => {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!enabled || !animeId) return

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getAnimeEpisodes(animeId)
        setEpisodes(data)
      } catch (err) {
        setError(err.message || 'Failed to load episodes')
        setEpisodes([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [animeId, enabled])

  return { episodes, loading, error }
}

// Hook for fetching anime by genre
export const useAnimeByGenre = (genreId, enabled = false) => {
  const [anime, setAnime] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!enabled || !genreId) return

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getAnimeByGenre(genreId)
        setAnime(data.map(transformAnimeData))
      } catch (err) {
        setError(err.message || 'Failed to load anime by genre')
        setAnime([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [genreId, enabled])

  return { anime, loading, error }
}
