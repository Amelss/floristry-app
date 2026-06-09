import { useState } from 'react';
import Hero from '../shared/Hero';
import {
  BackLink, SectionHead, StepCard,
  TipCard, MistakeCard, PillGroup,
} from '../shared/LearningPage';

const BOUQUET_STYLES = [
  {
    emoji: '⭕',
    name: 'Round Posy',
    tag: 'Most popular',
    tagColour: 'bg-[#B8CEAE]/40 text-[#3D5C3A]',
    desc: 'A domed hand-tied bouquet. Clean, balanced, and suits virtually every dress style and venue. The most commercially important UK bridal bouquet style.',
    bestFor: 'All brides, all venues',
    difficulty: 'Beginner',
  },
  {
    emoji: '🌿',
    name: 'Garden Style',
    tag: 'Trending',
    tagColour: 'bg-[#B8CEAE]/40 text-[#3D5C3A]',
    desc: 'Loose, organic, and naturalistic. Includes foliage, herbs, and wildflower-type blooms. Looks as though it was gathered from a garden. Asymmetrical and textural.',
    bestFor: 'Outdoor, barn, walled garden venues',
    difficulty: 'Intermediate',
  },
  {
    emoji: '💫',
    name: 'Cascading',
    tag: 'Formal',
    tagColour: 'bg-stone-100 text-stone-500',
    desc: 'A trailing bouquet that flows downward from a central handle. Dramatic and formal. Requires wiring skills — stems trail freely or are wired into a constructed base.',
    bestFor: 'Formal church, stately home venues',
    difficulty: 'Advanced',
  },
  {
    emoji: '✨',
    name: 'Contemporary',
    tag: 'Modern',
    tagColour: 'bg-amber-50 text-amber-700',
    desc: 'Clean lines, deliberate negative space, unexpected textures. Often monochromatic or two-tone. Uses structural foliage, architectural flowers, or dried elements.',
    bestFor: 'Urban, industrial, or gallery venues',
    difficulty: 'Intermediate',
  },
  {
    emoji: '💧',
    name: 'Teardrop',
    tag: 'Elegant',
    tagColour: 'bg-[#D4B8B5]/40 text-[#5C4535]',
    desc: 'A round top tapering to a pointed base — softer and less dramatic than a full cascade. The focal cluster sits at the top; trailing material creates the teardrop silhouette.',
    bestFor: 'Formal and romantic venues',
    difficulty: 'Advanced',
  },
  {
    emoji: '〰️',
    name: 'Asymmetrical',
    tag: 'Editorial',
    tagColour: 'bg-amber-50 text-amber-700',
    desc: 'Material concentrated on one side, deliberately uneven. Increasingly popular in editorial and destination weddings. Requires a strong design eye to look intentional rather than unfinished.',
    bestFor: 'Contemporary, destination, editorial weddings',
    difficulty: 'Advanced',
  },
  {
    emoji: '🌸',
    name: 'Single Stem / Minimalist',
    tag: 'Minimal',
    tagColour: 'bg-stone-100 text-stone-500',
    desc: 'One or a few large statement flowers — a single peony, protea, garden rose, or dahlia. Minimal and modern. Often chosen by brides who want flowers that complement rather than compete.',
    bestFor: 'Minimalist, contemporary, elopements',
    difficulty: 'Beginner',
  },
];

const PROPORTION_ROWS = [
  {
    label: 'Petite bride (under 5\'4")',
    size: '22–27cm diameter',
    styles: 'Compact round or teardrop',
    avoid: 'Avoid oversized cascades',
  },
  {
    label: 'Average height (5\'4"–5\'7")',
    size: '28–33cm diameter',
    styles: 'Most styles work',
    avoid: 'Garden style particularly flattering',
  },
  {
    label: 'Tall bride (5\'8"+)',
    size: '32–38cm diameter',
    styles: 'Generous proportions',
    avoid: 'Cascades and garden styles work well',
  },
  {
    label: 'Plus/curvy silhouette',
    size: '28–35cm',
    styles: 'Round posy or garden style',
    avoid: 'Avoid very small posies that can look disproportionate',
  },
];

