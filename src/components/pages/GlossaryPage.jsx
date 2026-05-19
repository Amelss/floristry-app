import { useState, useMemo } from 'react';
import GLOSSARY from '../../data/glossary';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const CATEGORY_COLOURS = {
  'Design':          { text: '#3D5C3A' },
  'Mechanics':       { text: '#6B8A66' },
  'Technique':       { text: '#8B9DC0' },
  'Care':            { text: '#C9948E' },
  'Flower Anatomy':  { text: '#8B7355' },
  'Business':        { text: '#948C82' },
};

function CategoryBadge({ category }) {
  const col = CATEGORY_COLOURS[category] ?? { text: '#948C82' };
  return (
    <span className="text-[9px] font-medium tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border flex-shrink-0"
      style={{ color: col.text, borderColor: col.text + '40', background: col.text + '12' }}>
      {category}
    </span>
  );
}

export default function GlossaryPage() {
  const [search, setSearch]               = useState('');
  const [activeLetter, setActiveLetter]   = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  function clearAll() { setSearch(''); setActiveLetter(null); setActiveCategory(null); }

  const filtered = useMemo(() => {
    let list = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(g => g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q));
    }
    if (activeCategory) {
      list = list.filter(g => g.category === activeCategory);
    }
    if (activeLetter && !search) {
      list = list.filter(g => g.term[0].toUpperCase() === activeLetter);
    }
    return list;
  }, [search, activeLetter, activeCategory]);

  // Letters present in the current filtered set (respects category filter)
  const presentLetters = useMemo(() => {
    const base = activeCategory
      ? GLOSSARY.filter(g => g.category === activeCategory)
      : GLOSSARY;
    return new Set(base.map(g => g.term[0].toUpperCase()));
  }, [activeCategory]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(g => {
      const l = g.term[0].toUpperCase();
      if (!map[l]) map[l] = [];
      map[l].push(g);
    });
    return map;
  }, [filtered]);

  const anyFilter = search || activeLetter || activeCategory;

  return (
    <div>
      {/* Hero */}
      <div className="bg-[#3D5C3A] px-5 sm:px-14 py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/5 pointer-events-none"/>
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-4 font-medium">UK Floristry · Language & Terms</p>
        <h1 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[36px] sm:text-[52px] font-semibold text-white leading-[1.1] mb-4">
          Floristry <em className="italic text-[#D4B8B5]">Glossary</em>
        </h1>
        <p className="text-[13px] text-white/55 font-light max-w-lg leading-relaxed">
          {GLOSSARY.length} essential floristry terms — from design principles and flower anatomy to mechanics and business vocabulary.
        </p>
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-10 py-8">

        {/* Search */}
        <div className="relative mb-6">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M6.5 1a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM0 6.5a6.5 6.5 0 1111.65 3.944l2.7 2.7a.5.5 0 11-.707.707l-2.7-2.7A6.5 6.5 0 010 6.5z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
          </svg>
          <input
            type="text"
            placeholder="Search terms or definitions…"
            value={search}
            onChange={e => { setSearch(e.target.value); setActiveLetter(null); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-[13px] text-stone-700 placeholder:text-stone-400 outline-none focus:border-[#6B8A66] transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer bg-transparent border-none text-lg leading-none">×</button>
          )}
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(CATEGORY_COLOURS).map(([cat, col]) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(prev => prev === cat ? null : cat)}
                className="flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all cursor-pointer"
                style={isActive
                  ? { color: '#fff', background: col.text, borderColor: col.text }
                  : { color: col.text, borderColor: col.text + '40', background: col.text + '12' }
                }
              >
                {cat}
                {isActive && (
                  <span className="text-white/80 text-[11px] leading-none font-light ml-0.5">×</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active category banner */}
        {activeCategory && !search && (
          <div className="flex items-center justify-between mb-5 px-4 py-3 rounded-xl border"
            style={{ background: (CATEGORY_COLOURS[activeCategory]?.text ?? '#948C82') + '0D', borderColor: (CATEGORY_COLOURS[activeCategory]?.text ?? '#948C82') + '30' }}>
            <p className="text-[12px] font-medium" style={{ color: CATEGORY_COLOURS[activeCategory]?.text }}>
              Showing {filtered.length} {activeCategory} {filtered.length === 1 ? 'term' : 'terms'}
            </p>
            <button onClick={() => setActiveCategory(null)}
              className="text-[11px] font-medium text-stone-400 hover:text-stone-600 cursor-pointer bg-transparent border-none flex items-center gap-1">
              Show all ×
            </button>
          </div>
        )}

        {/* A–Z letter nav — hidden when searching */}
        {!search && (
          <div className="flex flex-wrap gap-1 mb-8">
            <button
              onClick={() => setActiveLetter(null)}
              className={`text-[11px] font-medium px-2.5 py-1 rounded-lg transition-all cursor-pointer
                ${!activeLetter ? 'bg-[#3D5C3A] text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
            >
              All
            </button>
            {LETTERS.map(l => (
              <button key={l}
                onClick={() => setActiveLetter(prev => prev === l ? null : l)}
                disabled={!presentLetters.has(l)}
                className={`text-[11px] font-medium w-7 h-7 rounded-lg transition-all cursor-pointer
                  ${!presentLetters.has(l) ? 'text-stone-200 cursor-default' :
                    activeLetter === l ? 'bg-[#3D5C3A] text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
              >
                {l}
              </button>
            ))}
          </div>
        )}

        {/* Results count for search or letter */}
        {(search || (activeLetter && !activeCategory)) && (
          <p className="text-[11px] text-stone-400 font-light mb-5">
            {filtered.length} {filtered.length === 1 ? 'term' : 'terms'}
            {search ? ` matching "${search}"` : ` starting with ${activeLetter}`}
            {anyFilter && (
              <button onClick={clearAll} className="ml-2 text-[#6B8A66] hover:underline cursor-pointer bg-transparent border-none font-medium">Clear all</button>
            )}
          </p>
        )}

        {/* Glossary entries */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400 text-[14px] font-light">
            No terms match your filters.
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {Object.entries(grouped)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([letter, terms]) => (
                <div key={letter}>
                  <div className="flex items-center gap-3 mb-3">
                    <span style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[28px] font-semibold text-[#3D5C3A] leading-none">{letter}</span>
                    <div className="flex-1 h-px bg-stone-100"/>
                  </div>
                  <div className="flex flex-col gap-0 border border-stone-100 rounded-xl overflow-hidden">
                    {terms.map((g, i) => (
                      <div key={g.term} className={`px-5 py-4 ${i < terms.length - 1 ? 'border-b border-stone-50' : ''}`}>
                        <div className="flex items-start gap-3 flex-wrap mb-1.5">
                          <span style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[17px] font-semibold text-stone-800 leading-tight">{g.term}</span>
                          <CategoryBadge category={g.category}/>
                        </div>
                        <p className="text-[12.5px] text-stone-500 font-light leading-relaxed">{g.def}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
