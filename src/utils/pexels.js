import { PINNED_PEXELS_PHOTO_IDS } from "../data/pexelsPhotoIds";

/**
 * Resolve a photo query to its Pexels CDN URL via the pinned photo-id map.
 * Every query the app uses is pinned, so there are no runtime API calls and
 * no API key in the bundle. When new content adds a query, add it to
 * scripts/pexels-queries.json and run `npm run pin-images` once.
 *
 * Kept async so the many existing call sites don't need to change. Unpinned
 * queries return null and components show their coloured placeholder.
 */
export async function fetchPexelsPhoto(query) {
  if (!query || typeof query !== "string") return null;
  const id = PINNED_PEXELS_PHOTO_IDS[query.trim().toLowerCase()];
  if (!id) return null;
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&h=650&w=940`;
}
