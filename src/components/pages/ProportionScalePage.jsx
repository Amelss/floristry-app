import { useState, useEffect, useRef, useCallback } from 'react';
import Hero from '../shared/Hero';
import { VESSELS, STYLES_FILTER, ROLE_COLOURS, EDUCATION } from '../../data/proportion';
import { fetchPexelsPhoto } from '../../utils/pexels';

const ROLES = ['focal', 'secondary', 'filler', 'line', 'foliage'];
const ROLE_LABELS = { focal: 'Focal', secondary: 'Secondary', filler: 'Filler', line: 'Line', foliage: 'Foliage' };

function VesselImage({ query, name, className }) {
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setSrc(null);
    fetchPexelsPhoto(query)
      .then(url => { setSrc(url); setLoading(false); })
      .catch(() => setLoading(false));
  }, [query]);

  if (loading) {
    return (
      <div className={`${className} bg-stone-100 animate-pulse flex items-center justify-center`}>
        <div className="w-5 h-5 rounded-full border-2 border-stone-300 border-t-[#6B8A66] animate-spin" />
      </div>
    );
  }
  if (src) {
    return <img src={src} alt={name} className={className} />;
  }
  return <div className={`${className} bg-[#B8CEAE]`} />;
}

function ProportionBar({ label, value, max, colour }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-stone-400 w-14 flex-shrink-0">{label}</span>
      <div className="flex-1 bg-stone-100 rounded-full h-1.5 overflow-hidden">
        <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${(value / max) * 100}%`, background: colour }} />
      </div>
      <span className="text-[10px] text-stone-500 w-6 text-right">{value}</span>
    </div>
  );
}

function RoleSection({ role, flowers }) {
  const c = ROLE_COLOURS[role];
  if (role === 'line' && flowers.length === 0) return null;
  return (
    <div className={`rounded-lg px-3 py-2.5 ${c.bg}`}>
      <p className={`text-[10px] font-semibold tracking-[0.14em] uppercase mb-2 ${c.text}`}>
        {ROLE_LABELS[role]}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {flowers.length > 0 ? flowers.map(f => (
          <span key={f} className={`text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/70 ${c.text}`}>{f}</span>
        )) : (
          <span className="text-[11px] text-stone-400 italic">Not typically used</span>
        )}
      </div>
    </div>
  );
}

export default function ProportionScalePage() {
  const [selected, setSelected] = useState(VESSELS[0].key);
  const [styleFilter, setStyleFilter] = useState('all');
  const [galleryMaxHeight, setGalleryMaxHeight] = useState(520);
  const [isScrollable, setIsScrollable] = useState(false);
  const galleryRef = useRef(null);
  const firstCardRef = useRef(null);
  const detailRef = useRef(null);

  const vessel = VESSELS.find(v => v.key === selected);
  const filtered = VESSELS.filter(v => styleFilter === 'all' || v.styles.includes(styleFilter));

  // Compute gallery height to show exactly 4 cards (2 rows) on mobile, full list on desktop
  const computeHeight = useCallback(() => {
    if (!firstCardRef.current || !galleryRef.current) return;
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      const cardH = firstCardRef.current.offsetHeight;
      const gap = 10; // gap-2.5 = 10px
      // 2 rows × cardH + 1 gap between rows, plus a little peek (half card) to hint scroll
      const h = cardH * 2 + gap + 8;
      setGalleryMaxHeight(h);
    } else {
      setGalleryMaxHeight(520);
    }
  }, []);

  useEffect(() => {
    computeHeight();
    window.addEventListener('resize', computeHeight);
    return () => window.removeEventListener('resize', computeHeight);
  }, [computeHeight, filtered]);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    setIsScrollable(el.scrollHeight > el.clientHeight + 4);
  }, [galleryMaxHeight, filtered]);

  function selectVessel(key) {
    setSelected(key);
    if (window.innerWidth < 1024 && detailRef.current) {
      setTimeout(() => {
        detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  return (
    <div>
      <Hero
        eyebrow="Floral Foundations · Design Principles"
        title="Proportion &"
        em="Scale"
        inline
        sub="Learn how vessel size, shape, and style influence which flowers and foliage you should choose — and how to create visually balanced arrangements every time."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-12">

        {/* ── Style filter ── */}
        <div className="mb-8">
          <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-3">Filter by style</p>
          <div className="flex flex-wrap gap-2">
            {STYLES_FILTER.map(s => (
              <button
                key={s}
                onClick={() => setStyleFilter(s)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium capitalize transition-all cursor-pointer border
                  ${styleFilter === s
                    ? 'bg-[#3D5C3A] text-white border-[#3D5C3A]'
                    : 'bg-white text-stone-500 border-stone-200 hover:border-[#3D5C3A]/40 hover:text-[#3D5C3A]'}`}
              >
                {s === 'all' ? 'All styles' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">

          {/* ── Vessel gallery ── */}
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-stone-400">Select a vessel</p>
              {isScrollable && (
                <span className="text-[9px] text-stone-400 flex items-center gap-1">
                  scroll for more
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 2v6M2.5 6.5L5 9l2.5-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </div>

            {/* Scrollable gallery — fixed height, visible scrollbar */}
            <div className="relative">
              <div
                ref={galleryRef}
                className="grid grid-cols-2 gap-2.5 overflow-y-auto pr-1"
                style={{
                  maxHeight: `${galleryMaxHeight}px`,
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#B8CEAE #f5f5f4',
                }}
              >
                {filtered.map((v, i) => (
                  <button
                    key={v.key}
                    ref={i === 0 ? firstCardRef : null}
                    onClick={() => selectVessel(v.key)}
                    className={`flex flex-col rounded-xl border-2 overflow-hidden transition-all cursor-pointer text-left
                      ${selected === v.key
                        ? 'border-[#3D5C3A] shadow-md'
                        : 'border-stone-100 bg-white hover:border-[#3D5C3A]/30 hover:shadow-sm'}`}
                  >
                    <div className="w-full aspect-[4/3] overflow-hidden">
                      <VesselImage
                        query={v.pexelsQuery}
                        name={v.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`px-2.5 py-2 ${selected === v.key ? 'bg-[#3D5C3A]/5' : 'bg-white'}`}>
                      <span className={`text-[11px] font-medium leading-tight block ${selected === v.key ? 'text-[#3D5C3A]' : 'text-stone-700'}`}>
                        {v.name}
                      </span>
                    </div>
                  </button>
                ))}
                {/* Bottom padding inside scroll so last row isn't clipped by fade */}
                <div className="col-span-2 h-4" aria-hidden="true" />
              </div>

              {/* Fade gradient at bottom to hint scrollability */}
              {isScrollable && (
                <div className="absolute bottom-0 left-0 right-1 h-10 bg-gradient-to-t from-[#FAF8F4] to-transparent pointer-events-none" />
              )}
            </div>

            {filtered.length === 0 && (
              <p className="text-[12px] text-stone-400 font-light text-center py-8">No vessels match this style filter.</p>
            )}
          </div>

          {/* ── Detail panel ── */}
          {vessel && (
            <div ref={detailRef} className="flex flex-col gap-5 scroll-mt-24">

              {/* Hero photo + header */}
              <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
                <div className="w-full h-56 sm:h-80 lg:h-[420px] overflow-hidden">
                  <VesselImage
                    query={vessel.pexelsQuery}
                    name={vessel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h2
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}
                    className="text-[26px] sm:text-[30px] font-semibold text-stone-800 leading-tight mb-1"
                  >
                    {vessel.name}
                  </h2>
                  <p className="text-[12px] text-stone-500 font-light leading-relaxed mb-3">{vessel.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {vessel.styles.map(s => (
                      <span key={s} className="text-[9px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#B8CEAE]/30 text-[#3D5C3A] capitalize">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Proportion ratios */}
                  <div className="border-t border-stone-100 pt-4 mt-4">
                    <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Proportion guide</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-[#3D5C3A]/5 rounded-lg px-4 py-3">
                        <p className="text-[10px] text-stone-500 mb-0.5 font-medium">Arrangement height</p>
                        <p className="text-[13px] text-[#3D5C3A] font-semibold">{vessel.arrangementHeight}</p>
                      </div>
                      <div className="bg-[#3D5C3A]/5 rounded-lg px-4 py-3">
                        <p className="text-[10px] text-stone-500 mb-0.5 font-medium">Arrangement width</p>
                        <p className="text-[13px] text-[#3D5C3A] font-semibold">{vessel.arrangementWidth}</p>
                      </div>
                    </div>
                    <div className="mt-3 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
                      <p className="text-[11px] text-amber-800 font-medium leading-relaxed">⚖️ {vessel.ratioRule}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scale visual */}
              <div className="bg-white rounded-xl border border-stone-100 p-5">
                <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-4">Visual scale guide</p>
                <div className="flex flex-col gap-2">
                  <ProportionBar label="Min height" value={vessel.heightCm[0]} max={120} colour="#B8CEAE" />
                  <ProportionBar label="Max height" value={vessel.heightCm[1]} max={120} colour="#6B8A66" />
                  <ProportionBar label="Min width"  value={vessel.widthCm[0]}  max={70}  colour="#D4B8B5" />
                  <ProportionBar label="Max width"  value={vessel.widthCm[1]}  max={70}  colour="#C9948E" />
                </div>
                <div className="mt-4 border-t border-stone-100 pt-3">
                  <p className="text-[11px] text-stone-600 font-light leading-relaxed">
                    <span className="font-medium text-stone-700">Flower head size: </span>
                    {vessel.headSizeGuide}
                  </p>
                </div>
              </div>

              {/* Flower recommendations */}
              <div className="bg-white rounded-xl border border-stone-100 p-5">
                <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-1">Recommended flowers & foliage</p>
                <p className="text-[11px] text-stone-400 font-light mb-4">{vessel.whyItWorks}</p>
                <div className="flex flex-col gap-2.5">
                  {ROLES.map(role => (
                    <RoleSection key={role} role={role} flowers={vessel.recommendations[role]} />
                  ))}
                </div>
              </div>

              {/* Design theory */}
              <div className="bg-white rounded-xl border border-stone-100 p-5">
                <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Design theory</p>
                <p className="text-[12px] text-stone-600 font-light leading-relaxed mb-4">{vessel.theory}</p>
                <div>
                  <p className="text-[10px] font-semibold text-[#3D5C3A] mb-2 uppercase tracking-wide">Common mistakes to avoid</p>
                  <ul className="flex flex-col gap-1.5">
                    {vessel.commonMistakes.map((m, i) => (
                      <li key={i} className="flex gap-2 text-[12px] text-stone-600 font-light">
                        <span className="text-[#C9948E] flex-shrink-0 mt-0.5">✕</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* ── Educational section ── */}
        <div className="mt-14">
          <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-1">Core principles</p>
          <p className="text-[12px] text-stone-400 font-light mb-6">The fundamental rules of proportion and scale in floral design.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EDUCATION.map(e => (
              <div key={e.title} className="bg-white rounded-xl border border-stone-100 p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{e.icon}</span>
                  <h3
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}
                    className="text-[18px] font-semibold text-stone-800 leading-tight"
                  >
                    {e.title}
                  </h3>
                </div>
                <p className="text-[12px] text-stone-500 font-light leading-relaxed">{e.body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
