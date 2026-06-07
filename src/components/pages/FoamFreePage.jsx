import { useState } from 'react';
import Hero from '../shared/Hero';
import {
  BackLink, SectionHead, StepCard, Checklist,
  TipCard, MistakeCard, PillGroup,
} from '../shared/LearningPage';

/* ── Data ─────────────────────────────────────────────────── */

const MECHANICS = [
  {
    key: 'wire',
    icon: '🕸️',
    name: 'Chicken Wire',
    tag: 'Most versatile',
    tagColour: 'bg-[#B8CEAE]/40 text-[#3D5C3A]',
    best: 'Medium to large arrangements, vases, urns, bowls',
    notFor: 'Very small vessels, transparent glass where wire would be visible',
    tools: ['Galvanised chicken wire (2.5–5cm holes)', 'Wire cutters', 'Waterproof tape or wire ties to secure', 'Your chosen vessel'],
    steps: [
      { t: 'Cut the wire', d: 'Cut a piece roughly 1.5–2× the internal volume of your vessel.' },
      { t: 'Scrunch and fit', d: 'Crumple the wire into a loose ball and press into the vessel until it grips the sides.' },
      { t: 'Secure', d: 'Use waterproof tape or wire ties across the top to stop it lifting when stems are inserted.' },
      { t: 'Fill with water', d: 'Fill the vessel before inserting any stems.' },
      { t: 'Insert stems', d: 'Push stems through the wire mesh at your chosen angle. The mesh holds them in place.' },
    ],
    pexelsQuery: 'chicken wire flower arrangement vase',
    advantage: 'Reusable for years. Works in almost any vessel. Provides good stem support at any angle.',
    limitation: 'Visible through clear glass. Not suitable for very tight necked vessels.',
  },
  {
    key: 'tape',
    icon: '✂️',
    name: 'Tape Grid',
    tag: 'Best for beginners',
    tagColour: 'bg-amber-50 text-amber-700',
    best: 'Small to medium vases, jars, short-necked vessels up to 20 stems',
    notFor: 'Heavy stems, arrangements over 20 stems, vessels that will be moved',
    tools: ['Waterproof florist tape (not Sellotape)', 'A clean dry vessel', 'Scissors'],
    steps: [
      { t: 'Dry the rim', d: 'The vessel rim must be completely dry — tape will not bond to a wet surface.' },
      { t: 'First strips', d: 'Run parallel strips of tape across the opening, leaving 2–3cm gaps between each.' },
      { t: 'Cross strips', d: 'Run a second set of strips perpendicular to the first to form a grid (3×3 or 4×4).' },
      { t: 'Fill with water', d: 'Pour water carefully through the grid squares before inserting flowers.' },
      { t: 'Insert stems', d: 'Use each grid square as one stem position — one stem per square.' },
    ],
    pexelsQuery: 'flower vase tape grid arrangement',
    advantage: 'Cheap, quick, and immediately visible as a design feature in clear glass.',
    limitation: 'Single use. Does not work if the rim is wet. Limited to the number of grid squares.',
  },
  {
    key: 'kenzan',
    icon: '🪨',
    name: 'Pin Frog (Kenzan)',
    tag: 'Most precise',
    tagColour: 'bg-[#D4B8B5]/40 text-[#5C4535]',
    best: 'Low bowls, Ikebana-influenced designs, architectural arrangements',
    notFor: 'Large-scale arrangements, very soft-stemmed flowers',
    tools: ['Kenzan (round or rectangular)', 'Low shallow vessel', 'Floral putty or adhesive to secure kenzan to vessel base'],
    steps: [
      { t: 'Fix the kenzan', d: 'Use floral putty or adhesive to secure the kenzan to the dry vessel base before adding water.' },
      { t: 'Add water', d: 'Fill the vessel with clean water until the kenzan pins are fully submerged.' },
      { t: 'Cut stems', d: 'Cut stems at a 45° angle — a fresh clean cut grips the pins most securely.' },
      { t: 'Impale stems', d: 'Press stems firmly onto the pins at your chosen angle. Woody stems may need a slight twist.' },
      { t: 'Position and adjust', d: 'Unlike foam, stems can be repositioned. Use the negative space intentionally.' },
    ],
    pexelsQuery: 'kenzan ikebana flower arrangement bowl',
    advantage: 'Total stem placement control. Reusable indefinitely. Stems drink freely from open water.',
    limitation: 'Heavy. Only for low or stable vessels. Visible unless covered with moss or pebbles.',
  },
  {
    key: 'moss',
    icon: '🌿',
    name: 'Mossing',
    tag: 'Most natural',
    tagColour: 'bg-[#B8CEAE]/40 text-[#3D5C3A]',
    best: 'Rustic arrangements, outdoor events, wreath construction, moss frames',
    notFor: 'Formal or clean-line arrangements, arrangements that need to be moved frequently',
    tools: ['Sphagnum moss (soaked)', 'Reel wire (0.32mm)', 'Wire frame or vessel', 'Spray bottle for topping up moisture'],
    steps: [
      { t: 'Soak the moss', d: 'Soak dry sphagnum moss in cold water for 20–30 minutes. Squeeze to damp-but-not-dripping.' },
      { t: 'Pack the base', d: 'Press handfuls of moss tightly into your vessel or onto your frame. The denser, the better.' },
      { t: 'Bind (for frames)', d: 'For wire frames, use reel wire to bind the moss on, overlapping each pass by 30%.' },
      { t: 'Test the hold', d: 'Insert a test stem — it should grip without sliding. If it pulls free, compress the moss more.' },
      { t: 'Insert and mist', d: 'Insert stems at your chosen angles. Mist the moss daily to maintain moisture.' },
    ],
    pexelsQuery: 'moss floral arrangement natural sustainable',
    advantage: 'Fully biodegradable, long-lasting moisture retention, looks beautiful when exposed.',
    limitation: 'Heavier than other mechanics, must stay moist, not suitable for very clean minimal aesthetics.',
  },
];

