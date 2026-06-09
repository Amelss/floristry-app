import Hero from '../shared/Hero';
import {
  BackLink, SectionHead, Checklist,
  TipCard, MistakeCard,
} from '../shared/LearningPage';

const ARRANGEMENT_TYPES = [
  {
    emoji: '⬇️',
    name: 'Low Round Arrangement',
    desc: 'Sits below the eye line — guests can speak across it. The most practical choice for round tables at a seated dinner. Typically 25–35cm diameter, 15–20cm height.',
    bestFor: 'Round tables, long tables, any formal dinner',
    stems: '25–40 stems',
  },
  {
    emoji: '⬆️',
    name: 'High Candelabra Arrangement',
    desc: 'Dramatic raised centrepiece — flowers sit at eye level or above on a hire stand or candelabra. Guests speak under or around it. Very impactful photographically.',
    bestFor: 'Large formal venues, long banquets, luxury weddings',
    stems: '60–120 stems per arrangement',
  },
  {
    emoji: '🍾',
    name: 'Bud Vase Cluster',
    desc: 'Groups of 5–9 small vessels at varying heights filled with single stems or small posies. Relaxed, modern, and the most popular contemporary UK wedding style. Very time-efficient to produce.',
    bestFor: 'Round tables, trestle tables, modern and relaxed venues',
    stems: '3–5 stems per vase, 20–40 total per table',
  },
  {
    emoji: '〰️',
    name: 'Floral Runner',
    desc: 'A long low arrangement running the length of a trestle table. Continuous flow of foliage, blooms, and texture. Typically loose and organic. Beautiful for long barn or outdoor tables.',
    bestFor: 'Long trestle tables, barn and outdoor weddings',
    stems: '15–25 stems per metre of table',
  },
  {
    emoji: '🎂',
    name: 'Cake Flowers',
    desc: 'Loose stems, small clusters, or cascading arrangements placed directly on or around the wedding cake. Must be pesticide-free — food safe is non-negotiable. Discuss with the baker beforehand.',
    bestFor: 'All weddings with a wedding cake',
    stems: '5–15 stems depending on cake size',
  },
  {
    emoji: '🌿',
    name: 'Welcome Table',
    desc: 'A large statement arrangement or cluster greeting guests as they arrive. High impact, minimal effort — typically one large arrangement or a generous bud vase grouping. Often includes signage flowers.',
    bestFor: 'Venue entrance, drinks reception, ceremony entrance',
    stems: '40–80 stems',
  },
  {
    emoji: '🍾',
    name: 'Bar Arrangement',
    desc: 'Single or paired arrangements framing the bar. Should be generous — the bar is a high-traffic focal point. Use robust flowers that can withstand a warm, busy environment.',
    bestFor: 'Venue bars, drinks tables, cocktail hours',
    stems: '30–60 stems',
  },
  {
    emoji: '🔄',
    name: 'Repurposed Ceremony Flowers',
    desc: 'Ceremony flowers moved to the reception — pew ends become table arrangements, altar arrangements flank the top table. Efficient use of budget and adds design cohesion across both spaces.',
    bestFor: 'Budget-conscious couples, tight logistics',
    stems: 'Existing flowers — no additional cost',
  },
];

const SIZING_GUIDANCE = [
  {
    title: 'The 30cm rule',
    body: 'A low arrangement should not exceed one-third the diameter of the table. For an average 5ft round table (152cm), the maximum arrangement diameter is 50cm. Anything larger impedes place settings.',
  },
  {
    title: 'Eye-line rule',
    body: 'For seated guests, comfortable eye-line is 65–80cm from the floor. Low arrangements should sit below 45cm. High arrangements should be above 75cm. Anything in between obscures sightlines.',
  },
  {
    title: 'Stem count by table size',
    body: 'Round table (8 guests) → 25–40 stems for a low arrangement. Long table per metre → 15–25 stems for a runner. Top table (6m) → 3 low arrangements or 1 generous runner.',
  },
];

