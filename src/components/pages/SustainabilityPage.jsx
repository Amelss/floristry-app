import { useState } from 'react';
import SUSTAINABILITY, { SUSTAINABILITY_CATEGORIES, IMPACT_ORDER } from '../../data/sustainability';
import Hero from '../shared/Hero';
import InfoBand from '../shared/InfoBand';

const CATEGORY_COLOURS = {
  'Foam-Free Mechanics':      '#6B8A66',
  'Sourcing & Buying':        '#3D5C3A',
  'Packaging & Presentation': '#8B7355',
  'Water & Waste':            '#5B7BA8',
  'Composting & End of Life': '#8B9DC0',
  'Green Business Practices': '#948C82',
};

const IMPACT_COLOURS = {
  'Very High': { bg: '#3D5C3A', text: '#fff' },
  'High':      { bg: '#6B8A66', text: '#fff' },
  'Moderate':  { bg: '#8B9DC0', text: '#fff' },
  'Low':       { bg: '#e5e0d8', text: '#948C82' },
};

const DIFFICULTY_COLOURS = {
  'Low':      { colour: '#6B8A66' },
  'Moderate': { colour: '#8B9DC0' },
  'High':     { colour: '#C9948E' },
};

function ImpactBadge({ impact }) {
  const style = IMPACT_COLOURS[impact] ?? IMPACT_COLOURS['Low'];
  return (
    <span className="text-[8px] font-medium tracking-[0.12em] uppercase px-2 py-0.5 rounded-full flex-shrink-0"
      style={{ background: style.bg, color: style.text }}>
      {impact} impact
    </span>
  );
}

function DifficultyDots({ difficulty }) {
  const levels = { 'Low': 1, 'Moderate': 2, 'High': 3 };
  const level = levels[difficulty] ?? 1;
  const colour = DIFFICULTY_COLOURS[difficulty]?.colour ?? '#948C82';
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[9px] text-stone-400 font-light">Effort:</span>
      <div className="flex gap-0.5">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-2 h-2 rounded-full"
            style={{ background: i <= level ? colour : '#e5e0d8' }}/>
        ))}
      </div>
      <span className="text-[9px] text-stone-400 font-light">{difficulty}</span>
    </div>
  );
}

function GuideCard({ item }) {
  const [open, setOpen] = useState(false);
  const colour = CATEGORY_COLOURS[item.category] ?? '#948C82';

  return (
    <div className="bg-white border border-stone-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left px-5 py-4 cursor-pointer bg-transparent border-none flex items-start gap-4"
      >
        <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap mb-2">
            <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }}
              className="text-[17px] font-semibold text-stone-800 leading-tight">{item.title}</h3>
            <ImpactBadge impact={item.impact} />
          </div>
          <DifficultyDots difficulty={item.difficulty} />
          <p className="text-[12px] text-stone-500 font-light leading-relaxed mt-1.5 line-clamp-2">{item.summary}</p>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          className={`flex-shrink-0 mt-1.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: colour }}>
          <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="border-t border-stone-50 px-5 pb-5 pt-4">
          <p className="text-[13px] text-stone-600 font-light leading-relaxed mb-5">{item.detail}</p>

          <div className="mb-5">
            <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-3">Practical Alternatives & Actions</p>
            <ul className="flex flex-col gap-2">
              {item.alternatives.map((alt, i) => (
                <li key={i} className="flex gap-2.5 text-[12.5px] text-stone-600 font-light leading-relaxed">
                  <span className="text-[#6B8A66] font-bold flex-shrink-0 mt-0.5">—</span>
                  {alt}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#3D5C3A]/5 border-l-4 border-[#3D5C3A] pl-4 pr-4 py-3 rounded-r-xl">
            <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-[#3D5C3A] mb-1">Pro tip</p>
            <p className="text-[12.5px] text-stone-600 font-light leading-relaxed">{item.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SustainabilityPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortByImpact, setSortByImpact] = useState(false);

  const filtered = (() => {
    let list = activeCategory
      ? SUSTAINABILITY.filter(s => s.category === activeCategory)
      : SUSTAINABILITY;
    if (sortByImpact) {
      list = [...list].sort((a, b) =>
        IMPACT_ORDER.indexOf(a.impact) - IMPACT_ORDER.indexOf(b.impact)
      );
    }
    return list;
  })();

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div>
      <Hero
        eyebrow="Floral Foundations · Sustainability"
        title="Sustainable"
        em="Floristry Guide"
        inline
        sub="Practical steps to make your floristry practice greener — from ditching foam and buying British to packaging, composting, and reducing waste."
      />
      <InfoBand items={[
        ['Foam-free first', 'Switching away from single-use floral foam is the single highest-impact change most florists can make.'],
        ['Buy British', 'UK-grown seasonal flowers have a fraction of the carbon footprint of air-freighted imports.'],
        ['Start small', 'Every practice here can be adopted independently — pick the highest-impact changes for your studio first.'],
      ]}/>

      <div className="max-w-[900px] mx-auto px-4 sm:px-10 py-8">

        {/* Controls row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-2 flex-1">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-[10px] font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer
                ${!activeCategory ? 'bg-[#3D5C3A] text-white border-[#3D5C3A]' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'}`}
            >
              All topics
            </button>
            {SUSTAINABILITY_CATEGORIES.map(cat => {
              const colour = CATEGORY_COLOURS[cat] ?? '#948C82';
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(prev => prev === cat ? null : cat)}
                  className="text-[10px] font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1.5"
                  style={isActive
                    ? { color: '#fff', background: colour, borderColor: colour }
                    : { color: colour, borderColor: colour + '40', background: colour + '12' }
                  }
                >
                  {cat}
                  {isActive && <span className="text-white/80 text-[11px]">×</span>}
                </button>
              );
            })}
          </div>

          {/* Sort toggle */}
          <button
            onClick={() => setSortByImpact(v => !v)}
            className={`text-[10px] font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer flex-shrink-0
              ${sortByImpact ? 'bg-[#3D5C3A] text-white border-[#3D5C3A]' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'}`}
          >
            Sort by impact
          </button>
        </div>

        {/* Content */}
        {sortByImpact ? (
          <div className="flex flex-col gap-3">
            {filtered.map(item => <GuideCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: CATEGORY_COLOURS[category] ?? '#948C82' }}/>
                  <h2 style={{ fontFamily: '"Cormorant Garamond",serif' }}
                    className="text-[22px] font-semibold text-stone-700">{category}</h2>
                  <div className="flex-1 h-px bg-stone-100"/>
                </div>
                <div className="flex flex-col gap-3">
                  {items.map(item => <GuideCard key={item.id} item={item} />)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
