import { useState } from 'react';
import EQUIPMENT, { EQUIPMENT_CATEGORIES } from '../../data/equipment';
import Hero from '../shared/Hero';
import InfoBand from '../shared/InfoBand';

const CATEGORY_COLOURS = {
  'Cutting Tools':          '#3D5C3A',
  'Mechanics':              '#6B8A66',
  'Wiring & Taping':        '#8B9DC0',
  'Storage & Conditioning': '#8B7355',
  'Sundries & Finishing':   '#C9948E',
};

function EssentialBadge() {
  return (
    <span className="text-[8px] font-medium tracking-[0.12em] uppercase px-2 py-0.5 rounded-full bg-[#3D5C3A]/10 text-[#3D5C3A] border border-[#3D5C3A]/20 flex-shrink-0">
      Essential
    </span>
  );
}

function EquipmentCard({ item }) {
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
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }}
              className="text-[17px] font-semibold text-stone-800 leading-tight">
              {item.name}
            </h3>
            {item.essential && <EssentialBadge />}
          </div>
          <p className="text-[12px] text-stone-500 font-light leading-relaxed line-clamp-2">{item.desc}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className="text-[10px] font-medium text-stone-400">{item.priceRange}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            style={{ color: colour }}>
            <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-stone-50 pt-4">
          <p className="text-[13px] text-stone-600 font-light leading-relaxed mb-4">{item.desc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-2">Common Uses</p>
              <ul className="flex flex-col gap-1.5">
                {item.uses.map((use, i) => (
                  <li key={i} className="flex gap-2 text-[12.5px] text-stone-600 font-light">
                    <span className="text-[#6B8A66] font-bold flex-shrink-0">—</span>
                    {use}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-1.5">Price Range</p>
                <p className="text-[13px] font-medium text-stone-700">{item.priceRange}</p>
                <p className="text-[11px] text-stone-400 font-light mt-0.5">Approximate UK retail</p>
              </div>
              <div>
                <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-1.5">Kit Priority</p>
                <p className="text-[12.5px] font-light text-stone-600">
                  {item.essential
                    ? 'Essential — buy this before starting any floristry work.'
                    : 'Useful — add to your kit as you advance.'}
                </p>
              </div>
            </div>
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

export default function EquipmentPage() {
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = activeCategory
    ? EQUIPMENT.filter(e => e.category === activeCategory)
    : EQUIPMENT;

  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const essentialCount = EQUIPMENT.filter(e => e.essential).length;

  return (
    <div>
      <Hero
        eyebrow="Floral Foundations · Kit & Equipment"
        title="Tools &"
        em="Equipment Guide"
        inline
        sub={`Everything in a professional florist's kit explained — what each tool does, when to use it, and what to prioritise when building your kit from scratch.`}
      />
      <InfoBand items={[
        [`${essentialCount} essential tools`, 'Items marked "Essential" should be in your kit before you begin any floristry work.'],
        ['Price guidance', 'All prices are approximate UK retail. Student-grade tools are fine to start — upgrade as your skills develop.'],
        ['Tap to expand', 'Each card opens to show full details, common uses, and a professional tip.'],
      ]}/>

      <div className="max-w-[900px] mx-auto px-4 sm:px-10 py-8">

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-[10px] font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer
              ${!activeCategory ? 'bg-[#3D5C3A] text-white border-[#3D5C3A]' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'}`}
          >
            All equipment
          </button>
          {EQUIPMENT_CATEGORIES.map(cat => {
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

        {/* Equipment grouped by category */}
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
                {items.map(item => <EquipmentCard key={item.id} item={item}/>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