const MECHANICS = [
  {
    style: 'Low round',
    mechanic: 'Chicken wire in a low bowl, or a kenzan in a wide shallow vessel. Foam-free preferred. Water-to-rim before inserting stems.',
  },
  {
    style: 'High candelabra',
    mechanic: 'Compact chicken wire ball (often taped) attached to the candelabra top. Or a lined basket on a raised stand.',
  },
  {
    style: 'Bud vase cluster',
    mechanic: 'No mechanics needed. Stems directly in water. Use vessels of varying heights for visual interest.',
  },
  {
    style: 'Floral runner',
    mechanic: 'Long trough with chicken wire, or a series of linked moss pads. Stems inserted at angles along the length.',
  },
];

const RECIPE_BREAKDOWN = [
  { category: 'Focal flowers', count: '3', examples: 'Garden rose or peony' },
  { category: 'Secondary flowers', count: '5', examples: 'Ranunculus, lisianthus, or scabiosa' },
  { category: 'Supporting flowers', count: '8', examples: 'Spray rose, alstroemeria' },
  { category: 'Filler stems', count: '6', examples: 'Waxflower, astrantia' },
  { category: 'Foliage stems', count: '8', examples: 'Eucalyptus, ruscus, pittosporum' },
];

const RECIPE_TIPS = [
  'Mix foliage heights across an 8–15cm range for depth',
  'Distribute focal flowers in a triangle for visual balance',
  'Build from foliage base up — flowers are placed last',
  'Step back every 5 stems to check from the side',
  'Ensure water vessel is full before placing at the table',
];

const PRO_TIPS = [
  { icon: '📏', label: 'Measure the tables', tip: 'Always get the exact table size from the venue — not the couple. Table sizes vary. A centrepiece that works on a 5ft round may be too small for a 6ft round or too large for a 4ft.' },
  { icon: '🔢', label: 'Count covers', tip: 'Count the number of tables on the floor plan, not the total guest count. Wedding floor plans change. Always ask for the final floor plan two weeks before the event.' },
  { icon: '♻️', label: 'Repurpose creatively', tip: 'Ceremony flowers moved to reception can save 20–30% of material cost. Discuss this with couples in the first meeting — it often allows them to invest more in ceremony flowers.' },
  { icon: '🌡️', label: 'Venue temperature', tip: 'Warm venues (marquees in summer, spaces with underfloor heating) require heat-resistant flowers. Avoid ranunculus and sweet peas in venues over 22°C. Chrysanthemum, spray rose, and lisianthus are far more robust.' },
  { icon: '⏰', label: 'Setup timeline', tip: 'Allow 4–5 minutes per table for placing pre-built arrangements. For 20 tables, that is 80–100 minutes — plus travel time between venue zones. Build a realistic setup schedule and add 30% contingency.' },
  { icon: '💧', label: 'Water-carrying system', tip: 'All table arrangements need water in the vessel on delivery. Carry a watering can for top-ups. Foam-free arrangements in water-filled vessels last longer than foam-based — they can be topped up, foam cannot.' },
];

const MISTAKES = [
  {
    title: 'Centrepieces blocking sightlines',
    problem: 'Arrangement too tall (40–70cm range) — guests cannot see across the table or have uncomfortable conversations.',
    fix: 'Either go below 35cm or above 80cm. Never build in the 35–75cm sightline zone. Discuss this with couples at the consultation stage using a simple diagram.',
  },
  {
    title: 'Running short of flowers mid-setup',
    problem: 'Stem counts were based on estimates, not a tested recipe, or the recipe was not tested at scale.',
    fix: 'Always test-build one table arrangement and count exactly what was used. Multiply by tables, then add 15% contingency. Running short at a venue on a wedding morning is not recoverable.',
  },
  {
    title: 'Arrangement not stable in vessel',
    problem: 'Chicken wire not secured to vessel, or vessel too light for stem weight, or vessel has been moved after setup.',
    fix: 'Tape chicken wire to every vessel rim. Use waterproof tape. Heavy vessels (ceramic, stone) are always more stable than light glass for large arrangements.',
  },
  {
    title: 'Flowers wilting before end of reception',
    problem: 'Arrangements built too far in advance without water, or placed in direct sun or near heat sources at the venue.',
    fix: 'Build no more than 18 hours before the reception. Walk the venue and identify heat sources (windows, radiators, kitchen doors). Avoid placing flowers near any of them.',
  },
];

