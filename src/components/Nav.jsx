import { useState, useEffect, useRef } from 'react';

const MENUS = [
  {
    key: 'foundations',
    label: 'Foundations',
    items: [
      { key: 'flowers',  label: '30 Core Flowers',  desc: 'Latin names, seasons & care notes' },
      { key: 'wheel',    label: 'Colour Wheel',      desc: 'Interactive harmony schemes' },
      { key: 'bouquets', label: 'Bouquet Flowers',   desc: 'Focal, foliage & filler guide' },
      { key: 'seasonal', label: 'Seasonal Calendar', desc: 'Month-by-month UK flowers' },
      { key: 'glossary',   label: 'Glossary',           desc: 'A–Z of floristry terms' },
      { key: 'meanings',   label: 'Flower Meanings',    desc: 'Symbolism & floriography' },
      { key: 'equipment',  label: 'Tools & Equipment',  desc: 'Kit guide for every level' },
    ],
  },
  {
    key: 'learn',
    label: 'Learn',
    items: [
      { key: 'styles',       label: 'Style Guide',        desc: 'Dutch Masters to Ikebana' },
      { key: 'techniques',   label: 'Techniques & Skills', desc: 'Step-by-step practical guides' },
      { key: 'wedding',      label: 'Wedding Floristry',   desc: 'Bouquets, arches & tributes' },
      { key: 'conditioning',     label: 'Conditioning & Care',  desc: 'Maximise vase life' },
      { key: 'troubleshooting',  label: 'Troubleshooting',        desc: 'Fix common floristry problems' },
      { key: 'sustainability',   label: 'Sustainability Guide',   desc: 'Eco-friendly floristry practices' },
      { key: 'workbook',         label: 'Study Companion',        desc: 'Roadmap, checklists & further reading' },
      { key: 'proportion',       label: 'Proportion & Scale',     desc: 'Vessel-to-flower size relationships' },
      { key: 'sympathy',         label: 'Sympathy & Funeral',     desc: 'Tributes, palettes & cultural guidance' },
    ],
  },
  {
    key: 'tools',
    label: 'Tools',
    items: [
      { key: 'builder',  label: 'Arrangement Builder', desc: 'Recipe & cost calculator' },
      { key: 'stemcalc', label: 'Stem Calculator',     desc: 'Single or event stem counts' },
      { key: 'quiz',        label: 'Floristry Quiz',       desc: 'Quick or in-depth knowledge test' },
      { key: 'flashcards',  label: 'Daily 10 Flashcards',  desc: 'Spaced-repetition study cards' },
      { key: 'flowertimer', label: 'Flower Care Timer',  desc: 'Step-by-step conditioning with timers' },
    ],
  },
];

function menuForPage(page) {
  return MENUS.find(m => m.items.some(i => i.key === page))?.key ?? null;
}

