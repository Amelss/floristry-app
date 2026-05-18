const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const CACHE_PREFIX = 'pexels_v1_';

export async function fetchPexelsPhoto(query) {
  const cacheKey = CACHE_PREFIX + query.toLowerCase();
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  if (!API_KEY) return null;

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: API_KEY } }
    );
    const data = await res.json();
    const photo = data.photos?.[0];
    const url = photo?.src?.large || null;
    if (url) localStorage.setItem(cacheKey, url);
    return url;
  } catch {
    return null;
  }
}
