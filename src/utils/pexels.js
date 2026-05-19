import { PINNED_PEXELS_PHOTO_IDS } from "../data/pexelsPhotoIds";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const CACHE_PREFIX = "pexels_v1_";

function pinnedPhotoUrl(photoId) {
  return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&h=650&w=940`;
}

export async function fetchPexelsPhoto(query) {
  if (!query || typeof query !== "string") return null;

  const normalizedQuery = query.trim().toLowerCase();
  const pinnedId = PINNED_PEXELS_PHOTO_IDS[normalizedQuery];
  if (pinnedId) {
    return pinnedPhotoUrl(pinnedId);
  }

  const cacheKey = CACHE_PREFIX + normalizedQuery;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  if (!API_KEY) return null;

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: API_KEY } },
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
