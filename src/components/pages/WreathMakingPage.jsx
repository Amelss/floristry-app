import { useState } from 'react';
import Hero from '../shared/Hero';
import {
  BackLink, SectionHead, StepCard, Checklist,
  TipCard, MistakeCard, ExerciseCard, PillGroup,
} from '../shared/LearningPage';

/* ── Data ─────────────────────────────────────────────────── */

const WREATH_TYPES = [
  {
    icon: '🌿',
    name: 'Moss Wreath',
    tag: 'RHS Standard',
    tagColour: 'bg-[#B8CEAE]/40 text-[#3D5C3A]',
    desc: 'A wire ring packed with sphagnum moss. The foundation technique in UK floristry training — assessed at RHS Level 2.',
    materials: 'Wire double-ring frame, sphagnum moss, reel wire, stub wires, seasonal foliage and flowers.',
  },
  {
    icon: '🌾',
    name: 'Twig / Willow Wreath',
    tag: 'Natural',
    tagColour: 'bg-amber-50 text-amber-700',
    desc: 'A pre-formed twig or willow base. Materials are woven, tied, or hot-glued directly in. No mossing required. Long-lasting and reusable.',
    materials: 'Willow or twig ring, reel wire, dried or fresh materials, hot glue for decorative work.',
  },
  {
    icon: '🕊️',
    name: 'Sympathy Wreath',
    tag: 'Formal',
    tagColour: 'bg-stone-100 text-stone-500',
    desc: 'A restrained moss wreath in white and green. No decorative embellishments. All materials must be biodegradable for graveside placement.',
    materials: 'Wire ring, sphagnum moss, white chrysanthemums, white roses, plain foliage, no ribbon or picks.',
  },
  {
    icon: '🍂',
    name: 'Seasonal / Decorative',
    tag: 'Commercial',
    tagColour: 'bg-[#D4B8B5]/40 text-[#5C4535]',
    desc: 'Adapts to the season. Christmas wreaths use conifer and berries; autumn wreaths use seed heads and dried grasses. The most commercially valuable style.',
    materials: 'Base varies by season. Christmas: blue pine, holly, cones, velvet ribbon. Autumn: dried grasses, dahlias, rosehips.',
  },
];

const TOOLS = [
  'Wire double-ring frame (25–35cm for standard door wreath)',
  'Sphagnum moss (soaked 20–30 mins, squeezed to damp-not-dripping)',
  '0.32mm reel wire — one full spool minimum per wreath',
  '0.71mm stub wires — for double leg mounts on flowers',
  'Secateurs and floristry scissors',
  'Ribbon — 1.5m per bow (satin, velvet, or hessian)',
  'Wire cutters',
];

const SEASONAL_MATERIALS = {
  Christmas: ['Blue pine', 'Holly berries', 'Noble fir', 'Eucalyptus', 'Pinecones', 'Dried orange slices', 'Velvet ribbon'],
  Autumn: ['Dahlias', 'Rosehips', 'Seed heads', 'Bronze chrysanthemums', 'Dried grasses', 'Berried ivy'],
  Spring: ['Pussy willow', 'Blossom sprigs', 'Tulips', 'Daffodils', 'Soft foliage', 'Pastel ribbon'],
  Dried: ['Pampas grass', 'Lunaria (honesty)', 'Cotton stems', 'Preserved eucalyptus', 'Dried citrus'],
};

