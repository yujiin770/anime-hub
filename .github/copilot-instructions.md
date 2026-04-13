# AnimeHub - Modern Anime Streaming Website

## Project Overview
Modern anime streaming website built with React 19, Vite, and Tailwind CSS v4 with **real-time Jikan API integration**. Features live anime data, episodes viewer, genre filtering, search functionality, trending section, and fully responsive design.

## Technology Stack
- **Frontend Framework**: React 19 with Hooks
- **Build Tool**: Vite 8
- **CSS Framework**: Tailwind CSS 4 with @tailwindcss/postcss
- **API**: Jikan API v4 (Free MyAnimeList API)
- **Icons**: Lucide React
- **CSS Processing**: PostCSS with Tailwind plugin
- **State Management**: React Hooks (useState, useEffect)

## Project Structure
```
src/
├── components/          - React components
│   ├── Header.jsx      - Responsive header with search & menu
│   ├── Hero.jsx        - Dynamic featured anime section
│   ├── Featured.jsx    - Trending anime section
│   ├── AnimeGrid.jsx   - Main anime catalog
│   ├── AnimeCard.jsx   - Individual anime card
│   └── EpisodeModal.jsx - Episode viewer modal
├── services/
│   └── animeApi.js     - Jikan API service with caching & rate limiting
├── hooks/
│   └── useAnime.js     - Custom React hooks for data fetching
├── App.jsx             - Main application component
├── index.css           - Global styles with Tailwind imports
└── main.jsx            - React entry point
```

## Key Features Implemented

### 1. Jikan API Integration
- **Real anime data** from official MyAnimeList database
- **Automatic caching** (5 min duration) to reduce API calls
- **Built-in rate limiting** (500ms delay + retry on 429 errors)
- **Error handling** with graceful fallbacks

### 2. Dynamic Components
- **Search**: Real-time anime search with debouncing
- **Trending**: Top ranked anime from Jikan
- **Episodes**: Modal viewer showing episode list with pagination
- **Genre Filtering**: Browse anime by 11+ genres
- **Hero Section**: Dynamic featured anime with real images

### 3. Fully Responsive Design
- **Mobile**: 1 column grid, hamburger menu, adaptive search
- **Tablet**: 2 column grid, optimized spacing
- **Desktop**: 3-4 column grid, full navigation
- **Touch-friendly**: All buttons and inputs sized for touch

### 4. Data Fetching Hooks
```javascript
useTopAnime(page)           // Fetch top 25 anime
useSearchAnime(query, page) // Real-time search
useTrendingAnime()          // Get trending 4 anime
useAnimeEpisodes(id)        // Fetch episodes for anime
useAnimeByGenre(genreId)    // Filter by genre
```

## API Integration Details

### Jikan API Endpoints
- `GET /top/anime` - Top/trending anime rankings
- `GET /anime?query=` - Search anime by title
- `GET /anime/{id}/episodes` - Episode list
- `GET /anime/{id}` - Full anime details

### Caching Strategy
- 5-minute cache duration
- Automatic cache invalidation
- Fallback to stale cache on errors
- Reduces API calls significantly

### Rate Limiting
- 500ms delay between requests
- Automatic retry on HTTP 429
- Maximum 2-second wait on rate limit
- Prevents API throttling

## Quick Start

### Development
```bash
npm install  # Install dependencies
npm run dev  # Start dev server→ http://localhost:5173/
```

### Production
```bash
npm run build   # Build for production
npm run preview # Preview production build
```

## Customization

### Change API Behavior
Edit `src/services/animeApi.js`:
- Line 6: `const CACHE_DURATION = 5 * 60 * 1000` - Adjust cache duration
- Line 7: `const delay = (ms) => ...` - Change rate limit delay
- Modify endpoints and response handling

### Update Colors
Edit `tailwind.config.js`:
- Modify primary, secondary, accent colors
- Change highlight colors for hover states

### Add Custom Hooks
Create in `src/hooks/`:
```javascript
export const useCustomAnime = () => {
  // Your hook logic
}
```

## Browser Support
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)  
- Edge (latest)
- Mobile browsers (iOS, Android)

## Environment
- Node.js 18+
- npm or yarn
- Modern browser with ES6+ support
- Internet connection (for Jikan API)

## Important Notes

### API No Authentication Required
- Jikan API is completely free
- No API keys needed
- Public API with rate limits (~60 requests/minute)
- See: https://docs.api.jikan.moe/

### Performance Tips
- Responses are cached for 5 minutes
- Use search for specific anime to reduce load
- Episode fetching is paginated (10 per page)
- Images are lazy loaded from Jikan CDN

### Common Issues
- **429 Rate Limit**: Wait 30 seconds before retrying
- **No Episode Data**: Some anime don't have episodes in Jikan
- **Missing Images**: Fallback gradients used if image fails
- **Search Slow**: Normal due to API rate limiting

## File Locations
- Icons: Lucide React components
- Styles: Tailwind classes + custom CSS in `src/index.css`
- API Calls: `src/services/animeApi.js`
- State: React hooks in components and `src/hooks/`
- Config: `vite.config.js`, `tailwind.config.js`, `postcss.config.js`

## Development Workflow
1. Components in `src/components/`
2. API calls in `src/services/`
3. Custom hooks in `src/hooks/`
4. Styles with Tailwind classes
5. Hot reload on file changes (HMR enabled)