const BUILD_STEPS = [
  {
    number: 1,
    title: 'Condition and prepare',
    bullets: [
      'Condition all flowers 12–24 hours minimum before building.',
      'Strip all foliage from the lower two-thirds of every stem.',
      'Recut stems at 45° into clean water.',
      'Sort by type: focal flowers, secondary, fillers, foliage.',
    ],
    tip: 'Never build a bridal bouquet from unconditioned flowers. If one stem wilts mid-wedding, it affects the whole bouquet.',
    pexelsQuery: 'fresh flowers preparation conditioning floristry',
    fallbackEmoji: '✂️',
  },
  {
    number: 2,
    title: 'Build the spiral base',
    bullets: [
      'Hold the first stem (a focal flower) vertically.',
      'Add each new stem at 45° rotating the bouquet toward you.',
      'Build 4–5 stems before pausing to check the spiral is true.',
      'Every stem crosses at the same binding point.',
    ],
    tip: 'The spiral is the structure. Every other decision is design. Get the spiral right and everything else follows.',
    pexelsQuery: 'florist hand tied bouquet spiral technique',
    fallbackEmoji: '🌀',
  },
  {
    number: 3,
    title: 'Place focal flowers',
    bullets: [
      'Focal flowers set the overall scale and height of the dome.',
      'Space them evenly — no two identicals should touch.',
      'Use the rule of three: odd numbers read more naturally.',
      'Heavy-headed blooms (peonies, garden roses) sit at or just below centre.',
    ],
    tip: 'Place focal flowers before any others. They anchor the bouquet and everything else responds to them.',
    pexelsQuery: 'bridal bouquet roses peonies focal flowers',
    fallbackEmoji: '🌹',
  },
  {
    number: 4,
    title: 'Add secondary and filler flowers',
    bullets: [
      'Work outward in rings from the focal cluster.',
      'Lower the placement height very slightly as you move toward the edge.',
      'Distribute colour and texture evenly — avoid colour blocks.',
      'Step back every 5–6 stems to check from the side.',
    ],
    tip: 'Viewed from above, the surface of a well-built bridal bouquet should look like an even, convex dome — not a flat disc.',
    pexelsQuery: 'bridal bouquet building mixed flowers arrangement',
    fallbackEmoji: '💐',
  },
  {
    number: 5,
    title: 'Add foliage collar',
    bullets: [
      'The outer foliage ring should sit 1–2cm lower than the flowers.',
      'Use 2–3 foliage types for depth — ruscus, eucalyptus, pittosporum.',
      'The collar protects the flowers and frames them without competing.',
      'Check from all four sides: the foliage ring must be even.',
    ],
    tip: 'The foliage collar is the border of your bouquet. If it is uneven, the whole bouquet reads as uneven — regardless of how good the flowers are.',
    pexelsQuery: 'bouquet foliage eucalyptus collar greenery bridal',
    fallbackEmoji: '🌿',
  },
  {
    number: 6,
    title: 'Tie, finish, and wrap',
    bullets: [
      'Bind firmly at the binding point — at least 4 complete passes.',
      'Tie a double knot and recut all stems level at 45°.',
      'Stand the bouquet on a flat surface — it should stand unsupported.',
      'Wrap stems in satin ribbon, secure with pearl-headed pins.',
      'Mist and refrigerate until the wedding morning.',
    ],
    tip: 'A bridal bouquet handle should feel comfortable for a 6–8 hour day. Wrap generously — at least 2.5cm of ribbon coverage above and below the binding point.',
    pexelsQuery: 'bridal bouquet ribbon handle finished wedding',
    fallbackEmoji: '🎀',
  },
];

const MISTAKES = [
  {
    title: 'Bouquet wilting before end of ceremony',
    problem: 'Flowers not fully conditioned — less than 12 hours in water, or stems cut too short so they don\'t reach water in the vase.',
    fix: 'Condition all flowers for 24 hours. Keep the bouquet in a cool bucket of clean water until 30 minutes before it is carried. Recut stems just before assembly if possible.',
  },
  {
    title: 'Spiral collapsing when tied',
    problem: 'Stems were not all added at the same angle, or some stems were moved after placement, disrupting the binding point.',
    fix: 'Establish the binding point in the first 3 stems and never move it. Add every subsequent stem above the previous one, always rotating the bouquet — not the stem.',
  },
  {
    title: 'Ribbon handle slipping or unravelling',
    problem: 'Ribbon was started at the wrong point, or was pinned before being wrapped tightly enough, or the wrong ribbon type was used (too slippery).',
    fix: 'Start winding 1cm above the binding knot and overlap each pass by 30%. Use satin ribbon with pins at every 4cm interval. Wired-edge ribbon is easier to control than plain satin.',
  },
  {
    title: 'Bouquet lopsided or too heavy on one side',
    problem: 'Focal flowers placed asymmetrically in the first build phase, or heavy stems all concentrated on one side.',
    fix: 'Check from all four sides every 5–6 stems. Heavy-headed flowers (peonies, dahlias) must be balanced — one on each side of the focal cluster, not clustered together.',
  },
  {
    title: 'Flowers bruised or damaged by morning of wedding',
    problem: 'Bouquet was stored too cold (frost damage), too dry (dehydration), or the flowers were touching a surface and were compressed overnight.',
    fix: 'Store in a cool room (4–8°C), never a domestic freezer. Stand in shallow water in a clean bucket. Do not cover with cling film — flowers need airflow. Deliver in a box with tissue, not wrapped tight.',
  },
];

