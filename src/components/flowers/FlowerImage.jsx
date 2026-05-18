import { useState, useEffect } from 'react';
import { fetchPexelsPhoto } from '../../utils/pexels';

export default function FlowerImage({ flower }) {
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPexelsPhoto(`${flower.common} flower`)
      .then(url => { setSrc(url); setLoading(false); })
      .catch(() => setLoading(false));
  }, [flower.common]);

  if (loading) return (
    <div className="absolute inset-0 flex items-center justify-center bg-stone-100">
      <div className="w-5 h-5 rounded-full border-2 border-stone-300 border-t-[#6B8A66] animate-spin"/>
    </div>
  );
  if (src) return <img src={src} alt={flower.common} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>;
  return <div className="absolute inset-0 flex items-center justify-center text-sm text-white/70 font-light bg-[#B8CEAE]">{flower.common}</div>;
}
