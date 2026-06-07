import Hero from '../shared/Hero';
import {
  BackLink, SectionHead, StepCard, Checklist,
  TipCard, MistakeCard, ExerciseCard, PillGroup,
} from '../shared/LearningPage';

/* ── Data ─────────────────────────────────────────────────── */

const TOOLS = [
  'Sharp floral scissors or a knife — clean and dry before use',
  'Florist twine or raffia for binding',
  'A clean bucket with cool water for conditioning',
  'Rubber gloves if handling toxic stems (euphorbia, alliums)',
  'A flat surface or turntable if available',
];

const FOCAL_FLOWERS = ['Rose', 'Peony', 'Dahlia', 'Ranunculus', 'Lisianthus', 'Gerbera'];
const SECONDARY_FLOWERS = ['Alstroemeria', 'Spray rose', 'Freesia', 'Scabiosa', 'Chrysanthemum'];
const FILLERS = ['Gypsophila', 'Waxflower', 'Statice', 'Solidago', 'Nigella'];
const FOLIAGE = ['Ruscus', 'Eucalyptus', 'Pittosporum', 'Salal', 'Ivy'];
const LINE_FLOWERS = ['Delphinium', 'Snapdragon', 'Veronica', 'Eremurus'];

const STEPS = [
  {
    number: 1,
    title: 'Prepare flowers and foliage',
    bullets: [
      'Condition all flowers 12–24 hours before you begin — they must be fully hydrated.',
      'Strip ALL foliage from the lower two-thirds of every stem before you start building.',
      'Recut all stems at a 45° angle.',
      'Group flowers by type: focal, secondary, filler, foliage, line.',
    ],
    tip: 'Never strip foliage while holding the bouquet. Do all prep before picking up your first stem.',
    pexelsQuery: 'florist preparing fresh flower stems table',
    fallbackEmoji: '✂️',
  },
  {
    number: 2,
    title: 'Create the spiral',
    bullets: [
      'Hold the first stem vertically in your non-dominant hand — this is the binding point.',
      'Add the second stem at a 45° angle and rotate the bouquet toward you.',
      'Every stem goes in at the same angle, always in the same rotational direction.',
      'After 3–4 stems, test: relax your grip — the stems should not fall apart.',
    ],
    tip: 'The bouquet rotates toward you. The stem does not move. This is the most common beginner error.',
    pexelsQuery: 'florist spiral hand tied bouquet technique',
    fallbackEmoji: '🌀',
  },
  {
    number: 3,
    title: 'Add focal flowers',
    bullets: [
      'Place focal flowers at the centre-top — they set the overall height.',
      'Space them evenly — no two identical flowers should sit next to each other.',
      'Heavy-headed blooms (peonies, dahlias) sit slightly lower than lighter ones.',
      'Continue the spiral pattern with every addition.',
    ],
    tip: 'Add focal flowers confidently — they anchor the bouquet. The secondaries build around them.',
    pexelsQuery: 'florist roses focal flowers bouquet arrangement',
    fallbackEmoji: '🌹',
  },
  {
    number: 4,
    title: 'Build with secondary flowers',
    bullets: [
      'Work outward in a ring from the focal flowers.',
      'Lower the height very slightly as you move toward the outer edge.',
      'Distribute colour and texture evenly — no blocks of one colour.',
      'Pause every 5–6 stems and check the profile from the side.',
    ],
    tip: 'Viewed from above, the top should be building into an even dome. Check it often — correct early.',
    pexelsQuery: 'florist building flower arrangement bouquet mixed',
    fallbackEmoji: '💐',
  },
  {
    number: 5,
    title: 'Add foliage and movement',
    bullets: [
      'Foliage frames the outer edge and provides the green collar.',
      'Filler flowers (gypsophila, waxflower) close any visual gaps.',
      'Line flowers (snapdragons, delphiniums) add height variation at the edges.',
      'Step back and assess balance from all four sides before tying.',
    ],
    tip: 'The outer foliage ring should sit slightly below the flowers — it supports without competing.',
    pexelsQuery: 'florist eucalyptus foliage greenery bouquet wrapping',
    fallbackEmoji: '🌿',
  },
  {
    number: 6,
    title: 'Tie and finish',
    bullets: [
      'Hold the binding point firmly in your non-dominant hand.',
      'Wrap twine or raffia firmly — at least three complete passes.',
      'Tie a double knot and trim tails to 3–4cm.',
      'Stand the bouquet on a flat surface — it must stand unsupported.',
      'Recut all stems at 45° and place immediately in clean, deep water.',
    ],
    tip: 'If the bouquet tips when stood up, the stem spread is uneven. Untie, adjust, and retie.',
    pexelsQuery: 'florist tying bouquet twine finish professional',
    fallbackEmoji: '🎀',
  },
];

