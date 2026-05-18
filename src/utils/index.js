import { COLOUR_NODES } from '../data/colourWheel';

export function getNearestNode(hue) {
  hue = ((hue % 360) + 360) % 360;
  let best = COLOUR_NODES[0], bd = 360;
  for (const n of COLOUR_NODES) {
    const d = Math.min(Math.abs(hue - n.hue), 360 - Math.abs(hue - n.hue));
    if (d < bd) { bd = d; best = n; }
  }
  return best;
}

export function hsl(h, s, l) {
  return `hsl(${Math.round(((h % 360) + 360) % 360)},${s}%,${l}%)`;
}

export function wikiImg(wiki, size = 500) {
  return `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=thumbnail&pithumbsize=${size}&titles=${encodeURIComponent(wiki)}&origin=*`;
}