const TROUBLESHOOTING = [
  {
    title: 'Stems falling out or slipping',
    problem: 'Wire mesh too loose, tape not bonded properly to the rim, or moss not packed densely enough.',
    fix: 'For wire: add more compression or tape the top. For tape: dry the rim completely and retape. For moss: repack and test each insertion.',
  },
  {
    title: 'Flowers wilting faster than expected',
    problem: 'Stems not reaching the water — either too short, resting on wire without reaching the pool, or moss has dried out.',
    fix: 'Recut stems longer. Ensure the vessel has adequate water. For moss arrangements, mist daily and top up water from below.',
  },
  {
    title: 'Arrangement unstable or toppling',
    problem: 'Mechanics are not secured to the vessel, or the vessel is too light for the stem weight.',
    fix: 'Tape chicken wire to the rim. Putty the kenzan to the base. Use heavier vessels for large arrangements or weight the base with stones.',
  },
  {
    title: 'Wire grid visible in glass vessel',
    problem: 'Green chicken wire or brown tape visible through clear glass — looks unfinished.',
    fix: 'Line the inside with a layer of foliage before inserting the wire. Or switch to a tape grid and treat it as a visible design feature.',
  },
  {
    title: 'Stems refusing to grip kenzan pins',
    problem: 'Stem cut at 90° (flat) — the pins have no fibre to grip. Or stem is very soft and bends around the pins.',
    fix: 'Always cut at 45° for kenzan work. For very soft stems, support with a stub wire inserted alongside.',
  },
];

const TIPS = [
  { icon: '♻️', label: 'Reuse everything', tip: 'Rinse chicken wire and kenzan after every arrangement and store dry. With care, they last years — not months.' },
  { icon: '💧', label: 'Water access', tip: 'In foam-free mechanics, stems drink from open water — they often last longer than foam-based equivalents. Keep water levels topped up.' },
  { icon: '🕸️', label: 'Wire compaction', tip: 'Lightly compacted wire gives more flexibility; tightly compacted gives more support. Match the compaction to the stem weight.' },
  { icon: '🌿', label: 'Moss moisture', tip: 'The most common foam-free failure is dried-out moss. Mist daily and pour water in around the sides of the vessel to rewet the base.' },
  { icon: '🏺', label: 'Vessel choice', tip: 'Heavy ceramic or stone vessels are far more forgiving than light glass for foam-free work. The vessel provides stability the mechanics cannot.' },
  { icon: '🎓', label: 'Mix methods', tip: 'Experienced florists layer mechanics — chicken wire base with a tape grid on top, or kenzan inside a mossed bowl. Combine for strength.' },
];