const PRO_TIPS = [
  { icon: '📐', label: 'Scale test', tip: 'Before building, hold a single stem against the bride\'s body (or use a mannequin/your own body). The stem length gives you the build size — the bouquet should not extend below the hip when held naturally.' },
  { icon: '🔢', label: 'Rule of odd numbers', tip: 'Focal flowers always in odd numbers — 3, 5, or 7. Even numbers create visual tension and symmetry that fights the organic quality of a good bouquet.' },
  { icon: '🎨', label: 'Colour flow', tip: 'Distribute each colour throughout the whole bouquet rather than grouping by colour. Pick up a focal flower, close one eye — you should be able to find every colour at every point in the dome.' },
  { icon: '📸', label: 'Photography awareness', tip: 'Bridal bouquets must read well in photographs. Avoid colours that blend into one another in low light — always photograph a test bouquet in daylight before the wedding day.' },
  { icon: '💧', label: 'Hydration picks', tip: 'For wired elements or cascades where stems cannot reach water, insert water-retaining gel picks into each wired unit. For a 6-hour wedding, this is the difference between fresh and wilted.' },
  { icon: '🕐', label: 'Build the day before', tip: 'For simple round posies, building the evening before and refrigerating overnight gives better results than building on the morning. The spiral settles and the flowers relax into the best position.' },
];

const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
const SEASONAL_FLOWERS = {
  Spring: ['Peony', 'Ranunculus', 'Tulip', 'Sweet pea', 'Blossom', 'Muscari'],
  Summer: ['Garden rose', 'Dahlia', 'Sweet pea', 'Cosmos', 'Hydrangea', 'Lavender'],
  Autumn: ['Dahlia', 'Chrysanthemum', 'Rosehip', 'Astrantia', 'Scabiosa', 'Smoke bush'],
  Winter: ['Hellebore', 'Anemone', 'Ranunculus', 'Amaryllis', 'Eucalyptus', 'Dried grasses'],
};

function DifficultyPill({ difficulty }) {
  const colour =
    difficulty === 'Beginner' ? 'bg-[#B8CEAE]/40 text-[#3D5C3A]' :
    difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700' :
    'bg-[#D4B8B5]/40 text-[#5C4535]';
  return (
    <span className={`text-[8px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${colour}`}>
      {difficulty}
    </span>
  );
}

