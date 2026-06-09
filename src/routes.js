/**
 * Single source of truth for the URL structure.
 * Each page key maps to its public path, document title, and meta description.
 * Add new pages here first — App.jsx maps the same keys to components, and
 * scripts/prerender.mjs generates a static HTML file + sitemap entry per route.
 */
export const SITE_URL = 'https://myfloristryhelper.netlify.app';

export const ROUTES = {
  home: {
    path: '/',
    title: 'My Floristry Helper | UK Floristry Study Guide & Tools',
    description:
      'Free UK floristry study companion: flower guides, colour theory, wedding floristry, quizzes, stem calculators and conditioning timers for students and florists.',
  },

  /* ── Foundations ── */
  flowers: {
    path: '/core-flowers',
    title: '30 Core Flowers — Latin Names, Seasons & Care | My Floristry Helper',
    description:
      'Learn the 30 core florist flowers with Latin names, UK seasonality, vase life and care notes — the essential flower knowledge for floristry students.',
  },
  wheel: {
    path: '/colour-wheel',
    title: 'Interactive Colour Wheel for Florists | My Floristry Helper',
    description:
      'Explore colour harmony schemes for flower arranging — complementary, analogous and triadic palettes with floral examples.',
  },
  bouquets: {
    path: '/bouquet-flowers',
    title: 'Bouquet Flowers — Focal, Filler & Foliage Guide | My Floristry Helper',
    description:
      'Which flowers play which role in a bouquet: focal blooms, secondary flowers, fillers and foliage, with examples and pairing advice.',
  },
  seasonal: {
    path: '/seasonal-calendar',
    title: 'UK Seasonal Flower Calendar | My Floristry Helper',
    description:
      'Month-by-month guide to British seasonal flowers so you can plan arrangements and weddings around what is at its best.',
  },
  glossary: {
    path: '/glossary',
    title: 'Floristry Glossary A–Z | My Floristry Helper',
    description:
      'An A–Z glossary of floristry terms — techniques, tools, botany and design vocabulary explained in plain English.',
  },
  meanings: {
    path: '/flower-meanings',
    title: 'Flower Meanings & Floriography | My Floristry Helper',
    description:
      'The symbolism behind popular flowers — floriography, colour meanings and how to choose blooms that say the right thing.',
  },
  equipment: {
    path: '/tools-equipment',
    title: 'Floristry Tools & Equipment Guide | My Floristry Helper',
    description:
      'The florist kit guide for every level — snips, wires, tapes and mechanics, what they do and when you need them.',
  },

  /* ── Learn ── */
  styles: {
    path: '/style-guide',
    title: 'Floral Design Style Guide — Dutch Masters to Ikebana | My Floristry Helper',
    description:
      'The major floral design styles explained — from Dutch Masters and English garden to Ikebana and modern minimalism.',
  },
  techniques: {
    path: '/techniques',
    title: 'Floristry Techniques & Skills | My Floristry Helper',
    description:
      'Step-by-step practical floristry techniques — spiralling stems, wiring, taping and the core skills every florist needs.',
  },
  conditioning: {
    path: '/conditioning',
    title: 'Flower Conditioning & Care Guide | My Floristry Helper',
    description:
      'How to condition cut flowers properly to maximise vase life — stem treatments, hydration and flower-by-flower care notes.',
  },
  troubleshooting: {
    path: '/troubleshooting',
    title: 'Floristry Troubleshooting — Fix Common Problems | My Floristry Helper',
    description:
      'Drooping tulips, wilting hydrangeas, cloudy water — diagnose and fix the most common cut-flower problems.',
  },
  sustainability: {
    path: '/sustainability',
    title: 'Sustainable Floristry Guide | My Floristry Helper',
    description:
      'Eco-friendly floristry practices — foam-free mechanics, local and seasonal sourcing, and reducing waste in your work.',
  },
  workbook: {
    path: '/study-companion',
    title: 'Floristry Study Companion — Roadmap & Checklists | My Floristry Helper',
    description:
      'A structured study roadmap for floristry students with checklists, further reading and downloadable revision materials.',
  },
  proportion: {
    path: '/proportion-scale',
    title: 'Proportion & Scale in Floral Design | My Floristry Helper',
    description:
      'Vessel-to-flower size relationships, classic ratios and how to get proportion and scale right in any arrangement.',
  },
  sympathy: {
    path: '/sympathy-flowers',
    title: 'Sympathy & Funeral Flowers Guide | My Floristry Helper',
    description:
      'Funeral tributes, sympathy palettes and cultural guidance for one of the most sensitive areas of floristry.',
  },
  foundations: {
    path: '/foundations',
    title: 'Floristry Foundations | My Floristry Helper',
    description:
      'Start here: the foundation knowledge for floristry — core flowers, colour theory, seasonality and essential terms.',
  },
  learn: {
    path: '/learn',
    title: 'Learn Floristry — Guides & Tutorials | My Floristry Helper',
    description:
      'All the floristry learning guides in one place — design styles, techniques, care, sustainability and study resources.',
  },
  handtied: {
    path: '/hand-tied-bouquets',
    title: 'Hand-Tied Bouquets — Step-by-Step Guide | My Floristry Helper',
    description:
      'How to make a hand-tied bouquet — the spiral technique, stem counts, tying off and finishing for gift-ready bouquets.',
  },
  foamfree: {
    path: '/foam-free-floristry',
    title: 'Foam-Free Floristry — Mechanics & Methods | My Floristry Helper',
    description:
      'Foam-free mechanics for modern floristry — chicken wire, pin frogs, moss and reusable alternatives to floral foam.',
  },
  wreathmaking: {
    path: '/wreath-making',
    title: 'Wreath Making Guide | My Floristry Helper',
    description:
      'How to make wreaths — bases, mossing, foliage layering and decorating, for Christmas and all-season designs.',
  },

  /* ── Wedding ── */
  wedding: {
    path: '/wedding',
    title: 'Wedding Floristry Guide | My Floristry Helper',
    description:
      'The complete wedding floristry hub — bridal bouquets, corsages, table arrangements, styles, pricing and career advice.',
  },
  bridalBouquets: {
    path: '/wedding/bridal-bouquets',
    title: 'Bridal Bouquet Guide — Shapes, Styles & Flowers | My Floristry Helper',
    description:
      'Bridal bouquet shapes and styles explained — round, cascade, presentation and more, with flower choices for each.',
  },
  corsagesButtonholes: {
    path: '/wedding/corsages-buttonholes',
    title: 'Corsages & Buttonholes Guide | My Floristry Helper',
    description:
      'How to make corsages and buttonholes — wiring, taping, flower choices and how many a typical wedding needs.',
  },
  tableArrangements: {
    path: '/wedding/table-arrangements',
    title: 'Wedding Table Arrangements Guide | My Floristry Helper',
    description:
      'Wedding table arrangement styles — low centrepieces, tall statements, garlands and bud vases, with practical mechanics.',
  },
  weddingStyles: {
    path: '/wedding/styles',
    title: 'Wedding Flower Styles & Themes | My Floristry Helper',
    description:
      'Popular wedding flower styles — romantic garden, modern minimal, boho, classic — and how to deliver each look.',
  },
  weddingPricing: {
    path: '/wedding/pricing',
    title: 'Wedding Flower Pricing Guide | My Floristry Helper',
    description:
      'How wedding flowers are priced — typical UK budgets, itemised costs and how florists quote a full wedding.',
  },
  weddingCareer: {
    path: '/wedding/career',
    title: 'Becoming a Wedding Florist | My Floristry Helper',
    description:
      'A career guide to wedding floristry — training routes, building a portfolio and winning your first weddings.',
  },

  /* ── Tools ── */
  tools: {
    path: '/tools',
    title: 'Floristry Tools & Calculators | My Floristry Helper',
    description:
      'Interactive floristry tools — arrangement builder, stem calculator, knowledge quiz and flower care timer.',
  },
  builder: {
    path: '/arrangement-builder',
    title: 'Arrangement Builder — Recipe & Cost Calculator | My Floristry Helper',
    description:
      'Build a flower arrangement recipe and cost it out — stems, sundries, labour and margin in one calculator.',
  },
  stemcalc: {
    path: '/stem-calculator',
    title: 'Stem Calculator for Florists | My Floristry Helper',
    description:
      'Work out exactly how many stems you need for a single arrangement or a full event, by design size and flower role.',
  },
  quiz: {
    path: '/quiz',
    title: 'Floristry Quiz — Test Your Knowledge | My Floristry Helper',
    description:
      'Quick or in-depth floristry quizzes covering Latin names, seasonality, colour theory, design styles and flower care.',
  },
  flowertimer: {
    path: '/flower-care-timer',
    title: 'Flower Care Timer — Conditioning Steps & Timers | My Floristry Helper',
    description:
      'Step-by-step conditioning with built-in timers — track hydration and treatment times for every batch of flowers.',
  },
};

const PATH_TO_KEY = Object.fromEntries(
  Object.entries(ROUTES).map(([key, route]) => [route.path, key]),
);

export function pathForPage(key) {
  return ROUTES[key]?.path;
}

export function pageForPath(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return PATH_TO_KEY[normalized];
}