export default function TableArrangementsPage({ go }) {
  return (
    <div>
      <Hero
        eyebrow="Wedding Floristry · Reception Flowers"
        title="Table &"
        em="Reception Flowers"
        sub="Guest tables, long banquets, top tables, cake flowers, and ceremony-to-reception repurposing — with sizing guidance, mechanics, and design recipes."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <BackLink label="Wedding Floristry" onBack={() => go?.('wedding')} />

        {/* Section 1 — Types of Table Arrangement */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Arrangement Types"
            title="Types of Table Arrangement"
            desc="Eight arrangement styles for every venue, table shape, and wedding brief."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ARRANGEMENT_TYPES.map(arr => (
              <div key={arr.name} className="bg-white rounded-xl border border-stone-100 px-5 py-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl flex-shrink-0">{arr.emoji}</span>
                  <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 leading-tight">{arr.name}</h3>
                </div>
                <p className="text-[12px] text-stone-500 font-light leading-relaxed mb-3">{arr.desc}</p>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="text-[11px] text-stone-400 font-light"><span className="font-medium text-stone-600">Best for: </span>{arr.bestFor}</p>
                  <span className="text-[10px] font-medium text-[#3D5C3A] bg-[#3D5C3A]/8 px-2.5 py-0.5 rounded-full">{arr.stems}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 — Sizing Guide */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Sizing"
            title="How to Size a Table Arrangement"
            desc="Three rules that prevent the most common table arrangement mistakes."
          />
          <div className="flex flex-col gap-4">
            {SIZING_GUIDANCE.map(item => (
              <div key={item.title} className="bg-white rounded-xl border border-stone-100 overflow-hidden flex">
                <div className="w-1 bg-[#B8CEAE] flex-shrink-0" />
                <div className="px-5 py-4">
                  <p className="text-[12px] font-semibold text-stone-700 mb-1">{item.title}</p>
                  <p className="text-[12px] text-stone-500 font-light leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 — Mechanics by Style */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Mechanics"
            title="Mechanics by Style"
            desc="Which mechanic works for each arrangement style — foam-free preferred throughout."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MECHANICS.map(m => (
              <div key={m.style} className="bg-white rounded-xl border border-stone-100 px-5 py-4">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-[#3D5C3A] mb-1.5">{m.style}</p>
                <p className="text-[12px] text-stone-500 font-light leading-relaxed">{m.mechanic}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4 — Design Recipe */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Design Recipe"
            title="Guest Table Low Arrangement — Worked Recipe"
            desc="A 30cm low round arrangement for an 8-cover table. Target: 30 stems."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-stone-100 px-5 py-5">
              <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-4">Stem breakdown</h3>
              <div className="flex flex-col gap-3">
                {RECIPE_BREAKDOWN.map(row => (
                  <div key={row.category} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[12px] font-medium text-stone-700">{row.category}</p>
                      <p className="text-[11px] text-stone-400 font-light">{row.examples}</p>
                    </div>
                    <span className="text-[13px] font-bold text-[#3D5C3A] flex-shrink-0">{row.count}</span>
                  </div>
                ))}
                <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
                  <p className="text-[12px] font-semibold text-stone-700">Total</p>
                  <span className="text-[13px] font-bold text-[#3D5C3A]">30</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-stone-100 px-5 py-5">
              <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-4">Build tips</h3>
              <Checklist items={RECIPE_TIPS} />
            </div>
          </div>
        </div>

        {/* Section 5 — Professional Tips */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Professional Guidance"
            title="Professional Tips"
            desc="Insights on executing table and reception flowers at a professional standard."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRO_TIPS.map(t => (
              <TipCard key={t.label} {...t} />
            ))}
          </div>
        </div>

        {/* Section 6 — Common Mistakes */}
        <div className="mb-0">
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

      </div>
    </div>
  );
}