const STEPS = [
  {
    number: 1,
    title: 'Prepare the moss base',
    bullets: [
      'Soak sphagnum moss in cold water for 20–30 minutes.',
      'Squeeze until damp — not dripping. It should hold its shape when compressed.',
      'Anchor the reel wire to the frame with three tight turns before adding any moss.',
      'Take a handful of moss, press onto the flat wire ring, and bind immediately.',
    ],
    tip: 'Keep the wire spool attached throughout — never cut it until the wreath is complete. This lets you go back and tighten.',
    pexelsQuery: 'moss wreath base making florist wire frame',
    fallbackEmoji: '🌿',
  },
  {
    number: 2,
    title: 'Build the moss pad',
    bullets: [
      'Add handfuls of moss layer by layer, binding each addition with reel wire.',
      'Work consistently in one direction — clockwise or anti-clockwise. Never reverse.',
      'Target a pad depth of 4–5cm: firm and springy, not loose.',
      'Rotate the frame constantly to check even coverage from all angles.',
    ],
    tip: 'The most common error: too little moss. A thin base produces a thin, gappy wreath. More moss is always better than less.',
    pexelsQuery: 'wreath making moss base building green',
    fallbackEmoji: '⭕',
  },
  {
    number: 3,
    title: 'Add foliage foundation',
    bullets: [
      'Build small bundles of mixed foliage (3–5 stems per bundle).',
      'Bind each bundle to the moss base with reel wire — two firm passes per bundle.',
      'Overlap each bundle by 30–40% to conceal the binding of the previous one.',
      'Keep a consistent direction and maintain the same placement angle throughout.',
    ],
    tip: 'Check from the side every few bundles — the wreath should look full from the side, not just the front.',
    pexelsQuery: 'wreath foliage greenery eucalyptus base construction',
    fallbackEmoji: '🌲',
  },
  {
    number: 4,
    title: 'Place focal flowers',
    bullets: [
      'Wire focal flowers with a double leg mount (0.71mm stub wire).',
      'Tape each wired flower with floristry tape before inserting.',
      'Place focal flowers first — they define the overall design balance.',
      'Distribute focal flowers in a cluster or triangle arrangement, not in a line.',
    ],
    tip: 'Cluster placement (grouping 3 focal flowers together) reads more strongly than spacing them evenly around the ring.',
    pexelsQuery: 'wreath making flowers placement focal roses',
    fallbackEmoji: '🌸',
  },
  {
    number: 5,
    title: 'Fill secondary material',
    bullets: [
      'Add berries, secondary flowers, and accent materials between and around the focal cluster.',
      'Vary the height and angle of different materials to add depth.',
      'Step back and assess the balance of colour, texture, and mass.',
      'Fill any visible gaps with small moss patches or foliage sprigs.',
    ],
    tip: 'The outer edge should extend slightly beyond the wire frame edge. An edge that ends at the frame looks flat and unfinished.',
    pexelsQuery: 'Christmas wreath berries decoration seasonal',
    fallbackEmoji: '🍂',
  },
  {
    number: 6,
    title: 'Finish and tie off',
    bullets: [
      'Finish the reel wire by winding it back through several previous passes, then twist firmly around the frame wire.',
      'Attach a hanging loop from the frame wire at the 12 o\'clock position.',
      'Tie a ribbon bow if appropriate — a florist bow requires approximately 60cm of ribbon.',
      'Mist lightly with water if it\'s a fresh wreath. Store in a cool location until delivery.',
    ],
    tip: 'For door wreaths, test the hanging position before delivery — the wreath should hang perfectly level with the focal point at the bottom third.',
    pexelsQuery: 'finished Christmas wreath door ribbon bow',
    fallbackEmoji: '🎀',
  },
];

const DESIGN_VARIATIONS = [
  {
    style: 'Traditional',
    icon: '🏡',
    desc: 'Uniform coverage all the way around the ring. Classic foliage, berries, and a symmetrical focal cluster at the bottom. The standard UK Christmas door wreath.',
    keywords: ['Even coverage', 'Symmetrical focal point', 'Velvet bow', 'Classic materials'],
  },
  {
    style: 'Contemporary',
    icon: '🖼',
    desc: 'Clean lines, less material, deliberate negative space. Often monochromatic or uses unexpected textures like dried grasses, cotton, or pampas.',
    keywords: ['Negative space', 'Monochromatic', 'Dried materials', 'Minimal bow'],
  },
  {
    style: 'Asymmetrical',
    icon: '✨',
    desc: 'Material is concentrated on one side — typically the lower-left third — with the rest of the ring left as foliage or deliberately sparse. Very current in commercial floristry.',
    keywords: ['One-sided cluster', 'Strong focal point', 'Contemporary feel', 'Mixed textures'],
  },
  {
    style: 'Luxury',
    icon: '👑',
    desc: 'Full coverage with premium materials: garden roses, magnolia leaves, velvet ribbon, pheasant feathers, or metallic accents. Price point premium — sold in the £80–£150+ range.',
    keywords: ['Garden roses', 'Premium foliage', 'Velvet ribbon', 'Decorative picks'],
  },
];

const MISTAKES = [
  {
    title: 'Materials falling out after completion',
    problem: 'Reel wire binding was too loose, or moss was not dense enough to grip stub wire inserts.',
    fix: 'Each bind pass should overlap the previous one by 30%. Insert a test stem before starting flowers — it should grip firmly. If not, repack the moss.',
  },
  {
    title: 'Wreath looks flat when hung',
    problem: 'Moss base too shallow (under 3cm), or all material laid at the same flat angle.',
    fix: 'Build the moss base to 4–5cm depth. Vary material angles — some flat, some angled outward — to add dimension.',
  },
  {
    title: 'Uneven coverage or gaps appearing',
    problem: 'Bundles too small, or were placed too far apart without enough overlap.',
    fix: 'Make bundles slightly larger than you think necessary. Overlap each new bundle by 30–40% over the binding of the previous one.',
  },
  {
    title: 'Fresh flowers wilting quickly',
    problem: 'Flowers were inserted into dry moss, or the wreath was kept in a warm dry environment.',
    fix: 'After construction, mist heavily and store in a cool environment (ideally 4–8°C) overnight. Mist again before delivery.',
  },
  {
    title: 'Wire showing through the design',
    problem: 'Insufficient foliage coverage, or reel wire not embedded deeply enough in the moss.',
    fix: 'Cover visible wire with small foliage sprigs or moss patches. The back of the wreath can show wire; the front and sides must not.',
  },
];

