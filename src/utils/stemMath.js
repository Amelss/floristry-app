/** Pure stem-count and pricing math for the Stem Calculator. */

export const AVG_PRICE = { focal: 1.6, secondary: 0.9, foliage: 0.95, filler: 0.8 };

export function calcFromRatios(ratios, totalStems) {
  const total = Math.max(0, totalStems);
  const focal = Math.round(total * ratios.focal);
  const secondary = Math.round(total * ratios.secondary);
  const foliage = Math.round(total * ratios.foliage);
  const filler = total - focal - secondary - foliage;
  return { focal, secondary, foliage, filler, total };
}

export function scaleByQty(counts, qty) {
  return Object.fromEntries(
    Object.entries(counts).map(([k, v]) => [k, v * qty]),
  );
}

export function stemCost(counts) {
  return Object.entries(AVG_PRICE).reduce(
    (s, [role, price]) => s + (counts[role] ?? 0) * price,
    0,
  );
}
