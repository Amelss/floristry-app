import { useState, useMemo } from 'react';
import MEANINGS, { MEANING_CATEGORIES } from '../../data/meanings';
import Hero from '../shared/Hero';
import InfoBand from '../shared/InfoBand';

const CATEGORY_COLOURS = {
  'Love & Romance':       '#C0392B',
  'Purity & Remembrance': '#8B9DC0',
  'Hope & New Beginnings':'#6B8A66',
  'Joy & Optimism':       '#E8A44A',
  'Prosperity & Romance': '#C9948E',
  'Strength & Elegance':  '#8B7355',
  'Innocence & Joy':      '#B8CEAE',
  'Calm & Devotion':      '#948C82',
  'Luxury & Beauty':      '#8B5E9E',
  'Trust & Friendship':   '#3D7A8A',
  'Wisdom & Faith':       '#5B7BA8',
  'Constancy & Memory':   '#6B5E8E',
  'Pleasure & Farewell':  '#A06080',
  'Longevity & Joy':      '#8B7A3A',
};

function CategoryBadge({ category }) {
  const colour = CATEGORY_COLOURS[category] ?? '#948C82';
  return (
    <span className="text-[9px] font-medium tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border flex-shrink-0"
      style={{ color: colour, borderColor: colour + '40', background: colour + '12' }}>
      {category}
    </span>
  );
}

function ColourSwatch({ colour, meaning }) {
  const isLight = colour.hex === '#F5F5F0';
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-5 h-5 rounded-full flex-shrink-0 border"
        style={{ background: colour.hex, borderColor: isLight ? '#e5e2dc' : colour.hex + 'aa' }}
      />
      <div className="min-w-0">
        <span className="text-[11px] font-medium text-stone-700">{colour.colour} — </span>
        <span className="text-[11px] text-stone-500 font-light">{colour.meaning}</span>
      </div>
    </div>
  );
}

function FlowerCard({ flower }) {
  const [open, setOpen] = useState(false);
  const colour = CATEGORY_COLOURS[flower.category] ?? '#948C82';

  return (
    <div className="bg-white border border-stone-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left px-5 py-4 cursor-pointer bg-transparent border-none flex items-start gap-4"
      >
        <span className="text-2xl flex-shrink-0 mt-0.5">{flower.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap mb-1">
            <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }}
              className="text-[17px] font-semibold text-stone-800 leading-tight">{flower.flower}</h3>
            <CategoryBadge category={flower.category} />
          </div>
          <p style={{ fontFamily: '"Cormorant Garamond",serif' }}
            className="text-[12px] italic text-[#6B8A66] mb-1">{flower.latin}</p>
          <p className="text-[12px] text-stone-500 font-light leading-relaxed line-clamp-2">{flower.overall}</p>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          className={`flex-shrink-0 mt-1.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: colour }}>
          <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="border-t border-stone-50 px-5 pb-5 pt-4">
          <p className="text-[13px] text-stone-600 font-light leading-relaxed mb-5">{flower.overall}</p>

          {/* Colour meanings */}
          <div className="mb-5">
            <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-3">Colour Meanings</p>
            <div className="flex flex-col gap-2">
              {flower.colours.map(c => <ColourSwatch key={c.colour} colour={c} />)}
            </div>
          </div>

          {/* History */}
          <div className="mb-5">
            <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-2">History & Symbolism</p>
            <p className="text-[12.5px] text-stone-600 font-light leading-relaxed">{flower.history}</p>
          </div>

          {/* Occasions */}
          <div className="mb-4">
            <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-2">Best For</p>
            <div className="flex flex-wrap gap-1.5">
              {flower.occasions.map(o => (
                <span key={o} className="text-[10.5px] text-stone-600 font-light bg-stone-100 px-2.5 py-1 rounded-full">{o}</span>
              ))}
            </div>
          </div>

          {/* Warning */}
          {flower.warning && (
            <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 flex gap-2.5 mt-2">
              <span className="text-sm flex-shrink-0">⚠️</span>
              <p className="text-[11.5px] text-amber-800 font-light leading-relaxed">{flower.warning}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MeaningsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = useMemo(() => {
    let list = [...MEANINGS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(m =>
        m.flower.toLowerCase().includes(q) ||
        m.overall.toLowerCase().includes(q) ||
        m.colours.some(c => c.meaning.toLowerCase().includes(q))
      );
    }
    if (activeCategory) list = list.filter(m => m.category === activeCategory);
    return list;
  }, [search, activeCategory]);

  return (
    <div>
      <Hero
        eyebrow="UK Floristry · Floriography"
        title="Flower"
        em="Meanings"
        inline
        sub="The language of flowers — what each bloom symbolises, the meaning behind every colour, and the history that shaped modern floriography."
      />
      <InfoBand items={[
        ['Floriography', 'The Victorian art of communicating through flowers. Each bloom and colour carried a precise message — love, sorrow, admiration, farewell.'],
        ['Colour matters', 'The same flower can carry entirely different meanings depending on its colour. Always check before arranging for a specific occasion.'],
        ['Cultural variation', 'Meanings differ between cultures. White flowers symbolise mourning in many Eastern cultures but purity and celebration in Western ones.'],
      ]}/>

      <div className="max-w-[900px] mx-auto px-4 sm:px-10 py-8">

        {/* Search */}
        <div className="relative mb-5">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M6.5 1a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM0 6.5a6.5 6.5 0 1111.65 3.944l2.7 2.7a.5.5 0 11-.707.707l-2.7-2.7A6.5 6.5 0 010 6.5z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
          </svg>
          <input
            type="text"
            placeholder="Search flowers or meanings…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-[13px] text-stone-700 placeholder:text-stone-400 outline-none focus:border-[#6B8A66] transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer bg-transparent border-none text-lg leading-none">×</button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-[10px] font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer
              ${!activeCategory ? 'bg-[#3D5C3A] text-white border-[#3D5C3A]' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'}`}
          >
            All flowers
          </button>
          {MEANING_CATEGORIES.map(cat => {
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

        {/* Results count */}
        {(search || activeCategory) && (
          <p className="text-[11px] text-stone-400 font-light mb-5">
            {filtered.length} {filtered.length === 1 ? 'flower' : 'flowers'} found
            {search && ` matching "${search}"`}
            <button onClick={() => { setSearch(''); setActiveCategory(null); }}
              className="ml-2 text-[#6B8A66] hover:underline cursor-pointer bg-transparent border-none font-medium">
              Clear
            </button>
          </p>
        )}

        {/* Flower cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400 text-[14px] font-light">No flowers match your search.</div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(flower => <FlowerCard key={flower.id} flower={flower} />)}
          </div>
        )}
      </div>
    </div>
  );
}
