# AnimeHub - Modern Anime Streaming Website

A sleek, modern anime streaming website built with **React**, **Vite**, and **Tailwind CSS**. Features real-time anime data from Jikan API (MyAnimeList), browsing by genre, episode viewing, and fully responsive design.

## 🎨 Features


### 🎬 Core Features
- **Real-time Anime Data** - Integrated with Jikan API (MyAnimeList)
- **Hero Banner** - Dynamic featured anime with descriptions and ratings
- **Trending Section** - Top trending anime with real-time rankings
- **Anime Grid & Search** - Browse 25+ anime or search for specific titles
- **Episode Viewer** - Modal to explore episodes for each anime
- **Genre Browsing** - Filter by 11+ genres (Action, Supernatural, Fantasy, etc.)
- **Live Search** - Real-time anime search with debouncing
- **Rate Limiting** - Built-in caching (5 min) and rate limit handling
- **Error Handling** - Graceful fallbacks and loading states

### 📱 Responsive Features
- **Mobile Menu** - Hamburger navigation on small screens
- **Adaptive Search** - Search bar adjusts for mobile/desktop
- **Touch-Friendly** - Optimized buttons and spacing for touch
- **Responsive Grid** - 1-4 column layout based on screen size
- **Flexible Typography** - Font sizes scale with viewport

## 🚀 Technologies

- **React 19** - Modern UI library with hooks
- **Vite 8** - Super fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework  
- **Jikan API v4** - Free anime database (MyAnimeList)
- **Lucide React** - Beautiful icon library
- **React Hooks** - useState, useEffect for state management
- **PostCSS** - CSS processing with Tailwind

## 📦 Project Structure

```
AnimeWebsite/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Responsive header with search & menu
│   │   ├── Hero.jsx                # Dynamic hero with trending anime
│   │   ├── Featured.jsx            # Trending anime section
│   │   ├── AnimeGrid.jsx           # Main catalog grid
│   │   ├── AnimeCard.jsx           # Individual anime card
│   │   └── EpisodeModal.jsx        # Episode viewer modal
│   ├── services/
│   │   └── animeApi.js             # Jikan API service with caching
│   ├── hooks/
│   │   └── useAnime.js             # Custom React hooks for data fetching
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App-specific styles
│   ├── index.css                   # Global styles & Tailwind
│   ├── main.jsx                    # React entry point
│   └── assets/                     # Static assets
├── public/
│   └── vite.svg
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── package.json                    # Dependencies & scripts
└── README.md                       # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Navigate to project**
   ```bash
   cd AnimeWebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:5173/` (or next available port)

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🔗 API Integration - Jikan API

### What is Jikan API?
Jikan is a free, unofficial MyAnimeList API that provides comprehensive anime data including:
- Anime details (title, description, rating, episodes)
- Trending/Top anime rankings
- Episode information
- Genre and type filtering
- Search functionality

### Key Endpoints Used
- **Top Anime**: `/top/anime` - Gets top/trending anime
- **Search**: `/anime?query=...` - Search anime by title
- **Episodes**: `/anime/{id}/episodes` - Get episode list for anime
- **Details**: `/anime/{id}` - Full anime details

### API Features in This Project

1. **Automatic Caching**
   - 5-minute cache duration for all API responses
   - Reduces API calls and improves performance
   - Gracefully uses stale cache on errors

2. **Rate Limiting**
   - 500ms delay between requests
   - Automatic retry on 429 (Too Many Requests)
   - Prevents API throttling

3. **Error Handling**
   - Fallback to cached data on failure
   - User-friendly error messages
   - Loading states for better UX

### Using the Hooks

```javascript
// Fetch top anime
const { anime, loading, error } = useTopAnime(page = 1);

// Search anime
const { anime, loading, error } = useSearchAnime(query, page = 1);

// Get trending anime
const { anime, loading, error } = useTrendingAnime();

// Fetch episodes for anime
const { episodes, loading, error } = useAnimeEpisodes(animeId, enabled = true);

// Get anime by genre  
const { anime, loading, error } = useAnimeByGenre(genreId, enabled = true);
```

## 🎮 Usage Guide

### Browse Anime
1. Homepage shows trending anime and top-rated titles
2. Scroll down to see the full anime catalog
3. Each anime card shows rating, episodes, and status

### Search Anime
1. Click/tap the search bar
2. Type anime title (e.g., "Naruto", "Demon Slayer")
3. Results update in real-time with Jikan database
4. Click "Episodes" button to see episode list

### View Episodes  
1. Click "Episodes" button on any anime card
2. Modal opens showing episode list
3. Use pagination buttons to browse episodes
4. See episode titles, air dates, and synopses

### Mobile Features
- Tap hamburger menu to access navigation
- Search bar adapts to screen size
- Touch-optimized buttons and spacing
- Responsive grid (1-4 columns based on screen)

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#1a1a2e',
  secondary: '#16213e',
  accent: '#0f3460',
  highlight: '#e94560',
}
```

### Modify API Behavior  
Edit `src/services/animeApi.js`:
- Change `CACHE_DURATION` for cache length
- Adjust `delay()` for rate limiting
- Modify API endpoints

### Customize Components
Edit component files in `src/components/`:
- Change layouts in JSX
- Modify styles in className props
- Adjust colors and spacing

### Add More Genres
```javascript
// In src/components/AnimeGrid.jsx
const genreIds = {
  'Your Genre': 1,  // Add genre with Jikan genre ID
  // ...
}
```

## 📱 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Push to GitHub and connect to Vercel
```

### Netlify
```bash
npm run build
# Connect GitHub repo to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to GitHub Pages
```

### Other Platforms
Build the project and deploy the `dist/` folder to:
- AWS S3 + CloudFront
- Firebase Hosting
- Azure Static Web Apps
- Any static hosting

## 🔍 Key Features Explained

### Real-time Search
- Debounced input (500ms delay)
- Live results from Jikan API
- Automatic error handling
- Shows 25 results per page

### Episode Viewer
- Paginated episode list (10 per page)
- Shows episode title, air date, synopsis
- Responsive modal design
- Works on all screen sizes

### Responsive Design
- Mobile: 1 column grid
- Tablet: 2 column grid  
- Desktop: 3-4 column grid
- All elements scale proportionally

### Performance
- Code splitting with Vite
- Image lazy loading
- API response caching (5 min)
- Smooth scrolling and animations

## 🐛 Troubleshooting

**Q: API returning 429 errors?**
- A: Rate limiting is working as designed. Wait a few seconds and refresh.

**Q: Search not showing results?**
- A: Check network tab - Jikan API may be rate limited. Try again in 30 seconds.

**Q: Images not loading?**
- A: Some anime may not have images in Jikan. This is normal.

**Q: Episodes not showing?**
- A: Some anime may not have episode data. Try popular anime like "Naruto".

## 📚 Learning Resources

- [Jikan API Docs](https://docs.api.jikan.moe/)
- [React Documentation](https://react.dev)
- [Vite Guide](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

## 📄 License

Open source MIT License - Feel free to use for personal/commercial projects

## 💡 Future Enhancements

- [ ] User accounts & watch history
- [ ] Favorites/Bookmarks system
- [ ] Video player integration
- [ ] Official video streaming links
- [ ] User ratings & reviews
- [ ] Recommendations engine
- [ ] Dark/Light theme toggle
- [ ] Multiple language support
- [ ] Social sharing features
- [ ] Advanced filtering (year, season, rating)



