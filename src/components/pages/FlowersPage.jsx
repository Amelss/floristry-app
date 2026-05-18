import { useState } from 'react';
import FLOWERS from '../../data/flowers';
import FlowerCard from '../flowers/FlowerCard';
import RolesKey from '../flowers/RolesKey';
import Sidebar from '../flowers/Sidebar';
import InfoBand from '../shared/InfoBand';

export default function FlowersPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const visible = FLOWERS.filter(f => {
    const isRole = filter.startsWith('role-');
    const mF = filter==='all' || (isRole && f.roles.includes(filter.replace('role-',''))) || (!isRole && f.tags.includes(filter));
    const mS = !search || f.common.toLowerCase().includes(search.toLowerCase()) || f.latin.toLowerCase().includes(search.toLowerCase());
    return mF && mS;
  });

  return (
    <div>
      <div className="bg-[#3D5C3A] px-5 sm:px-14 py-10 sm:py-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/5 pointer-events-none"/>
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-4 font-medium">Free Online Learning Plan · UK Edition</p>
        <h1 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[36px] sm:text-[52px] font-semibold text-white leading-[1.1] mb-4 max-w-lg">The 30 Core Flowers of <em className="italic text-[#D4B8B5]">UK Floristry</em></h1>
        <p className="text-[13px] text-white/55 font-light max-w-md leading-relaxed mb-6 sm:mb-8">Everything a floristry student needs to know — common names, Latin names, seasonal availability, native origins, and care notes for the 30 most essential cut flowers and foliages.</p>
        <div className="flex flex-wrap gap-5 sm:gap-10">
          {[['30','Flowers & foliages'],['12','Plant families'],['4','Seasonal groups'],['6','Flower roles']].map(([n,l]) => (
            <div key={n} className="border-l border-[#B8CEAE] pl-4">
              <div style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-3xl text-white">{n}</div>
              <div className="text-[11px] text-white/45 font-light">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <InfoBand items={[['Seasonality bars','Green blocks show the months each flower is naturally available from UK growers.'],['Import note','Many flowers are available via import year-round even outside their UK season.'],['Flower roles','Each flower is tagged: Focal, Secondary, Filler, Line, Foliage or Texture.'],['Photos','Images load from Wikipedia for some flowers — requires an internet connection.']]}/>
      {/* Mobile filter bar */}
      <div className="md:hidden px-4 py-3 border-b border-stone-100 bg-white">
        <input type="text" placeholder="Search flowers…" value={search} onChange={e => setSearch(e.target.value)}
          className="text-[11px] px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 outline-none focus:border-[#6B8A66] w-full mb-2"/>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[{key:'all',label:'All'},{key:'spring',label:'Spring'},{key:'summer',label:'Summer'},{key:'autumn',label:'Autumn'},{key:'winter',label:'Winter'},{key:'yearround',label:'Year-round'},{key:'british',label:'British'},
            {key:'role-Focal',label:'Focal'},{key:'role-Secondary',label:'Secondary'},{key:'role-Filler',label:'Filler'},{key:'role-Line',label:'Line'},{key:'role-Foliage',label:'Foliage'},{key:'role-Texture',label:'Texture'}
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`flex-shrink-0 text-[11px] px-3 py-1 rounded-full border transition-all cursor-pointer
                ${filter===f.key ? 'bg-[#3D5C3A] border-[#3D5C3A] text-white font-medium' : 'bg-white border-stone-200 text-stone-500'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        <div className="hidden md:block">
          <Sidebar filter={filter} setFilter={setFilter} search={search} setSearch={setSearch}/>
        </div>
        <main className="flex-1 min-w-0">
          <RolesKey/>
          <hr className="border-stone-200 mx-4 sm:mx-10 my-0"/>
          <div className="px-4 sm:px-10 py-6 sm:py-8">
            {visible.length === 0
              ? <div className="text-center py-20 text-stone-400 text-sm">No flowers match your search.</div>
              : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">{visible.map(f => <FlowerCard key={f.num} flower={f}/>)}</div>}
          </div>
        </main>
      </div>
    </div>
  );
}
