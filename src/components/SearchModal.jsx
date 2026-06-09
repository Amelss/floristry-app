import { useState, useEffect, useRef, useMemo } from 'react';
import { buildSearchIndex } from '../data/searchIndex';

// Build once at module load — avoids re-building on every render
const INDEX = buildSearchIndex();

function highlight(text, query) {
  if (!query || !text) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[#B8CEAE]/50 text-[#3D5C3A] rounded-[2px] px-[1px]">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchModal({ open, onClose, go }) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Reset search state when the modal opens
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setQuery('');
      setCursor(-1);
    }
  }

  // Focus input when opened
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKey(e) {
      if (!open) return;
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCursor(c => Math.min(c + 1, flatResults.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCursor(c => Math.max(c - 1, 0));
      }
      if (e.key === 'Enter' && cursor >= 0 && flatResults[cursor]) {
        handleSelect(flatResults[cursor]);
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  });  // no dep array — always uses latest flatResults & cursor

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    const scored = [];
    for (const item of INDEX) {
      const title    = item.title.toLowerCase();
      const subtitle = (item.subtitle ?? '').toLowerCase();
      const body     = (item.body ?? '').toLowerCase();

      let score;
      if (title === q)                     score = 100; // exact title match
      else if (title.startsWith(q))        score = 80;  // title starts with query
      else if (title.includes(q))          score = 60;  // title contains query
      else if (subtitle.includes(q))       score = 35;  // subtitle match
      else if (body.includes(q))           score = 15;  // body-text mention only
      else continue;                                     // no match — skip

      scored.push({ ...item, _score: score });
    }

    // Sort by relevance descending, then stable by category order
    scored.sort((a, b) => b._score - a._score);
    return scored.slice(0, 40);
  }, [query]);

  // Flat results for keyboard nav — relevance order (already sorted by score)
  const flatResults = results;

  // Grouped for display — preserve relevance order within each group
  const grouped = useMemo(() => {
    const map = new Map();
    // Walk results in score order; first occurrence of each category sets its rank
    for (const item of results) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category).push(item);
    }
    return map;
  }, [results]);

  // Scroll active item into view
  useEffect(() => {
    if (cursor >= 0 && listRef.current) {
      const active = listRef.current.querySelector('[data-active="true"]');
      active?.scrollIntoView({ block: 'nearest' });
    }
  }, [cursor]);

  function handleSelect(item) {
    go(item.page);
    onClose();
  }

  const q = query.trim();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[10vh] px-4 pointer-events-none">
        <div
          className="w-full max-w-[700px] bg-white rounded-2xl shadow-2xl border border-stone-100 overflow-hidden pointer-events-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* ── Input row ── */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-100">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-stone-400 flex-shrink-0">
              <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={e => { setQuery(e.target.value); setCursor(-1); }}
              placeholder="Search flowers, techniques, glossary terms..."
              className="flex-1 text-[15px] text-stone-800 placeholder:text-stone-400 outline-none bg-transparent"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setCursor(-1); inputRef.current?.focus(); }}
                className="text-stone-400 hover:text-stone-600 cursor-pointer p-0.5"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-stone-400 text-[10px] border border-stone-200 rounded px-1.5 py-0.5 cursor-pointer hover:bg-stone-50 ml-1 font-medium tracking-wide"
            >
              esc
            </button>
          </div>

          {/* ── Results list ── */}
          <div ref={listRef} className="overflow-y-auto" style={{ maxHeight: 'min(60vh, 440px)' }}>

            {/* Empty state */}
            {q.length < 2 && (
              <div className="px-6 py-8 text-center">
                <p className="text-[22px] mb-2">🔍</p>
                <p className="text-[13px] text-stone-500 font-light">
                  Search across all flowers, techniques, glossary terms, and more.
                </p>
                <p className="text-[11px] text-stone-400 mt-1">Type at least 2 characters to begin</p>
              </div>
            )}

            {/* No results */}
            {q.length >= 2 && flatResults.length === 0 && (
              <div className="px-6 py-8 text-center">
                <p className="text-[22px] mb-2">🌱</p>
                <p className="text-[13px] text-stone-500 font-light">
                  No results found for <span className="font-medium text-stone-700">"{q}"</span>
                </p>
                <p className="text-[11px] text-stone-400 mt-1">Try a different term — flower name, technique, or glossary word</p>
              </div>
            )}

            {/* Grouped results */}
            {flatResults.length > 0 && Array.from(grouped.entries()).map(([category, items]) => (
              <div key={category}>
                <div className="sticky top-0 bg-stone-50/95 backdrop-blur-sm px-4 py-1.5 border-y border-stone-100">
                  <p className="text-[9px] font-semibold tracking-[0.18em] uppercase text-stone-400">
                    {category}
                    <span className="ml-2 font-normal text-stone-300">{items.length}</span>
                  </p>
                </div>
                {items.map(item => {
                  const idx = flatResults.indexOf(item);
                  const isActive = idx === cursor;
                  return (
                    <button
                      key={item.id}
                      data-active={isActive}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setCursor(idx)}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-3 border-b border-stone-50 transition-colors cursor-pointer
                        ${isActive ? 'bg-[#3D5C3A]/5' : 'hover:bg-stone-50/80'}`}
                    >
                      <span className="text-base leading-none flex-shrink-0 w-6 text-center">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[12.5px] font-medium text-stone-800 leading-tight truncate">
                            {highlight(item.title, q)}
                          </p>
                          {item._score >= 80 && (
                            <span className="text-[8px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-[#3D5C3A]/10 text-[#3D5C3A] flex-shrink-0">
                              Best match
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <p className="text-[11px] text-stone-400 font-light mt-0.5 leading-snug truncate">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                      {isActive && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#3D5C3A] flex-shrink-0">
                          <path d="M2.5 6h7M6.5 3L9.5 6l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Bottom padding */}
            {flatResults.length > 0 && <div className="h-2" />}
          </div>

          {/* ── Footer ── */}
          <div className="flex items-center gap-4 px-4 py-2 border-t border-stone-100 bg-stone-50/60">
            <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
              <kbd className="px-1 py-0.5 rounded border border-stone-200 bg-white text-[9px] font-mono">↑↓</kbd>
              navigate
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
              <kbd className="px-1 py-0.5 rounded border border-stone-200 bg-white text-[9px] font-mono">↵</kbd>
              open
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
              <kbd className="px-1 py-0.5 rounded border border-stone-200 bg-white text-[9px] font-mono">esc</kbd>
              close
            </div>
            <span className="ml-auto text-[10px] text-stone-300">{INDEX.length} items indexed</span>
          </div>
        </div>
      </div>
    </>
  );
}