const MISTAKES = [
  {
    title: 'Foliage below the binding point',
    problem: 'Submerged leaves rot within hours, releasing bacteria that kill every stem in the bucket.',
    fix: 'Strip all foliage from the lower two-thirds of every stem before you begin. No exceptions.',
  },
  {
    title: 'Flat spiral — stems not truly spiralling',
    problem: 'All stems on the same plane — bouquet has no structural strength and collapses when tied.',
    fix: 'Add each new stem slightly above the previous entry point. Always rotate the bouquet, never the stem.',
  },
  {
    title: 'Loose or sliding binding point',
    problem: 'The tie slips down the stems, distorting the profile and weakening the whole structure.',
    fix: 'Bind firmly at the correct point (two-thirds down the stems). Use raffia or natural twine, not elastic.',
  },
  {
    title: 'Uneven dome or heavy on one side',
    problem: 'Looks balanced from the front but flat from the side, or all the weight sits on one side.',
    fix: 'Check from all four sides every 5–6 stems. Add to the thin side rather than removing from the full side.',
  },
  {
    title: 'Overcrowding at the centre',
    problem: 'Too many stems in the middle — flat top, no movement, and flowers bruise each other.',
    fix: 'Work outward in rings. After the focal flowers, every new stem belongs outside the previous one.',
  },
  {
    title: 'Stems cut too short before binding',
    problem: 'Bouquet can\'t sit in water — flowers dehydrate and die quickly after delivery.',
    fix: 'Cut stems after tying, not before. Finished length should allow at least 8cm to sit in water.',
  },
];

const TIPS = [
  { icon: '🎯', label: 'Binding point', tip: 'Set it at the start and never move it. Every single stem crosses at this exact same point — this is what holds the spiral together.' },
  { icon: '👁', label: 'Distance check', tip: 'Step back and view from arm\'s length regularly. Small imbalances are invisible up close but obvious at distance — correct them before they compound.' },
  { icon: '🔄', label: 'Rotation rule', tip: 'The bouquet rotates toward you; the stem does not move toward the bouquet. This single distinction separates a real spiral from a flat bunch.' },
  { icon: '⚖️', label: 'Balance feel', tip: 'A balanced bouquet should feel comfortable in your hand — not pulling to one side. If it tips in your hand, it will tip in a vase.' },
  { icon: '💧', label: 'Hydration', tip: 'Mist your flowers while you work if the environment is warm. Conditioned flowers hold their form; dehydrated ones droop mid-build.' },
  { icon: '🌿', label: 'Foliage first', tip: 'Always strip foliage before you start. Doing it mid-build with a bouquet in your hand risks shifting the binding point and disrupting the spiral.' },
];

const EXERCISES = [
  {
    level: 'Beginner',
    levelColour: 'bg-[#B8CEAE]/40 text-[#3D5C3A]',
    title: 'The 9-Stem Round',
    task: 'Build a round hand-tied using exactly 9 stems: 3 focal (roses or ranunculus), 3 secondary (alstroemeria), 3 foliage (ruscus or eucalyptus). No fillers.',
    goal: 'A clean, even spiral that stands unsupported when tied. Focus entirely on technique, not aesthetics.',
    time: '20–30 mins',
  },
  {
    level: 'Intermediate',
    levelColour: 'bg-amber-50 text-amber-700',
    title: 'The Domed Mixed Bouquet',
    task: 'Build a 15–20 stem bouquet using at least 4 flower types. Must include one line flower, one filler variety, and two foliage types.',
    goal: 'An even dome visible from all four sides. No two identical flowers touching. Colour distributed evenly throughout.',
    time: '40–50 mins',
  },
  {
    level: 'Advanced',
    levelColour: 'bg-[#D4B8B5]/40 text-[#5C4535]',
    title: 'Exhibition Standard — Timed',
    task: 'Produce a 20-stem presentation bouquet in 30 minutes. Flower mass 25cm wide, stems 35–40cm. Wrap in paper for presentation.',
    goal: 'RHS Level 2 standard: clean spiral, correct proportions, even dome, presentation wrapping. Judge it as an examiner would.',
    time: '30 mins timed',
  },
];