export default function BridalBouquetsPage({ go }) {
  const [activeSeason, setActiveSeason] = useState('Spring');

  return (
    <div>
      <Hero
        eyebrow="Wedding Floristry · Bridal Bouquets"
        title="Bridal"
        em="Bouquets"
        sub="Styles, proportions, flower selection, and step-by-step construction — everything a beginner needs to build confident bridal bouquet work."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <BackLink label="Wedding Floristry" onBack={() => go?.('wedding')} />

        {/* Section 1 — What Makes a Successful Bridal Bouquet */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Foundations"
            title="What Makes a Successful Bridal Bouquet"
            desc="Three principles that underpin every well-executed bridal bouquet, regardless of style."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: '🎯',
                title: 'Proportion & scale',
                body: 'The bouquet should relate to the bride\'s height and dress. A petite bride with a ball gown calls for a compact 25–28cm posy; a tall bride in a fitted column dress can carry a 35cm dome or cascade. The flowers should never compete with the dress.',
              },
              {
                icon: '👁',
                title: 'Visual balance',
                body: 'Focal flowers anchor the eye. Secondary flowers carry the palette. Foliage and fillers provide depth and movement. A successful bouquet reads clearly from 10 metres — the palette and form should be immediately legible in a photograph.',
              },
              {
                icon: '💧',
                title: 'Longevity',
                body: 'Bridal bouquets are carried for 6–10 hours. Every stem must be fully conditioned (12–24 hours minimum). Wired elements need floristry tape and water-retaining gel picks. Avoid flowers that bruise easily or wilt quickly in warmth.',
              },
            ].map(card => (
              <div key={card.title} className="bg-white rounded-xl border border-stone-100 px-5 py-5">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-2">{card.title}</h3>
                <p className="text-[12px] text-stone-500 font-light leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 — Bouquet Styles */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Style Guide"
            title="Bouquet Styles"
            desc="Seven core bridal bouquet styles — from the most commercial to the most architectural."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BOUQUET_STYLES.map(style => (
              <div key={style.name} className="bg-white rounded-xl border border-stone-100 px-5 py-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl flex-shrink-0">{style.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 leading-tight">{style.name}</h3>
                      <span className={`text-[8px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${style.tagColour}`}>{style.tag}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[12px] text-stone-500 font-light leading-relaxed mb-3">{style.desc}</p>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="text-[11px] text-stone-400 font-light"><span className="font-medium text-stone-600">Best for: </span>{style.bestFor}</p>
                  <DifficultyPill difficulty={style.difficulty} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 — Proportions Guide */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Sizing"
            title="Proportions & Scale Guide"
            desc="Matching bouquet size to the bride's height and silhouette."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROPORTION_ROWS.map(row => (
              <div key={row.label} className="bg-white rounded-xl border border-stone-100 overflow-hidden flex">
                <div className="w-1 bg-[#B8CEAE] flex-shrink-0" />
                <div className="px-4 py-4">
                  <p className="text-[11px] font-semibold text-stone-700 mb-1">{row.label}</p>
                  <p className="text-[12px] text-[#3D5C3A] font-medium mb-0.5">{row.size}</p>
                  <p className="text-[11px] text-stone-500 font-light">{row.styles} — {row.avoid}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 — Step-by-Step: Round Posy */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Step-by-Step"
            title="Building a Round Posy"
            desc="The complete construction sequence for the most commercially important UK bridal bouquet style."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BUILD_STEPS.map(step => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>

        {/* Section 5 — Flower Selection */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Flower Selection"
            title="Choosing Bridal Flowers"
            desc="Favourites by category and seasonal availability guide."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Left card — bridal favourites by category */}
            <div className="bg-white rounded-xl border border-stone-100 px-5 py-5">
              <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-4">Bridal favourites by category</h3>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Focal', flowers: ['Rose (garden & spray)', 'Peony', 'Ranunculus', 'Dahlia', 'Lisianthus', 'Protea', 'Magnolia'] },
                  { label: 'Secondary', flowers: ['Sweet peas', 'Freesia', 'Alstroemeria', 'Scabiosa', 'Anemone', 'Cosmos'] },
                  { label: 'Fillers', flowers: ['Gypsophila', 'Waxflower', 'Astrantia', 'Muscari', 'Veronica', 'Nigella'] },
                  { label: 'Foliage', flowers: ['Eucalyptus (all types)', 'Ruscus', 'Pittosporum', 'Olive', 'Ferns', 'Ivy'] },
                ].map(cat => (
                  <div key={cat.label}>
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-1.5">{cat.label}</p>
                    <PillGroup items={cat.flowers} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right card — seasonal flowers */}
            <div className="bg-white rounded-xl border border-stone-100 px-5 py-5">
              <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-4">Seasonal bridal flowers</h3>
              <div className="flex gap-1.5 flex-wrap mb-5">
                {SEASONS.map(s => (
                  <button
                    key={s}
                    onClick={() => setActiveSeason(s)}
                    className={`text-[11px] font-medium px-3 py-1 rounded-full border transition-all ${
                      activeSeason === s
                        ? 'bg-[#3D5C3A] text-white border-[#3D5C3A]'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-[#3D5C3A]/40'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <PillGroup items={SEASONAL_FLOWERS[activeSeason]} />
              <p className="text-[11px] text-stone-400 font-light mt-4">
                Availability varies by grower and region. Always check with your wholesaler for the current season's stock.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6 — Common Mistakes */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Troubleshooting"
            title="Common Mistakes"
            desc="Tap each mistake to see what causes it and how to fix it."
          />
          <div className="flex flex-col gap-3">
            {MISTAKES.map(m => (
              <MistakeCard key={m.title} {...m} />
            ))}
          </div>
        </div>

        {/* Section 7 — Professional Tips */}
        <div className="mb-0">
          <SectionHead
            eyebrow="Professional Guidance"
            title="Professional Tips"
            desc="Insights from experienced wedding florists on producing consistently excellent bridal bouquets."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRO_TIPS.map(t => (
              <TipCard key={t.label} {...t} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