export default function Nav({ page, go, onSearchOpen }) {
  const [open, setOpen] = useState(null);                          // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(menuForPage(page)); // mobile accordion
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

  // close menus on page change
  const [prevPage, setPrevPage] = useState(page);
  if (page !== prevPage) {
    setPrevPage(page);
    setMobileOpen(false);
    setOpen(null);
  }

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
      <div className="px-4 pt-2.5 pb-2.5 border-b border-stone-100">

        {/* Row 1: Logo + (desktop search) + hamburger */}
        <div className="flex items-center gap-3">

          {/* Logo */}
          <button
            onClick={() => handleGo('home')}
            className="cursor-pointer bg-transparent border-none flex-shrink-0"
          >
            <span
              style={{ fontFamily: '"Great Vibes", cursive', color: '#3D5C3A' }}
              className="text-[28px] sm:text-[32px] leading-none select-none hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              My Floristry Helper
            </span>
          </button>

          {/* Search bar — desktop only in this row */}
          <button
            onClick={e => { e.stopPropagation(); onSearchOpen?.(); }}
            className="hidden md:flex flex-1 items-center gap-2.5 px-3.5 py-2 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 hover:border-stone-300 transition-colors cursor-pointer text-stone-400 min-w-0"
            aria-label="Search"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-[12px] font-light truncate flex-1 text-left">Search flowers, techniques, glossary…</span>
            <kbd className="text-[9px] text-stone-400 border border-stone-200 rounded px-1.5 py-0.5 bg-white font-mono flex-shrink-0">⌘K</kbd>
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={e => { e.stopPropagation(); setMobileOpen(v => !v); }}
            className="md:hidden ml-auto flex-shrink-0 p-2 rounded-lg text-stone-500 hover:bg-stone-50 transition-colors cursor-pointer bg-transparent border-none"
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

        {/* Row 2: Search bar — mobile only */}
        <div className="md:hidden mt-2">
          <button
            onClick={e => { e.stopPropagation(); onSearchOpen?.(); }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 hover:border-stone-300 transition-colors cursor-pointer text-stone-400"
            aria-label="Search"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-[12px] font-light flex-1 text-left">Search flowers, techniques, glossary…</span>
          </button>
        </div>

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
                <div className="absolute top-full left-0 mt-0 bg-white border-x border-b border-stone-100 rounded-b-xl shadow-lg py-2 min-w-[220px] z-50">
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
                  <div className="border-t border-stone-100 mt-1 pt-1">
                    <button
                      onClick={() => handleGo(menu.key)}
                      className="w-full text-left px-4 py-2 text-[11px] font-medium text-[#3D5C3A] hover:bg-[#3D5C3A]/5 transition-colors cursor-pointer"
                    >
                      View all {menu.label} →
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white overflow-y-auto border-b border-stone-100" style={{maxHeight:'calc(100dvh - 88px)'}}>

          {/* Home */}
          <button
            onClick={() => handleGo('home')}
            className={`w-full text-left px-5 py-3.5 text-[13px] font-medium border-b border-stone-100 cursor-pointer transition-colors flex items-center gap-2
              ${page === 'home' ? 'text-[#3D5C3A] bg-[#3D5C3A]/5' : 'text-stone-700 hover:bg-stone-50'}`}
          >
            {page === 'home' && <span className="w-1.5 h-1.5 rounded-full bg-[#3D5C3A] flex-shrink-0"/>}
            Home
          </button>

          {/* Accordion groups */}
          {MENUS.map(menu => {
            const isExpanded = mobileSection === menu.key;
            const hasActive  = menu.items.some(i => i.key === page);
            return (
              <div key={menu.key} className="border-b border-stone-100">

                {/* Group header — tap to expand/collapse */}
                <button
                  onClick={e => { e.stopPropagation(); setMobileSection(prev => prev === menu.key ? null : menu.key); }}
                  className={`w-full flex items-center justify-between px-5 py-3.5 cursor-pointer transition-colors
                    ${hasActive ? 'bg-[#3D5C3A]/5' : 'hover:bg-stone-50'}`}
                >
                  <div className="flex items-center gap-2">
                    {hasActive && <span className="w-1.5 h-1.5 rounded-full bg-[#3D5C3A] flex-shrink-0"/>}
                    <span className={`text-[13px] font-semibold ${hasActive ? 'text-[#3D5C3A]' : 'text-stone-700'}`}>
                      {menu.label}
                    </span>
                  </div>
                  <svg
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                    className={`transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                    style={{ color: hasActive ? '#3D5C3A' : '#a8a29e' }}
                  >
                    <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Items — visible when expanded */}
                {isExpanded && (
                  <div className="bg-stone-50/60">
                    {menu.items.map(item => (
                      <button
                        key={item.key}
                        onClick={() => handleGo(item.key)}
                        className={`w-full text-left pl-8 pr-5 py-3 transition-colors cursor-pointer border-t border-stone-100/60
                          ${page === item.key ? 'bg-[#3D5C3A]/8' : 'hover:bg-stone-100/60'}`}
                      >
                        <p className={`text-[12.5px] font-medium leading-tight ${page === item.key ? 'text-[#3D5C3A]' : 'text-stone-700'}`}>
                          {item.label}
                        </p>
                        <p className="text-[11px] text-stone-400 font-light mt-0.5">{item.desc}</p>
                      </button>
                    ))}
                    <button
                      onClick={() => handleGo(menu.key)}
                      className="w-full text-left pl-8 pr-5 py-3 border-t border-stone-100/60 text-[12px] font-medium text-[#3D5C3A] hover:bg-stone-100/60 transition-colors cursor-pointer"
                    >
                      View all {menu.label} →
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          <div className="h-4"/>
        </div>
      )}
    </header>
  );
}
