// Role classification for every flower in COLOUR_NODES
export const FLOWER_ROLES = {
  // Red
  'Red rose': 'focal',
  'Red carnation': 'secondary',
  'Red tulip': 'secondary',
  'Red gerbera': 'focal',
  'Red anemone': 'secondary',
  'Red ranunculus': 'focal',
  // Orange
  'Sunflower (orange)': 'focal',
  'Orange gerbera': 'focal',
  'Orange lily': 'focal',
  'Marigold': 'filler',
  'Orange alstroemeria': 'secondary',
  'Orange tulip': 'secondary',
  // Yellow
  'Daffodil': 'secondary',
  'Yellow freesia': 'filler',
  'Yellow rose': 'focal',
  'Yellow tulip': 'secondary',
  'Yellow alstroemeria': 'secondary',
  'Solidago': 'filler',
  'Mimosa': 'filler',
  // Yellow-green
  'Alchemilla mollis': 'filler',
  'Bells of Ireland': 'line',
  'Bupleurum': 'filler',
  'Green trick dianthus': 'secondary',
  'Euphorbia': 'filler',
  // Green
  'Eucalyptus': 'foliage',
  'Ruscus': 'foliage',
  'Viburnum': 'secondary',
  'Green hydrangea': 'focal',
  'Hypericum (unripe)': 'filler',
  'Pittosporum': 'foliage',
  // Blue-green
  'Sea holly (eryngium)': 'secondary',
  'Thalictrum': 'filler',
  'Steel grass': 'foliage',
  'Mint foliage': 'foliage',
  'Green echinops': 'secondary',
  // Teal
  'Teal hydrangea': 'focal',
  'Blue-green veronica': 'filler',
  'Eryngium (teal)': 'secondary',
  'Tweedia': 'secondary',
  // Sky blue
  'Cornflower': 'secondary',
  'Nigella (love-in-a-mist)': 'filler',
  'Forget-me-not': 'filler',
  'Pale blue hydrangea': 'focal',
  // Blue
  'Delphinium': 'line',
  'Agapanthus': 'secondary',
  'Iris': 'secondary',
  'Blue hydrangea': 'focal',
  'Veronica': 'filler',
  'Blue anemone': 'secondary',
  // Violet
  'Lavender': 'filler',
  'Lisianthus (violet)': 'focal',
  'Statice': 'filler',
  'Sweet pea': 'secondary',
  'Allium': 'secondary',
  'Scabiosa': 'secondary',
  // Magenta
  'Hot pink rose': 'focal',
  'Cerise carnation': 'secondary',
  'Deep pink stocks': 'secondary',
  'Magenta ranunculus': 'focal',
  'Pink gerbera': 'focal',
  // Pink
  'Pink rose': 'focal',
  'Pink carnation': 'secondary',
  'Pink tulip': 'secondary',
  'Pink anemone': 'secondary',
  'Pink lisianthus': 'focal',
  'Snapdragon': 'line',
};

// Arrangement formulas per harmony scheme
export const SCHEME_FORMULAS = {
  complementary: {
    stems: { focal: '3–5', secondary: '5–7', filler: '4–6', foliage: '3–5' },
    ratio: '60 / 30 / 10',
    ratioLabel: 'Dominant / Complementary / Neutral',
    tip: 'Place your dominant-colour focals at the centre or highest point. Bring the complementary colour in at a lower level so it supports rather than competes.',
    combination: 'Bold contrast creates visual energy — ideal for eye-catching gift bouquets and statement arrangements.',
  },
  analogous: {
    stems: { focal: '4–6', secondary: '5–8', filler: '4–5', foliage: '4–5' },
    ratio: '50 / 30 / 20',
    ratioLabel: 'Base / Neighbour / Second Neighbour',
    tip: 'Blend your three neighbouring colours in a flowing arc — avoid grouping them in solid blocks. Transition gradually from one to the next.',
    combination: 'The most naturalistic scheme. Ideal for English garden bouquets, bridal work, and seasonal displays that mimic nature.',
  },
  triadic: {
    stems: { focal: '3–4', secondary: '4–5', filler: '5–7', foliage: '3–4' },
    ratio: '60 / 30 / 10',
    ratioLabel: 'Dominant / Secondary / Accent',
    tip: 'Use generous filler and foliage to prevent the three colours from fighting each other. The dominant colour should be unmistakably primary.',
    combination: 'Vibrant and celebratory. Suits summer displays, market stalls, and arrangements where energy and personality are the goal.',
  },
  split: {
    stems: { focal: '4–5', secondary: '4–5', filler: '4–6', foliage: '4–5' },
    ratio: '50 / 25 / 25',
    ratioLabel: 'Base / Split accent 1 / Split accent 2',
    tip: 'The two split colours should appear in roughly equal amounts. Their shared visual relationship to the base colour keeps the palette coherent.',
    combination: 'A beginner-friendly alternative to complementary — more variety, less risk of clashing. Works well for everyday bouquets.',
  },
  tetradic: {
    stems: { focal: '3–4', secondary: '3–4', filler: '5–7', foliage: '5–6' },
    ratio: '50 / 25 / 15 / 10',
    ratioLabel: 'Lead / Sub-dominant / Support / Accent',
    tip: 'One colour must clearly dominate. With four colours in play, generous foliage is essential to prevent visual overload — use it as a visual rest between colour groups.',
    combination: 'The most complex scheme. Reserve for wedding tablescapes, large event installations, and advanced practice.',
  },
};