const TIPS = [
  { icon: '🔗', label: 'Never cut the wire', tip: 'Keep the reel wire attached until the very end. You can always go back to add a tighter pass — once cut, you cannot.' },
  { icon: '➡️', label: 'One direction only', tip: 'Work consistently clockwise or anti-clockwise. Reversing mid-wreath creates weak points and visible inconsistencies in the bind.' },
  { icon: '💧', label: 'Mist, don\'t soak', tip: 'After building, mist the fresh materials lightly and refrigerate. Over-soaking causes petals to bruise; under-watering causes rapid wilt.' },
  { icon: '👁', label: 'Check the side view', tip: 'Most beginners only check the front. A well-made wreath looks full from the side too — check every 4–5 bundles.' },
  { icon: '🛒', label: 'Buy more than you need', tip: 'For foliage, buy 30% more than you estimate. Trimming, waste, and last-minute gap-filling are significant. Running short mid-wreath is avoidable.' },
  { icon: '📐', label: 'Position the focal third', tip: 'Whether traditional or contemporary, a focal cluster placed in the lower-third of the wreath reads most naturally when hung on a door.' },
];

/* ── Page ─────────────────────────────────────────────────── */
export default function WreathMakingPage({ go }) {
  const [activeSeason, setActiveSeason] = useState('Christmas');

  return (
    <div>
      <Hero
        eyebrow="Techniques & Skills · Seasonal Work"
        title="Wreath"
        em="Making"
        inline
        sub="From moss base construction to seasonal and sympathy wreaths — a complete step-by-step construction guide with design variations and troubleshooting."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <BackLink label="Back to Techniques & Skills" onBack={() => go?.('techniques')} />

        {/* ── Wreath types ── */}
        <div className="mb-14">
          <SectionHead eyebrow="Types of Wreaths" title="Choose Your Style" desc="Each type has a different base, different materials, and a different construction method." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WREATH_TYPES.map(w => (
              <div key={w.name} className="bg-white rounded-xl border border-stone-100 p-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl flex-shrink-0">{w.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[17px] font-semibold text-stone-800">{w.name}</span>
                      <span className={`text-[8px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${w.tagColour}`}>{w.tag}</span>
                    </div>
                    <p className="text-[12px] text-stone-500 font-light leading-relaxed">{w.desc}</p>
                  </div>
                </div>
                <div className="bg-stone-50 rounded-lg px-3 py-2">
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-1">Materials</p>
                  <p className="text-[11px] text-stone-500 font-light leading-relaxed">{w.materials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tools & Materials ── */}
        <div className="mb-14">
          <SectionHead eyebrow="Tools & Materials" title="What You'll Need" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-stone-100 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 mb-4">Core tools checklist</p>
              <Checklist items={TOOLS} />
            </div>
            <div className="bg-white rounded-xl border border-stone-100 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 mb-3">Seasonal materials</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {Object.keys(SEASONAL_MATERIALS).map(s => (
                  <button
                    key={s}
                    onClick={() => setActiveSeason(s)}
                    className={`text-[10px] px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${activeSeason === s ? 'bg-[#3D5C3A] text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <PillGroup items={SEASONAL_MATERIALS[activeSeason]} colour="bg-[#3D5C3A]/8 text-[#3D5C3A]" />
            </div>
          </div>
        </div>

        {/* ── Steps ── */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Step-by-Step Construction"
            title="Building the Wreath"
            desc="Follow each step in sequence. The base must be complete before flowers are added — do not skip ahead."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STEPS.map(step => <StepCard key={step.number} {...step} />)}
          </div>
        </div>

        {/* ── Design variations ── */}
        <div className="mb-14">
          <SectionHead eyebrow="Design Variations" title="Four Styles to Know" desc="The same construction technique produces very different results depending on how you place the material." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DESIGN_VARIATIONS.map(v => (
              <div key={v.style} className="bg-white rounded-xl border border-stone-100 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{v.icon}</span>
                  <span style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[17px] font-semibold text-stone-800">{v.style}</span>
                </div>
                <p className="text-[12px] text-stone-500 font-light leading-relaxed mb-3">{v.desc}</p>
                <PillGroup items={v.keywords} colour="bg-stone-100 text-stone-600" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Pro tips ── */}
        <div className="mb-14">
          <SectionHead eyebrow="Professional Tips" title="Working Like a Florist" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TIPS.map(t => <TipCard key={t.label} {...t} />)}
          </div>
        </div>

        {/* ── Troubleshooting ── */}
        <div>
          <SectionHead eyebrow="Common Problems & Solutions" title="What Goes Wrong — and Why" desc="Tap each problem to see the cause and the fix." />
          <div className="flex flex-col gap-2">
            {MISTAKES.map(m => <MistakeCard key={m.title} {...m} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
