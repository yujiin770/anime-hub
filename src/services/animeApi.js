// Jikan API Service
// Docs: https://docs.api.jikan.moe/

const JIKAN_API_BASE = 'https://api.jikan.moe/v4';

// Cache for API responses
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes - longer cache to reduce API calls
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests (Jikan allows ~60 req/min)

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Rate-limited fetch with request queuing
const fetchWithCache = async (url, options = {}) => {
  const cacheKey = url;
  const cached = cache.get(cacheKey);

  // Return cached data if still valid
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    // Rate limiting - ensure minimum time between requests
    const timeSinceLastRequest = Date.now() - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await delay(MIN_REQUEST_INTERVAL - timeSinceLastRequest);
    }

    lastRequestTime = Date.now();
    const response = await fetch(url, options);

    if (response.status === 429) {
      // Rate limited - exponential backoff retry
      console.warn('Rate limited (429), retrying after delay...');
      await delay(3000);
      lastRequestTime = Date.now();
      const retryResponse = await fetch(url, options);
      if (!retryResponse.ok) throw new Error(`API Error: ${retryResponse.status}`);
      const data = await retryResponse.json();
      cache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    }

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    // Return cached data even if expired on error
    if (cached) {
      console.warn('Using stale cache due to error:', error.message);
      return cached.data;
    }
    throw error;
  }
};

// Fetch top anime
export const getTopAnime = async (page = 1, limit = 25) => {
  try {
    const data = await fetchWithCache(
      `${JIKAN_API_BASE}/top/anime?page=${page}&limit=${limit}&filter=bypopularity`
    );
    return data.data || [];
  } catch (error) {
    console.error('Error fetching top anime:', error);
    throw error;
  }
};

// Search anime by query
export const searchAnime = async (query, page = 1) => {
  try {
    if (!query.trim()) return [];
    const data = await fetchWithCache(
      `${JIKAN_API_BASE}/anime?query=${encodeURIComponent(query)}&page=${page}&limit=25`
    );
    return data.data || [];
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

// Get trending anime (for carousel hero)
export const getTrendingAnime = async () => {
  try {
    const data = await fetchWithCache(
      `${JIKAN_API_BASE}/top/anime?limit=10&filter=bypopularity`
    );
    return data.data || [];
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    throw error;
  }
};

// Get anime by ID
export const getAnimeById = async (id) => {
  try {
    const data = await fetchWithCache(`${JIKAN_API_BASE}/anime/${id}`);
    return data.data;
  } catch (error) {
    console.error('Error fetching anime by ID:', error);
    throw error;
  }
};

// Get episodes for an anime
export const getAnimeEpisodes = async (id, page = 1) => {
  try {
    const data = await fetchWithCache(
      `${JIKAN_API_BASE}/anime/${id}/episodes?page=${page}`
    );
    return data.data || [];
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
};

// Get anime by genre
export const getAnimeByGenre = async (genreId, page = 1) => {
  try {
    const data = await fetchWithCache(
      `${JIKAN_API_BASE}/anime?genres=${genreId}&page=${page}&limit=25&order_by=score&sort=desc`
    );
    return data.data || [];
  } catch (error) {
    console.error('Error fetching anime by genre:', error);
    throw error;
  }
};

// Get all genres
export const getAllGenres = async () => {
  try {
    const data = await fetchWithCache(`${JIKAN_API_BASE}/genres/anime`);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

// Transform API anime data to our format
export const transformAnimeData = (anime) => {
  return {
    id: anime.mal_id,
    title: anime.title || 'N/A',
    image: anime.images?.jpg?.image_url,
    rating: anime.score || 0,
    episodes: anime.episodes || 0,
    status: anime.status || 'Unknown',
    year: anime.year || anime.aired?.prop?.from?.year,
    genre: anime.genres?.map(g => g.name) || [],
    description: anime.synopsis || 'No description available',
    airedFrom: anime.aired?.from,
    airedTo: anime.aired?.to,
    type: anime.type,
    source: anime.source,
    season: anime.season,
    url: anime.url
  };
};

