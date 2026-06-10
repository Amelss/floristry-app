/**
 * Resolve any unpinned image queries to Pexels photo ids.
 *
 * The app builds image URLs directly from pinned ids in
 * src/data/pexelsPhotoIds.js (CDN only — no runtime API calls, no key in the
 * bundle). When new content adds a query, add it to scripts/pexels-queries.json
 * and run this once: it searches the Pexels API (key from .env.local, build
 * machine only) and appends the new pins.
 *
 * Run with: npm run pin-images
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PINNED_PEXELS_PHOTO_IDS } from '../src/data/pexelsPhotoIds.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const queries = JSON.parse(readFileSync(join(root, 'scripts', 'pexels-queries.json'), 'utf8'));

const missing = queries.filter((q) => !PINNED_PEXELS_PHOTO_IDS[q]);
if (missing.length === 0) {
  console.log(`All ${queries.length} queries already pinned.`);
  process.exit(0);
}

const envFile = readFileSync(join(root, '.env.local'), 'utf8');
const API_KEY = envFile.match(/^VITE_PEXELS_API_KEY=(.+)$/m)?.[1]?.trim();
if (!API_KEY) {
  console.error('No VITE_PEXELS_API_KEY in .env.local — cannot resolve new pins.');
  process.exit(1);
}

const resolved = {};
const failures = [];
for (const query of missing) {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: API_KEY } },
    );
    const id = res.ok ? (await res.json()).photos?.[0]?.id : null;
    if (id) {
      resolved[query] = id;
      console.log(`pinned: ${query} -> ${id}`);
    } else {
      failures.push(query);
    }
  } catch {
    failures.push(query);
  }
}

// Append new pins before the closing brace of the map
const file = join(root, 'src', 'data', 'pexelsPhotoIds.js');
const src = readFileSync(file, 'utf8');
const newEntries = Object.entries(resolved)
  .map(([q, id]) => `  "${q}": ${id},`)
  .join('\n');
const updated = src.replace(
  /\n\};/,
  `\n\n  // Pinned by scripts/pin-pexels-images.mjs\n${newEntries}\n};`,
);
writeFileSync(file, updated);

console.log(`\nAdded ${Object.keys(resolved).length} pins, ${failures.length} failed.`);
if (failures.length) console.log('Failed:\n  ' + failures.join('\n  '));
