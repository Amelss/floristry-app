export const CATEGORIES = [
  {
    key: 'foundations',
    label: 'Foundations',
    tagline: 'Your floristry reference library',
    description: 'The essential knowledge base for every floristry student. Core flowers, colour theory, seasonal guides, floriography, and the tools of the trade — all in one place.',
    pexelsQuery: 'english garden romantic flower arrangement bouquet', // Pexels ID: 19716556
    colour: '#3D5C3A',
    eyebrow: 'Floral Foundations · Reference',
    topics: [
      {
        key: 'flowers',
        label: '30 Core Flowers',
        desc: 'Latin names, UK seasons, native origins, and conditioning notes for the 30 most essential cut flowers and foliages.',
        icon: '🌸',
        tag: 'Reference',
        pexelsQuery: 'flower bouquet arrangement', // Pexels ID: 5409690
      },
      {
        key: 'wheel',
        label: 'Colour Wheel',
        desc: 'An interactive colour wheel covering all five harmony schemes with real flower suggestions for each palette.',
        icon: '🎨',
        tag: 'Interactive',
        pexelsQuery: 'colorful flowers garden', // Pexels ID: 34094245
      },
      {
        key: 'bouquets',
        label: 'Bouquet Flowers',
        desc: 'The top focal flowers, foliage choices, and filler flowers for building well-structured hand-tied bouquets.',
        icon: '💐',
        tag: 'Guide',
        pexelsQuery: 'hand tied bouquet flowers', // Pexels ID: 4691829
      },
      {
        key: 'seasonal',
        label: 'Seasonal Calendar',
        desc: 'Month-by-month guide to what is in season across the UK, with your location detected automatically.',
        icon: '📅',
        tag: 'Calendar',
        pexelsQuery: 'seasonal garden flowers', // Pexels ID: 28549926
      },
      {
        key: 'glossary',
        label: 'Glossary',
        desc: 'A comprehensive A–Z of floristry terms — from armature to wiring, every term explained clearly.',
        icon: '📖',
        tag: 'Reference',
        pexelsQuery: 'elegant minimal flower arrangement', // will search & cache
      },
      {
        key: 'meanings',
        label: 'Flower Meanings',
        desc: 'The symbolism and floriography of 24 flowers — what each bloom means, colour variations, and historical context.',
        icon: '🌿',
        tag: 'Floriography',
        pexelsQuery: 'romantic pastel pink flower bouquet soft', // Pexels ID: 36182995
      },
      {
        key: 'equipment',
        label: 'Tools & Equipment',
        desc: 'A complete kit guide covering every tool a floristry student needs, from essential to professional-level.',
        icon: '✂️',
        tag: 'Guide',
        pexelsQuery: 'garden scissors pruning shears tools', // will search & cache
      },
    ],
  },
  {
    key: 'learn',
    label: 'Learn',
    tagline: 'Skills, techniques & professional practice',
    description: 'Step-by-step guides to developing practical floristry skills — from historical styles and hand-tied bouquets through to sustainable working methods and professional event floristry.',
    pexelsQuery: 'floristry workshop arrangement', // Pexels ID: 5414007
    colour: '#6B8A66',
    eyebrow: 'Floral Foundations · Learn',
    topics: [
      {
        key: 'techniques',
        label: 'Techniques & Skills',
        desc: 'Step-by-step practical guides to hand-tied bouquets, foam-free mechanics, wiring, taping, and wreath making.',
        icon: '🤝',
        tag: 'Practical',
        pexelsQuery: 'floristry workshop arrangement', // Pexels ID: 5414007
      },
      {
        key: 'conditioning',
        label: 'Conditioning & Care',
        desc: 'How to maximise vase life — recutting stems, managing ethylene exposure, and professional conditioning standards.',
        icon: '💧',
        tag: 'Essential',
        pexelsQuery: 'fresh cut flowers vase water', // Pexels ID: 35334169
      },
      {
        key: 'styles',
        label: 'Style Guide',
        desc: 'From Dutch Masters and English garden style through to Ikebana and contemporary minimalism — the major floristry traditions explained.',
        icon: '🖼',
        tag: 'Design',
        pexelsQuery: 'opulent luxury flower arrangement abundant bouquet', // Pexels ID: 16935919
      },
      {
        key: 'wedding',
        label: 'Wedding Floristry',
        desc: 'Bridal bouquet styles, buttonholes, ceremony arches, table centres, and client consultation for event floristry.',
        icon: '💍',
        tag: 'Event',
        pexelsQuery: 'wedding flowers bridal bouquet', // Pexels ID: 30891127
      },
      {
        key: 'troubleshooting',
        label: 'Troubleshooting',
        desc: 'Diagnose and fix the most common floristry problems — wilting, browning, stems not drinking, and mechanics failures.',
        icon: '🔧',
        tag: 'Problem solving',
        pexelsQuery: 'wilting drooping flowers vase', // will search & cache
      },
      {
        key: 'sustainability',
        label: 'Sustainability Guide',
        desc: 'Practical steps toward greener floristry — ditching foam, buying British, reducing packaging, and composting waste.',
        icon: '🌱',
        tag: 'Eco',
        pexelsQuery: 'wildflower rustic bouquet meadow sunflower', // Pexels ID: 4749867
      },
      {
        key: 'workbook',
        label: 'Study Companion',
        desc: 'A structured learning roadmap with topic checklists, RHS guidance, and curated further reading for self-study students.',
        icon: '📋',
        tag: 'Self-guided',
        pexelsQuery: 'study notebook pen desk open journal', // will search & cache — non-flower
      },
    ],
  },
  {
    key: 'tools',
    label: 'Tools',
    tagline: 'Interactive tools & self-assessment',
    description: 'Practical calculators and interactive tools to help you plan arrangements, price commissions, and test your floristry knowledge.',
    pexelsQuery: 'scissors garden pruning shears tools workshop', // will search & cache — floristry tools
    colour: '#5B7BA8',
    eyebrow: 'Floral Foundations · Tools',
    topics: [
      {
        key: 'builder',
        label: 'Arrangement Builder',
        desc: 'Design an arrangement recipe, add stems and quantities, and get an instant cost breakdown for quoting or budgeting.',
        icon: '🧮',
        tag: 'Calculator',
        pexelsQuery: 'flower arrangement recipe planning notes', // Pexels ID: 8715602
      },
      {
        key: 'stemcalc',
        label: 'Stem Calculator',
        desc: 'Calculate stem counts for a single piece or a full event — bouquets, buttonholes, table centres, and more.',
        icon: '📐',
        tag: 'Calculator',
        pexelsQuery: 'flower stems bundle market flowers', // will search & cache
      },
      {
        key: 'quiz',
        label: 'Knowledge Quiz',
        desc: 'Test your floristry knowledge across all topic areas. Ten randomised questions per round with instant feedback.',
        icon: '✏️',
        tag: 'Quiz',
        pexelsQuery: 'pencil paper exam study test', // will search & cache — non-flower
      },
    ],
  },
];

export const FEATURED = [
  {
    key: 'flowers',
    label: '30 Core Flowers',
    tag: 'Start here',
    desc: 'The essential reference guide — photographs, Latin names, UK seasonality, and care notes for the 30 most important cut flowers.',
    pexelsQuery: 'flower bouquet arrangement', // Pexels ID: 5409690
  },
  {
    key: 'workbook',
    label: 'Study Companion',
    tag: 'Self-guided',
    desc: 'A structured six-week learning companion with roadmap, topic checklists, and RHS guidance — print and work through at your own pace.',
    pexelsQuery: 'study notebook pen desk open journal', // will search & cache — non-flower
  },
  {
    key: 'wheel',
    label: 'Colour Wheel',
    tag: 'Interactive',
    desc: 'An interactive colour wheel with all five harmony schemes and real flower suggestions — essential for design and palette work.',
    pexelsQuery: 'colorful flowers garden', // Pexels ID: 34094245
  },
];
