import { useState, useEffect } from 'react';
import { fetchPexelsPhoto } from '../../utils/pexels';

const HOME_PAGES = [
  {page:'flowers', label:'30 Core Flowers', tag:'Reference guide', desc:'Photographs, Latin names, UK seasonality, native origins and care notes for the 30 most essential cut flowers and foliages.', query:'flower bouquet arrangement'},
  {page:'wheel', label:'Colour Wheel', tag:'Interactive tool', desc:'An interactive colour wheel covering all five harmony schemes with flower suggestions for each palette.', query:'colorful flowers garden'},
  {page:'bouquets', label:'Bouquet Flowers', tag:'Bouquet guide', desc:'The top 10 focal flowers, top 10 foliage, and top 10 filler flowers for building stunning hand-tied bouquets.', query:'hand tied bouquet flowers'},
  {page:'seasonal', label:'Seasonal Calendar', tag:'UK seasonal guide', desc:'A month-by-month breakdown of what is in season across the UK — from snowdrops in January to dahlias in October.', query:'seasonal garden flowers'},
  {page:'techniques', label:'Techniques & Skills', tag:'Practical skills', desc:'Step-by-step guides to hand-tied bouquets, foam-free mechanics, wiring and taping, wreath making and more.', query:'floristry workshop arrangement'},
  {page:'wedding', label:'Wedding Floristry', tag:'Event floristry', desc:'An introduction to bridal bouquet styles, buttonholes, table centres, ceremony arches, and client consultation.', query:'wedding flowers bridal bouquet'},
  {page:'conditioning', label:'Conditioning & Care', tag:'Essential skills', desc:'How to condition, store and extend the vase life of cut flowers — from recutting stems to managing ethylene exposure.', query:'fresh cut flowers vase water'},
];

function HomeCard({ p, go }) {
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPexelsPhoto(p.query)
      .then(url => { setSrc(url); setLoading(false); })
      .catch(() => setLoading(false));
  }, [p.query]);

  return (
    <div onClick={() => go(p.page)} className="group rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer">
      <div className="relative overflow-hidden bg-stone-100" style={{paddingTop:'62%'}}>
        {loading && <div className="absolute inset-0 animate-pulse bg-stone-200"/>}
        {!loading && src && <img src={src} alt={p.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>}
        {!loading && !src && <div className="absolute inset-0 bg-[#B8CEAE]"/>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent z-10"/>
        <span className="absolute top-3 left-3 z-20 text-[9px] font-medium tracking-wide uppercase bg-white/90 text-[#5C4535] px-2.5 py-1 rounded-full">{p.tag}</span>
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h2 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[22px] font-semibold text-stone-800 leading-tight group-hover:text-[#3D5C3A] transition-colors">{p.label}</h2>
        <p className="text-[12px] text-stone-500 leading-relaxed font-light flex-1">{p.desc}</p>
        <span className="text-[11px] font-medium text-[#6B8A66] mt-1">Explore →</span>
      </div>
    </div>
  );
}

export default function HomePage({ go }) {
  return (
    <div>
      <div className="bg-[#3D5C3A] px-5 sm:px-14 py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none"/>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full border border-white/4 translate-y-1/2 pointer-events-none"/>
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-5 font-medium">Free Online Learning Resource · UK</p>
        <h1 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[42px] sm:text-[64px] font-semibold text-white leading-[1.05] mb-5 max-w-xl">UK Floristry <em className="italic text-[#D4B8B5]">Reference</em></h1>
        <p className="text-[13px] sm:text-[14px] text-white/55 font-light max-w-lg leading-relaxed mb-8 sm:mb-10">A free comprehensive self-study resource for beginner to intermediate floristry students in the United Kingdom. No sign-up. No cost.</p>
        <div className="flex flex-wrap gap-5 sm:gap-10">
          {[['7','Learning modules'],['30','Core flowers'],['5','Key techniques'],['£0','Total cost']].map(([n,l]) => (
            <div key={n} className="border-l border-[#B8CEAE] pl-4">
              <div style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-3xl text-white">{n}</div>
              <div className="text-[11px] text-white/45 font-light">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <main className="max-w-[1200px] mx-auto px-5 sm:px-10 py-8 sm:py-12">
        <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-6">All modules</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOME_PAGES.map(p => <HomeCard key={p.page} p={p} go={go}/>)}
        </div>
      </main>
      <footer className="bg-[#3D5C3A] text-white/50 px-5 sm:px-14 py-8 text-[12px] font-light">
        <p><strong className="text-white/80 font-medium">UK Floristry Reference</strong> · A free self-study resource for beginner to intermediate floristry students.</p>
      </footer>
    </div>
  );
}
