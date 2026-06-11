import FLOWERS from "../data/flowers";
import { FOLIAGE as BOUQUET_FOLIAGE } from "../data/bouquets";
import { ARRANGEMENT_TYPES, stemPrice } from "../data/arrangementTypes";

/** Pure recipe math + share-link codec for the Arrangement Builder. */

// Adapt bouquets foliage (name/latin) to the flower shape the picker expects
export const FOLIAGE_FLOWERS = BOUQUET_FOLIAGE.map((f, i) => ({
  num: `foliage-${i}`,
  common: f.name,
  latin: f.latin,
  season: Array(12).fill(true), // foliage is available year-round
  roles: ["Foliage"],
}));

export const ROLE_KEYS = ["focal", "secondary", "foliage", "filler"];
export const ALL_PICKABLE = [...FLOWERS, ...FOLIAGE_FLOWERS];

export function distributeStems(flowers, total) {
  if (!flowers.length) return [];
  const base = Math.floor(total / flowers.length);
  const rem = total % flowers.length;
  return flowers.map((f, i) => ({
    flower: f,
    stems: base + (i < rem ? 1 : 0),
  }));
}

export function calcRecipe(type, size, picks) {
  const total = type.sizes[size].stems;
  const r = type.ratios;
  const hasSecondary = picks.secondary.length > 0;
  const focalTotal = Math.round(total * r.focal);
  const secTotal = hasSecondary ? Math.round(total * r.secondary) : 0;
  const foliageTotal = Math.round(total * r.foliage);
  const fillerTotal = total - focalTotal - secTotal - foliageTotal;
  return {
    focal: distributeStems(picks.focal, focalTotal),
    secondary: distributeStems(picks.secondary, secTotal),
    foliage: distributeStems(picks.foliage, foliageTotal),
    filler: distributeStems(picks.filler, fillerTotal),
    total,
  };
}

export function calcCost(recipe) {
  let cost = 0;
  ROLE_KEYS.forEach((role) => {
    recipe[role].forEach(({ flower, stems }) => {
      cost += stems * stemPrice(flower.common);
    });
  });
  return cost;
}

/* ── shareable links ─────────────────────────────────────────
   A recipe is encoded as flower ids + type + size in a base64url
   query param, and rehydrated from the app's own flower data —
   keeps URLs short and works with no backend. */
export function encodeRecipe({ name, typeId, size, picks }) {
  const payload = {
    n: name || "",
    t: typeId,
    s: size,
    p: ROLE_KEYS.map((r) => picks[r].map((f) => f.num)),
  };
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeRecipe(param) {
  try {
    const b64 = param.replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const data = JSON.parse(new TextDecoder().decode(bytes));
    const type = ARRANGEMENT_TYPES.find((t) => t.id === data.t);
    if (!type) return null;
    const picks = {};
    ROLE_KEYS.forEach((role, i) => {
      picks[role] = (Array.isArray(data.p?.[i]) ? data.p[i] : [])
        .map((num) => ALL_PICKABLE.find((f) => f.num === num))
        .filter(Boolean);
    });
    return {
      name: typeof data.n === "string" ? data.n : "",
      typeId: data.t,
      size: type.sizes[data.s] ? data.s : "medium",
      picks,
    };
  } catch {
    return null;
  }
}

export function shareUrl(recipe) {
  return `${window.location.origin}/arrangement-builder?r=${encodeRecipe(recipe)}`;
}