/* ── Page ─────────────────────────────────────────────────── */
export default function HandTiedPage({ go }) {
  return (
    <div>
      <Hero
        eyebrow="Techniques & Skills · Core Methods"
        title="Hand-Tied"
        em="Bouquets"
        inline
        sub="A complete practical guide — from your first spiral to exhibition standard. Follow each step, avoid the common mistakes, and build toward the timed challenge."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <BackLink label="Back to Techniques & Skills" onBack={() => go?.('techniques')} />

        {/* ── Introduction ── */}
        <div className="mb-14">
          <SectionHead eyebrow="Overview" title="What is a Hand-Tied Bouquet?" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-stone-100 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D5C3A] mb-2">What it is</p>
              <p className="text-[13px] text-stone-700 font-light leading-relaxed mb-3">A hand-tied bouquet is a bunch of flowers arranged in the hand using a spiral technique, then bound at a single point so the stems hold the flowers upright without a vase or foam.</p>
              <p className="text-[12px] text-stone-500 font-light leading-relaxed">The finished bouquet stands unsupported on its own bound stems — this is the test of a correctly made hand-tied.</p>
            </div>
            <div className="bg-white rounded-xl border border-stone-100 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D5C3A] mb-3">When it's used</p>
              <ul className="flex flex-col gap-2">
                {['Gift bouquets — the most common commercial application','Bridal bouquets and bridesmaids','Market stalls and florist shop displays','RHS Level 2 practical examination','Wedding flowers for guests to carry','Sympathy and tribute bouquets'].map((item, i) => (
                  <li key={i} className="flex gap-2 text-[12px] text-stone-600 font-light">
                    <span className="text-[#B8CEAE] flex-shrink-0 font-bold">·</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Tools & Materials ── */}
        <div className="mb-14">
          <SectionHead eyebrow="Tools & Materials" title="What You'll Need" desc="Gather everything before you begin. Good preparation is the foundation of good technique." />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-stone-100 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 mb-4">Tools checklist</p>
              <Checklist items={TOOLS} />
            </div>
            <div className="bg-white rounded-xl border border-stone-100 p-5 flex flex-col gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 mb-3">Focal flowers</p>
                <PillGroup items={FOCAL_FLOWERS} />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 mb-3">Secondary flowers</p>
                <PillGroup items={SECONDARY_FLOWERS} colour="bg-stone-100 text-stone-600" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 mb-3">Fillers & foliage</p>
                <PillGroup items={[...FILLERS, ...FOLIAGE]} colour="bg-[#3D5C3A]/5 text-[#3D5C3A]" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 mb-3">Line flowers (optional)</p>
                <PillGroup items={LINE_FLOWERS} colour="bg-stone-50 text-stone-500" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Steps ── */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Step-by-Step Guide"
            title="Building the Bouquet"
            desc="Follow each step in order. Do not skip ahead — each step builds on the previous one."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STEPS.map(step => <StepCard key={step.number} {...step} />)}
          </div>
        </div>

        {/* ── Common Mistakes ── */}
        <div className="mb-14">
          <SectionHead eyebrow="Common Mistakes" title="What Goes Wrong — and Why" desc="Tap each mistake to see the cause and the fix." />
          <div className="flex flex-col gap-2">
            {MISTAKES.map(m => <MistakeCard key={m.title} {...m} />)}
          </div>
        </div>

        {/* ── Pro tips ── */}
        <div className="mb-14">
          <SectionHead eyebrow="Professional Tips" title="Designer Techniques" desc="Six habits that distinguish trained florists from beginners." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TIPS.map(t => <TipCard key={t.label} {...t} />)}
          </div>
        </div>

        {/* ── Exercises ── */}
        <div>
          <SectionHead eyebrow="Practice Exercises" title="Bouquet Challenges" desc="Work through these in order. Each one builds on the skills from the last." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {EXERCISES.map(e => <ExerciseCard key={e.title} {...e} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
