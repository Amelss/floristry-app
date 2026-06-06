import { useState, useEffect } from 'react';
import { fetchPexelsPhoto } from '../../utils/pexels';
import { CATEGORIES, FEATURED } from '../../data/categories';

/* ── Category tile (large, image-left on desktop) ── */
function CategoryTile({ cat, go }) {
  const [src, setSrc]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPexelsPhoto(cat.pexelsQuery)
      .then(url => { setSrc(url); setLoading(false); })
      .catch(() => setLoading(false));
  }, [cat.pexelsQuery]);

  return (
    <div
      onClick={() => go(cat.key)}
      className="group bg-white border border-stone-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row"
    >
      {/* Image */}
      <div className="relative sm:w-56 flex-shrink-0 overflow-hidden bg-stone-100" style={{ minHeight: '180px' }}>
        {loading && <div className="absolute inset-0 animate-pulse bg-stone-200" />}
        {!loading && src && (
          <img src={src} alt={cat.label}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
        {!loading && !src && <div className="absolute inset-0" style={{ background: cat.colour + '33' }} />}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 sm:bg-none" />
      </div>

      {/* Text */}
      <div className="p-5 flex flex-col justify-between flex-1 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.colour }} />
            <h2 style={{ fontFamily: '"Cormorant Garamond",serif', color: cat.colour }}
              className="text-[22px] font-semibold leading-tight group-hover:opacity-80 transition-opacity">
              {cat.label}
            </h2>
          </div>
          <p className="text-[11px] font-medium text-stone-500 mb-2">{cat.tagline}</p>
          <p className="text-[12px] text-stone-400 font-light leading-relaxed">{cat.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-stone-400 font-light">{cat.topics.length} topics</span>
          <span className="text-[12px] font-medium transition-colors" style={{ color: cat.colour }}>
            Explore →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Featured resource tile ── */
function FeaturedTile({ item, go }) {
  const [src, setSrc]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPexelsPhoto(item.pexelsQuery)
      .then(url => { setSrc(url); setLoading(false); })
      .catch(() => setLoading(false));
  }, [item.pexelsQuery]);

  return (
    <div
      onClick={() => go(item.key)}
      className="group rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="relative overflow-hidden bg-stone-100" style={{ paddingTop: '62%' }}>
        {loading && <div className="absolute inset-0 animate-pulse bg-stone-200" />}
        {!loading && src && (
          <img src={src} alt={item.label}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
        {!loading && !src && <div className="absolute inset-0 bg-[#B8CEAE]" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent z-10" />
        <span className="absolute top-3 left-3 z-20 text-[9px] font-medium tracking-wide uppercase bg-white/90 text-[#5C4535] px-2.5 py-1 rounded-full">
          {item.tag}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[20px] font-semibold text-stone-800 leading-tight group-hover:text-[#3D5C3A] transition-colors">
          {item.label}
        </h3>
        <p className="text-[12px] text-stone-500 leading-relaxed font-light flex-1">{item.desc}</p>
        <span className="text-[11px] font-medium text-[#6B8A66] mt-1">Explore →</span>
      </div>
    </div>
  );
}

export default function HomePage({ go }) {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[#3D5C3A] px-5 sm:px-14 py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-5 font-medium">
          Free Online Learning Resource · UK
        </p>
        <h1
          style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[42px] sm:text-[64px] font-semibold text-[#D4B8B5] leading-[1.05] mb-5 max-w-xl"
        >
          Floral <em className="italic">Foundations</em>
        </h1>
        <p className="text-[13px] sm:text-[14px] text-white/55 font-light max-w-lg leading-relaxed">
          A free comprehensive self-study resource for beginner to intermediate
          floristry students in the United Kingdom.
        </p>
      </div>

      <main className="max-w-[1100px] mx-auto px-5 sm:px-10 py-10 sm:py-14">

        {/* ── Categories ── */}
        <div className="mb-14">
          <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-1">Browse by category</p>
          <p className="text-[12px] text-stone-400 font-light mb-6">Three areas of study — choose where to begin.</p>
          <div className="flex flex-col gap-4">
            {CATEGORIES.map(cat => (
              <CategoryTile key={cat.key} cat={cat} go={go} />
            ))}
          </div>
        </div>

        {/* ── Featured resources ── */}
        <div>
          <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-1">Featured resources</p>
          <p className="text-[12px] text-stone-400 font-light mb-6">The most-used tools and references — good starting points for any session.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FEATURED.map(item => (
              <FeaturedTile key={item.key} item={item} go={go} />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
