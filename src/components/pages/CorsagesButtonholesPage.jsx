import Hero from '../shared/Hero';
import {
  BackLink, SectionHead, StepCard,
  TipCard, MistakeCard, PillGroup,
} from '../shared/LearningPage';

const BUTTONHOLE_TYPES = [
  {
    emoji: '🤵',
    title: 'Groom\'s buttonhole',
    desc: 'The most important. Should match or echo the bridal bouquet directly. One focal flower (rose, ranunculus, peony). Quality of construction must be perfect.',
  },
  {
    emoji: '👔',
    title: 'Groomsmen buttonholes',
    desc: 'Should relate to groom\'s but be slightly simpler. Often the same flower in a different variety or a secondary flower from the bouquet palette.',
  },
  {
    emoji: '👨‍👩‍👧',
    title: 'Family buttonholes',
    desc: 'For fathers, grandfathers, ushers. Often a simpler version — single stem, spray rose, or a seasonal flower. Can include foliage or a small bud.',
  },
  {
    emoji: '🌿',
    title: 'Pocket floral',
    desc: 'A modern alternative to a traditional buttonhole. A small cluster of dried flowers, herbs, or foliage tucked into the breast pocket without wiring. Quick, contemporary, and very popular currently.',
  },
];

const BUTTONHOLE_STEPS = [
  {
    number: 1,
    title: 'Select and prepare the flower',
    bullets: [
      'Choose a single focal flower at three-quarter to full open stage.',
      'Remove all foliage and sideshoots from the stem.',
      'Recut the stem to 3–4cm below the head.',
      'Allow the flower to drink in conditioning solution for 2 hours minimum.',
    ],
    tip: 'Do not build buttonholes from tight buds — they will still be closed at the wedding. Equally, avoid fully open flowers that may drop petals. Three-quarter open is ideal.',
    pexelsQuery: 'buttonhole boutonniere rose single stem close up',
    fallbackEmoji: '🌹',
  },
  {
    number: 2,
    title: 'Wire the stem',
    bullets: [
      'Take a 0.71mm stub wire. Insert it through the base of the flower head.',
      'Bend both wire ends down alongside the stem.',
      'Twist one wire around the natural stem and the other wire 4–5 times.',
      'The wired stem should feel firm — not rigid, not floppy.',
    ],
    tip: 'The wire supports the flower head and prevents drooping on a warm wedding day. If the wire is too fine (under 0.56mm), the head will still flop. Use 0.71mm for most focal flowers.',
    pexelsQuery: 'florist wiring flower stem buttonhole technique',
    fallbackEmoji: '🔧',
  },
  {
    number: 3,
    title: 'Add foliage and backing',
    bullets: [
      'Select 2–3 small foliage leaves (ivy, ruscus, eucalyptus, or herbs).',
      'Wire each leaf with a 0.32mm wire through the midrib.',
      'Position backing leaves behind and slightly above the flower head.',
      'Bind the foliage wires lightly against the main stem before taping.',
    ],
    tip: 'The foliage backing frames the flower and protects the lapel from moisture. Always include a foliage layer — even in very minimal designs.',
    pexelsQuery: 'boutonniere buttonhole foliage eucalyptus backing',
    fallbackEmoji: '🌿',
  },
  {
    number: 4,
    title: 'Tape the stem',
    bullets: [
      'Use floristry tape (half-width for fine work).',
      'Start 1cm below the flower head — pull the tape slightly as you wind.',
      'Work downward in a spiral, overlapping each pass by 40%.',
      'Continue to the tip of the wire — never leave exposed wire.',
    ],
    tip: 'Floristry tape sticks to itself through tension — you must stretch it as you apply it. If you are not pulling the tape, it will not bond and the buttonhole will unravel.',
    pexelsQuery: 'florist taping stem floristry tape technique',
    fallbackEmoji: '🩹',
  },
  {
    number: 5,
    title: 'Shape and trim',
    bullets: [
      'Trim the finished stem to 6–8cm.',
      'Gently curve the stem slightly — a straight stem looks stiff; a subtle curve looks natural.',
      'Press the flower head lightly to check it is firmly attached — it should not move.',
      'Check the profile: the flower head should face forward and slightly upward.',
    ],
    tip: 'A buttonhole should be slightly angled upward when worn. If it sits flat or hangs down, the stem curve needs adjustment.',
    pexelsQuery: 'finished buttonhole boutonniere wedding groom',
    fallbackEmoji: '✅',
  },
  {
    number: 6,
    title: 'Store and deliver',
    bullets: [
      'Mist very lightly and wrap in tissue paper in a lidded box.',
      'Store in a cool room (4–8°C) overnight.',
      'Do NOT refrigerate with other food — ethylene gas from fruit accelerates wilting.',
      'Deliver in individual named boxes for easy distribution on the morning.',
    ],
    tip: 'Buttonholes for a party of 12 look identical. Always label them clearly — groom, best man, father of bride. A mix-up on the morning is entirely avoidable.',
    pexelsQuery: 'wedding buttonhole boutonniere box delivery',
    fallbackEmoji: '📦',
  },
];