/* ── Mechanic detail panel ──────────────────────────────────── */
function MechanicPanel({ mechanic: m }) {
  return (
    <div className="mt-4 border-t border-stone-100 pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl border border-stone-100 p-4">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-[#3D5C3A] mb-3">Materials needed</p>
          <Checklist items={m.tools} />
        </div>
        <div className="bg-white rounded-xl border border-stone-100 p-4">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-500 mb-2">Best for</p>
          <p className="text-[12px] text-stone-600 font-light leading-relaxed mb-3">{m.best}</p>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-2">Not ideal for</p>
          <p className="text-[12px] text-stone-400 font-light leading-relaxed">{m.notFor}</p>
        </div>
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 mb-3">Construction steps</p>
      <div className="flex flex-col gap-2 mb-4">
        {m.steps.map((s, i) => (
          <div key={i} className="flex gap-3 bg-white rounded-lg border border-stone-100 px-4 py-3">
            <span className="w-5 h-5 rounded-full bg-[#3D5C3A] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
            <div>
              <p className="text-[12px] font-medium text-stone-700">{s.t}</p>
              <p className="text-[11px] text-stone-500 font-light mt-0.5">{s.d}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-[#B8CEAE]/15 border border-[#B8CEAE]/40 rounded-lg px-4 py-3">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-[#3D5C3A] mb-1">Advantages</p>
          <p className="text-[12px] text-[#3D5C3A] font-light leading-relaxed">{m.advantage}</p>
        </div>
        <div className="bg-stone-50 border border-stone-100 rounded-lg px-4 py-3">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 mb-1">Limitations</p>
          <p className="text-[12px] text-stone-500 font-light leading-relaxed">{m.limitation}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function FoamFreePage({ go }) {
  const [activeKey, setActiveKey] = useState(null);

  return (
    <div>
      <Hero
        eyebrow="Techniques & Skills · Sustainable Methods"
        title="Foam-Free"
        em="Mechanics"
        inline
        sub="A practical guide to arranging without single-use foam — four mechanics explained, step by step, with setup guides, advantages, and troubleshooting."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <BackLink label="Back to Techniques & Skills" onBack={() => go?.('techniques')} />

        {/* ── Why foam-free ── */}
        <div className="mb-14">
          <SectionHead eyebrow="Introduction" title="Why Foam-Free Matters" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '🌍', title: 'The environmental case', body: 'Traditional floral foam is made from non-biodegradable phenol formaldehyde resin — it breaks into microplastics that cannot be recovered from soil or waterways.' },
              { icon: '💐', title: 'Better for flowers', body: 'Foam-free stems drink from open water and typically last longer than foam-based equivalents. No degrading foam contaminates the water.' },
              { icon: '🎓', title: 'Required professional skill', body: 'The British Florist Association actively promotes foam-free practice. Competence in these mechanics marks a trained florist — not just a hobby arranger.' },
            ].map(c => (
              <div key={c.title} className="bg-white rounded-xl border border-stone-100 p-5">
                <span className="text-2xl mb-3 block">{c.icon}</span>
                <p className="text-[13px] font-semibold text-stone-700 mb-2">{c.title}</p>
                <p className="text-[12px] text-stone-500 font-light leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mechanics ── */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Mechanics Comparison"
            title="Four Methods — Choose the Right One"
            desc="Tap any mechanic to expand the full materials list, construction steps, and advantages."
          />
          <div className="flex flex-col gap-3">
            {MECHANICS.map(m => (
              <div key={m.key} className="bg-white rounded-xl border border-stone-100 overflow-hidden">
                <button
                  onClick={() => setActiveKey(k => k === m.key ? null : m.key)}
                  className="w-full text-left px-5 py-4 flex items-center gap-4 cursor-pointer"
                >
                  <span className="text-xl flex-shrink-0">{m.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[17px] font-semibold text-stone-800">{m.name}</span>
                      <span className={`text-[8px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${m.tagColour}`}>{m.tag}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-light mt-0.5">Best for: {m.best}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className={`flex-shrink-0 text-stone-400 transition-transform ${activeKey === m.key ? 'rotate-180' : ''}`}>
                    <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {activeKey === m.key && (
                  <div className="border-t border-stone-100 px-5 pb-5 bg-stone-50/40">
                    <MechanicPanel mechanic={m} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Pro tips ── */}
        <div className="mb-14">
          <SectionHead eyebrow="Professional Tips" title="Making Foam-Free Work in Practice" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TIPS.map(t => <TipCard key={t.label} {...t} />)}
          </div>
        </div>

        {/* ── Troubleshooting ── */}
        <div>
          <SectionHead eyebrow="Troubleshooting" title="Common Problems & Fixes" desc="Tap each problem to see the cause and the solution." />
          <div className="flex flex-col gap-2">
            {TROUBLESHOOTING.map(t => <MistakeCard key={t.title} {...t} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
