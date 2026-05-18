export const ARRANGEMENT_TYPES = [
  {
    id: 'hand-tied',
    name: 'Hand-Tied Bouquet',
    emoji: '💐',
    desc: 'The cornerstone skill of UK floristry. Spiralled stems, bound at the binding point.',
    sizes: {
      small:  { label: 'Small',  note: 'Gift size',    stems: 18 },
      medium: { label: 'Medium', note: 'Standard',     stems: 30 },
      large:  { label: 'Large',  note: 'Statement',    stems: 50 },
    },
    ratios: { focal: 0.30, secondary: 0.18, foliage: 0.30, filler: 0.22 },
  },
  {
    id: 'bridal',
    name: 'Bridal Bouquet',
    emoji: '👰',
    desc: 'Round posy — the most popular style in UK weddings. Lush, full, and elegant.',
    sizes: {
      small:  { label: 'Posy',   note: 'Compact',      stems: 22 },
      medium: { label: 'Classic',note: 'Standard',     stems: 35 },
      large:  { label: 'Full',   note: 'Abundant',     stems: 55 },
    },
    ratios: { focal: 0.35, secondary: 0.18, foliage: 0.25, filler: 0.22 },
  },
  {
    id: 'table-low',
    name: 'Low Table Centre',
    emoji: '🌺',
    desc: 'Sits below eye level so guests can talk across it. The most practical centrepiece.',
    sizes: {
      small:  { label: 'Small',  note: 'Intimate',     stems: 25 },
      medium: { label: 'Medium', note: 'Standard',     stems: 40 },
      large:  { label: 'Large',  note: 'Showpiece',    stems: 60 },
    },
    ratios: { focal: 0.28, secondary: 0.20, foliage: 0.30, filler: 0.22 },
  },
  {
    id: 'bud-vase',
    name: 'Bud Vase Cluster',
    emoji: '🫙',
    desc: 'Groups of small vessels at varying heights. Relaxed, modern, very popular.',
    sizes: {
      small:  { label: 'Small',  note: '5 vessels',    stems: 15 },
      medium: { label: 'Medium', note: '7 vessels',    stems: 25 },
      large:  { label: 'Large',  note: '9 vessels',    stems: 35 },
    },
    ratios: { focal: 0.28, secondary: 0.22, foliage: 0.28, filler: 0.22 },
  },
  {
    id: 'sympathy',
    name: 'Sympathy Tribute',
    emoji: '🕊️',
    desc: 'Sheaf or formal tribute for funeral work. A significant income stream in floristry.',
    sizes: {
      small:  { label: 'Small',  note: 'Sheaf',        stems: 20 },
      medium: { label: 'Medium', note: 'Standard',     stems: 35 },
      large:  { label: 'Large',  note: 'Full tribute', stems: 55 },
    },
    ratios: { focal: 0.28, secondary: 0.20, foliage: 0.30, filler: 0.22 },
  },
];

// UK approximate wholesale price per stem (£), 2024
export const FLOWER_PRICES = {
  'Rose':             1.80,
  'Carnation':        0.65,
  'Chrysanthemum':    0.75,
  'Lily':             1.50,
  'Tulip':            0.60,
  'Gerbera':          0.85,
  'Alstroemeria':     0.55,
  'Sunflower':        0.95,
  'Freesia':          0.75,
  'Lisianthus':       1.20,
  'Snapdragon':       0.70,
  'Stocks':           0.65,
  'Iris':             0.80,
  'Peony':            3.00,
  'Sweet Pea':        0.65,
  'Ranunculus':       1.20,
  'Anemone':          0.90,
  'Hyacinth':         0.85,
  'Daffodil':         0.45,
  'Hydrangea':        2.50,
  'Dahlia':           1.80,
  'Allium':           1.10,
  'Agapanthus':       1.50,
  'Delphinium':       1.30,
  'Scabiosa':         1.00,
  'Gypsophila':       1.20,
  'Waxflower':        1.30,
  'Statice':          0.90,
  'Eucalyptus':       1.80,
  'Ruscus':           0.80,
  'Alchemilla Mollis':0.90,
  'Pittosporum':      1.10,
  'Hypericum':        0.85,
};

export function stemPrice(flowerName) {
  for (const [key, price] of Object.entries(FLOWER_PRICES)) {
    if (flowerName.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(flowerName.toLowerCase())) {
      return price;
    }
  }
  return 1.00; // default
}