const CORSAGE_TYPES = [
  {
    emoji: '💜',
    title: 'Wrist corsage',
    desc: 'Worn on the non-dominant wrist. Must be lightweight — under 60g. Use a wristband base with wired flower units. Avoid flowers with rigid stems or heavy heads. Tested for comfort before the wedding.',
  },
  {
    emoji: '📌',
    title: 'Pin-on corsage',
    desc: 'Attached with pearl-headed pins to the lapel or shoulder. Slightly more elaborate than a buttonhole. 10–14cm. Must lie flat — no elements should stick out perpendicular to the garment.',
  },
  {
    emoji: '🌾',
    title: 'Modern wearable floral',
    desc: 'Hair florals, floral jewellery, dried shoulder corsages, flower barrettes. Uses dried or preserved materials — no water management required. Long-lasting and very popular currently.',
  },
];

const CORSAGE_STEPS = [
  {
    number: 1,
    title: 'Plan and wire individual units',
    bullets: [
      'Identify your focal unit (1 flower), secondary units (2–3 smaller flowers), and foliage units (3–4 leaves).',
      'Wire each unit separately using the appropriate wiring method.',
      'Tape each wired unit individually before assembly.',
      'Lay all units out in intended position before assembling.',
    ],
    tip: 'Building a corsage from pre-wired units is far easier than trying to wire everything together at once. Prepare all units, then assemble.',
    pexelsQuery: 'wrist corsage flowers wiring assembly',
    fallbackEmoji: '🔧',
  },
  {
    number: 2,
    title: 'Assemble the corsage',
    bullets: [
      'Begin with the focal unit — position it at the intended angle.',
      'Add secondary units on either side, layering slightly behind.',
      'Add foliage units at the edges to frame and extend.',
      'Bind all wires together firmly with reel wire before taping.',
    ],
    tip: 'Keep the overall footprint narrow — corsages wider than 12–13cm look heavy on the wrist and can unbalance the silhouette.',
    pexelsQuery: 'corsage assembly florist wrist flowers',
    fallbackEmoji: '💐',
  },
  {
    number: 3,
    title: 'Tape the full assembly',
    bullets: [
      'Begin taping from just below the focal unit.',
      'Work downward, catching all wires in the tape.',
      'Keep the assembly flat — nothing should sit at a right angle to the wrist.',
      'End the tape 4–5cm below the last unit.',
    ],
    tip: 'A taped corsage should flex slightly — not be rigid. Rigid corsages are uncomfortable to wear for several hours.',
    pexelsQuery: 'florist taping corsage assembly wedding',
    fallbackEmoji: '🩹',
  },
  {
    number: 4,
    title: 'Attach to wristband',
    bullets: [
      'Use a pre-made satin or pearl wristband, or make one from ribbon.',
      'Secure the corsage to the band with fine reel wire or thread.',
      'Ensure the attachment is flush — no wobble, no tilt.',
      'Test on your own wrist: the flower should face upward, not to the side.',
    ],
    tip: 'Ask about the wearer\'s wrist size in advance. A too-loose band will rotate and the corsage will be upside-down in every photograph.',
    pexelsQuery: 'wrist corsage finished wedding attached ribbon',
    fallbackEmoji: '💍',
  },
  {
    number: 5,
    title: 'Check and store',
    bullets: [
      'Hold at arm\'s length and check: is it flat? Even? Forward-facing?',
      'Mist very lightly — avoid soaking as ribbon will mark.',
      'Store in a box in a cool room, not refrigerated.',
      'Deliver in individual named boxes with a pin for backup.',
    ],
    tip: 'Always include one spare pin. Corsage pins are tiny and easily dropped at 7am on a wedding morning.',
    pexelsQuery: 'corsage wedding flowers box delivery',
    fallbackEmoji: '📦',
  },
];

const PRO_TIPS = [
  { icon: '⚖️', label: 'Weight limit', tip: 'A finished wrist corsage should weigh no more than 50–60g. Weigh your finished corsage on kitchen scales before any wedding. Heavy corsages droop, rotate, and become uncomfortable by the ceremony.' },
  { icon: '🌡️', label: 'Temperature management', tip: 'Personal flowers are carried and worn close to the body — far warmer than a vase arrangement. Use flowers known for heat resistance: spray roses, ranunculus, lisianthus. Avoid flowers that wilt in warmth: sweet peas, poppies.' },
  { icon: '🏷️', label: 'Labelling', tip: 'For a wedding party of 10+, label every single item. Groom, Best Man, Father of Bride, Father of Groom. A mixed-up buttonhole causes stress you do not want on a wedding morning.' },
  { icon: '🔗', label: 'Palette unity', tip: 'Every personal flower — groom buttonhole, groomsmen, family corsages — should share at least one flower or one colour with the bridal bouquet. This creates visual cohesion in photographs.' },
  { icon: '🪡', label: 'Tape tension', tip: 'Floristry tape requires tension to bond. Pull the tape 30–40% as you wind it. If tape feels loose or looks wrinkled rather than smooth, you are not pulling enough tension.' },
  { icon: '📅', label: 'Build timeline', tip: 'Build buttonholes and corsages the day before the wedding (evening). Mist, box, and refrigerate overnight. Morning-of builds under pressure produce poorer quality work — especially wiring and taping.' },
];

