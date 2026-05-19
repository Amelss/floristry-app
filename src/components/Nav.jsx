import { useState, useEffect, useRef } from 'react';

const MENUS = [
  {
    key: 'reference',
    label: 'Reference',
    items: [
      { key: 'flowers',  label: '30 Core Flowers',  desc: 'Latin names, seasons & care notes' },
      { key: 'wheel',    label: 'Colour Wheel',      desc: 'Interactive harmony schemes' },
      { key: 'bouquets', label: 'Bouquet Flowers',   desc: 'Focal, foliage & filler guide' },
      { key: 'seasonal', label: 'Seasonal Calendar', desc: 'Month-by-month UK flowers' },
      { key: 'glossary', label: 'Glossary',          desc: 'A–Z of floristry terms' },
    ],
  },
  {
    key: 'learn',
    label: 'Learn',
    items: [
      { key: 'styles',       label: 'Style Guide',        desc: 'Dutch Masters to Ikebana' },
      { key: 'techniques',   label: 'Techniques & Skills', desc: 'Step-by-step practical guides' },
      { key: 'wedding',      label: 'Wedding Floristry',   desc: 'Bouquets, arches & tributes' },
      { key: 'conditioning', label: 'Conditioning & Care', desc: 'Maximise vase life' },
    ],
  },
  {
    key: 'tools',
    label: 'Tools',
    items: [
      { key: 'builder',  label: 'Arrangement Builder', desc: 'Recipe & cost calculator' },
      { key: 'stemcalc', label: 'Stem Calculator',     desc: 'Single or event stem counts' },
      { key: 'quiz',     label: 'Knowledge Quiz',      desc: 'Test yourself on floristry' },
    ],
  },
];

function menuForPage(page) {
  return MENUS.find(m => m.items.some(i => i.key === page))?.key ?? null;
}

export default function Nav({ page, go }) {
  const [open, setOpen] = useState(null);       // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, []);

  // close mobile menu on page change
  useEffect(() => { setMobileOpen(false); setOpen(null); }, [page]);

  // lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  function handleGo(key) { go(key); setOpen(null); setMobileOpen(false); }
  function toggleMenu(key) { setOpen(prev => prev === key ? null : key); }

  const activeMenu = menuForPage(page);

  function closeAll() { setOpen(null); setMobileOpen(false); }

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-white shadow-sm" onClick={closeAll}>

      {/* ── Logo bar ── */}
      <div className="flex items-center justify-center py-2.5 border-b border-stone-100 relative px-4">
        <button
          onClick={() => handleGo('home')}
          className="cursor-pointer bg-transparent border-none"
        >
          <span
            style={{ fontFamily: '"Great Vibes", cursive', color: '#3D5C3A' }}
            className="text-[28px] sm:text-[32px] leading-none select-none hover:opacity-80 transition-opacity"
          >
            My Floristry Helper
          </span>
        </button>

        {/* Hamburger — mobile only */}
        <button
          onClick={e => { e.stopPropagation(); setMobileOpen(v => !v); }}
          className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg text-stone-500 hover:bg-stone-50 transition-colors cursor-pointer bg-transparent border-none"
          aria-label="Menu"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* ── Desktop nav tabs ── */}
      <nav className="hidden md:flex items-stretch justify-center px-4 border-b border-stone-100">
        <button
          onClick={() => handleGo('home')}
          className={`px-4 py-3 text-[11px] font-medium tracking-wide cursor-pointer border-b-2 transition-all bg-transparent whitespace-nowrap flex-shrink-0
            ${page === 'home' ? 'text-[#3D5C3A] border-[#3D5C3A]' : 'text-stone-400 border-transparent hover:text-stone-600'}`}
        >
          Home
        </button>

        {MENUS.map(menu => {
          const isActive = activeMenu === menu.key;
          const isOpen   = open === menu.key;
          return (
            <div key={menu.key} className="relative flex items-stretch">
              <button
                onClick={e => { e.stopPropagation(); toggleMenu(menu.key); }}
                className={`flex items-center gap-1.5 px-4 py-3 text-[11px] font-medium tracking-wide cursor-pointer border-b-2 transition-all bg-transparent whitespace-nowrap flex-shrink-0
                  ${isActive ? 'text-[#3D5C3A] border-[#3D5C3A]' : 'text-stone-400 border-transparent hover:text-stone-600'}
                  ${isOpen   ? 'text-[#3D5C3A]' : ''}`}
              >
                {menu.label}
                <svg
                  width="8" height="8" viewBox="0 0 8 8" fill="none"
                  className={`transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                  style={{ color: isActive || isOpen ? '#3D5C3A' : '#a8a29e' }}
                >
                  <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 mt-0 bg-white border border-stone-100 rounded-xl shadow-lg py-2 min-w-[220px] z-50">
                  {menu.items.map(item => (
                    <button
                      key={item.key}
                      onClick={() => handleGo(item.key)}
                      className={`w-full text-left px-4 py-2.5 transition-colors cursor-pointer
                        ${page === item.key ? 'bg-[#3D5C3A]/5' : 'hover:bg-stone-50'}`}
                    >
                      <p className={`text-[12px] font-medium ${page === item.key ? 'text-[#3D5C3A]' : 'text-stone-700'}`}>
                        {item.label}
                      </p>
                      <p className="text-[10px] text-stone-400 font-light mt-0.5">{item.desc}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden border-b border-stone-100 bg-white overflow-y-auto" style={{maxHeight:'calc(100dvh - 88px)'}}>
          <button
            onClick={() => handleGo('home')}
            className={`w-full text-left px-5 py-3 text-[13px] font-medium border-b border-stone-50 cursor-pointer transition-colors
              ${page === 'home' ? 'text-[#3D5C3A] bg-[#3D5C3A]/5' : 'text-stone-600 hover:bg-stone-50'}`}
          >
            Home
          </button>
          {MENUS.map(menu => (
            <div key={menu.key}>
              <p className="px-5 pt-3 pb-1 text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400">
                {menu.label}
              </p>
              {menu.items.map(item => (
                <button
                  key={item.key}
                  onClick={() => handleGo(item.key)}
                  className={`w-full text-left px-5 py-2.5 transition-colors cursor-pointer
                    ${page === item.key ? 'bg-[#3D5C3A]/5' : 'hover:bg-stone-50'}`}
                >
                  <p className={`text-[13px] font-medium ${page === item.key ? 'text-[#3D5C3A]' : 'text-stone-700'}`}>
                    {item.label}
                  </p>
                  <p className="text-[11px] text-stone-400 font-light">{item.desc}</p>
                </button>
              ))}
            </div>
          ))}
          <div className="h-3"/>
        </div>
      )}
    </header>
  );
}
