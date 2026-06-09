import { useState, useEffect } from 'react';
import { fetchPexelsPhoto } from '../../utils/pexels';

export default function TopicImageCard({ topic, go, accentColour = '#3D5C3A' }) {
  const [src, setSrc]       = useState(null);
  const [loading, setLoading] = useState(!!topic.pexelsQuery);

  useEffect(() => {
    if (!topic.pexelsQuery) return;
    fetchPexelsPhoto(topic.pexelsQuery)
      .then(url => { setSrc(url); setLoading(false); })
      .catch(() => setLoading(false));
  }, [topic.pexelsQuery]);

  return (
    <div
      onClick={() => go(topic.key)}
      className="group rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-stone-100" style={{ paddingTop: '60%' }}>
        {loading && <div className="absolute inset-0 animate-pulse bg-stone-200" />}
        {!loading && src && (
          <img src={src} alt={topic.label}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
        {!loading && !src && (
          <div className="absolute inset-0 flex items-center justify-center text-4xl"
            style={{ background: accentColour + '18' }}>
            {topic.icon}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent z-10" />
        <span className="absolute top-3 left-3 z-20 text-[9px] font-medium tracking-wide uppercase bg-white/90 text-[#5C4535] px-2.5 py-1 rounded-full">
          {topic.tag}
        </span>
      </div>

      {/* Text */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[19px] font-semibold text-stone-800 leading-tight group-hover:opacity-75 transition-opacity">
          {topic.label}
        </h3>
        <p className="text-[12px] text-stone-500 leading-relaxed font-light flex-1">{topic.desc}</p>
        <span className="text-[11px] font-medium mt-1" style={{ color: accentColour }}>Open →</span>
      </div>
    </div>
  );
}