export default function CorsagesButtonholesPage({ go }) {
  return (
    <div>
      <Hero
        eyebrow="Wedding Floristry · Personal Flowers"
        title="Corsages &"
        em="Buttonholes"
        sub="Construction techniques, wiring and taping guides, flower selection, and finishing — everything needed to produce professional personal wedding flowers."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <BackLink label="Wedding Floristry" onBack={() => go?.('wedding')} />

        {/* Section 1 — Overview */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Overview"
            title="Personal Wedding Flowers"
            desc="Understanding the two core categories of personal floristry — buttonholes and corsages."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-stone-100 px-5 py-5">
              <div className="text-2xl mb-3">🤵</div>
              <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-2">What is a buttonhole?</h3>
              <p className="text-[12px] text-stone-500 font-light leading-relaxed">A single focal flower, wired and taped, worn in the left lapel buttonhole. The groom's buttonhole should always relate to the bridal bouquet — the same flower or a direct colour reference. Typical size: 6–8cm finished.</p>
            </div>
            <div className="bg-white rounded-xl border border-stone-100 px-5 py-5">
              <div className="text-2xl mb-3">💐</div>
              <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-2">What is a corsage?</h3>
              <p className="text-[12px] text-stone-500 font-light leading-relaxed">A small floral arrangement worn on the wrist or lapel. Worn by mothers and close family members. More elaborate than a buttonhole. Typically 10–14cm. Must be lightweight — wired construction is essential.</p>
            </div>
          </div>
        </div>

        {/* Section 2 — Buttonhole Types */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Buttonhole Types"
            title="Types of Buttonhole"
            desc="Four buttonhole categories for the full wedding party."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BUTTONHOLE_TYPES.map(type => (
              <div key={type.title} className="bg-white rounded-xl border border-stone-100 px-5 py-5">
                <div className="text-2xl mb-3">{type.emoji}</div>
                <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-2">{type.title}</h3>
                <p className="text-[12px] text-stone-500 font-light leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 — Step-by-Step: Classic Buttonhole */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Step-by-Step"
            title="Building a Classic Buttonhole"
            desc="The complete six-step construction sequence for a professional-standard buttonhole."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BUTTONHOLE_STEPS.map(step => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>

        {/* Section 4 — Corsage Types */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Corsage Types"
            title="Types of Corsage"
            desc="Three corsage styles covering traditional to contemporary personal floristry."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {CORSAGE_TYPES.map(type => (
              <div key={type.title} className="bg-white rounded-xl border border-stone-100 px-5 py-5">
                <div className="text-2xl mb-3">{type.emoji}</div>
                <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-2">{type.title}</h3>
                <p className="text-[12px] text-stone-500 font-light leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5 — Step-by-Step: Wrist Corsage */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Step-by-Step"
            title="Building a Wrist Corsage"
            desc="The five-step construction sequence for a professional wrist corsage."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CORSAGE_STEPS.map(step => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>

        {/* Section 6 — Flower Selection */}
        <div className="mb-14">
          <SectionHead
            eyebrow="Flower Selection"
            title="Flower Selection for Personal Flowers"
            desc="The best flowers for fine wired work — and those to avoid."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-stone-100 px-5 py-5">
              <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-4">Best flowers for buttonholes & corsages</h3>
              <PillGroup items={['Rose (spray & garden)', 'Ranunculus', 'Lisianthus', 'Scabiosa', 'Freesia', 'Sweet william', 'Waxflower', 'Anemone', 'Muscari']} />
            </div>
            <div className="bg-white rounded-xl border border-stone-100 px-5 py-5">
              <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 mb-4">Flowers to avoid</h3>
              <PillGroup
                items={['Gypsophila (too delicate)', 'Delicate sweet peas (bruise easily)', 'Open tulips (too large, floppy)', 'Gerbera (too stiff-stemmed)', 'Large dahlias (too heavy)']}
                colour="bg-rose-50 text-rose-600"
              />
            </div>
          </div>
        </div>

        {/* Section 7 — Professional Tips */}
        <div className="mb-0">
          <SectionHead
            eyebrow="Professional Guidance"
            title="Professional Tips"
            desc="Guidance for producing consistently excellent personal wedding flowers."
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
