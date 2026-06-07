import Hero from '../shared/Hero';

const NAV_CARDS = [
  {
    page: 'bridalBouquets',
    emoji: '💐',
    title: 'Bridal Bouquets',
    sub: 'The centrepiece of every wedding package.',
    desc: 'Styles, proportions, flower selection, step-by-step construction guides, seasonal planning, and professional finishing techniques.',
  },
  {
    page: 'corsagesButtonholes',
    emoji: '🌸',
    title: 'Corsages & Buttonholes',
    sub: 'Personal wedding floristry.',
    desc: 'Buttonhole and corsage construction, wiring and taping techniques, flower selection, longevity tips, and step-by-step tutorials.',
  },
  {
    page: 'tableArrangements',
    emoji: '🌿',
    title: 'Table & Reception Flowers',
    sub: 'From centrepieces to cake flowers.',
    desc: 'Guest tables, long banquets, top tables, cake flowers, welcome arrangements, and ceremony-to-reception repurposing.',
  },
  {
    page: 'weddingStyles',
    emoji: '🎨',
    title: 'Wedding Styles & Trends',
    sub: 'Design direction for every brief.',
    desc: 'Ten wedding styles — from Classic to Bohemian — with colour palettes, signature flowers, and design guidance for each.',
  },
  {
    page: 'weddingPricing',
    emoji: '💷',
    title: 'Pricing & Costing',
    sub: 'The business of wedding floristry.',
    desc: 'How to price wedding work, labour and flower costs, markup, profit margins, quoting accurately, and sample wedding budgets.',
  },
  {
    page: 'weddingCareer',
    emoji: '🌱',
    title: 'Getting Started',
    sub: 'Your route into wedding floristry.',
    desc: 'Assisting established florists, building experience, styled shoots, portfolio photography, and real wedding case studies.',
  },
];

const CONSULTATION_TIPS = [
  'Ask the client to bring 3 inspiration images and 1 image of what they don\'t want',
  'Always see venue photos and fabric swatches before agreeing a colour palette',
  'Discuss budget in the first meeting — not the second',
  'Confirm ceremony and reception start times before planning logistics',
];

function NavCard({ emoji, title, sub, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group rounded-xl border border-stone-100 overflow-hidden hover:border-[#3D5C3A]/30 hover:shadow-md transition-all text-left w-full h-full p-0 flex flex-col"
    >
      <div className="bg-[#3D5C3A]/5 border-b border-stone-100 px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{emoji}</span>
            <div>
              <h3
                style={{ fontFamily: '"Cormorant Garamond",serif' }}
                className="text-[20px] font-semibold text-stone-800 leading-tight"
              >
                {title}
              </h3>
              <p className="text-[11px] text-stone-500 font-light mt-0.5">{sub}</p>
            </div>
          </div>
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            className="flex-shrink-0 text-[#3D5C3A] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
          >
            <path d="M5 3L10.5 8L5 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="bg-white px-5 py-4 flex-1">
        <p className="text-[12px] text-stone-500 font-light leading-relaxed mb-3">{desc}</p>
        <p className="text-[11px] text-[#3D5C3A] font-medium">Explore full guide →</p>
      </div>
    </button>
  );
}

export default function WeddingPage({ go }) {
  return (
    <div>
      <Hero
        eyebrow="Learn · Wedding Floristry"
        title="Wedding"
        em="Floristry"
        sub="A complete beginner-to-professional learning pathway — design, construction, pricing, and career guidance for UK wedding floristry."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-10">

        {/* Core topics grid */}
        <div className="mb-10">
          <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-1">Core topics</p>
          <p className="text-[12px] text-stone-400 font-light mb-6">
            Six complete learning modules covering every aspect of professional UK wedding floristry.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NAV_CARDS.map(card => (
              <NavCard
                key={card.page}
                emoji={card.emoji}
                title={card.title}
                sub={card.sub}
                desc={card.desc}
                onClick={() => go?.(card.page)}
              />
            ))}
          </div>
        </div>

        {/* Quick reference consultation tips */}
        <div className="bg-[#F0EBE1] border-l-4 border-[#B8CEAE] pl-5 pr-4 py-5 rounded-r-xl">
          <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-[#948C82] mb-2">
            Before Your First Consultation
          </p>
          <ul className="flex flex-col gap-2">
            {CONSULTATION_TIPS.map((tip, i) => (
              <li key={i} className="flex gap-2.5 text-[12px] text-[#5C4535] font-light leading-relaxed">
                <span className="text-[#6B8A66] font-bold flex-shrink-0 mt-0.5">·</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
