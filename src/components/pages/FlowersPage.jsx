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
      <div className="bg-[#3D5C3A] px-14 py-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/5 pointer-events-none"/>
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-4 font-medium">Free Online Learning Plan · UK Edition</p>
        <h1 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[52px] font-semibold text-white leading-[1.1] mb-4 max-w-lg">The 30 Core Flowers of <em className="italic text-[#D4B8B5]">UK Floristry</em></h1>
        <p className="text-[13px] text-white/55 font-light max-w-md leading-relaxed mb-8">Everything a floristry student needs to know — common names, Latin names, seasonal availability, native origins, and care notes for the 30 most essential cut flowers and foliages.</p>
        <div className="flex gap-10">
          {[['30','Flowers & foliages'],['12','Plant families'],['4','Seasonal groups'],['6','Flower roles']].map(([n,l]) => (
            <div key={n} className="border-l border-[#B8CEAE] pl-4">
              <div style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-3xl text-white">{n}</div>
              <div className="text-[11px] text-white/45 font-light">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <InfoBand items={[['Seasonality bars','Green blocks show the months each flower is naturally available from UK growers.'],['Import note','Many flowers are available via import year-round even outside their UK season.'],['Flower roles','Each flower is tagged: Focal, Secondary, Filler, Line, Foliage or Texture.'],['Photos','Images load from Wikipedia for some flowers — requires an internet connection.']]}/>
      <div className="flex">
        <Sidebar filter={filter} setFilter={setFilter} search={search} setSearch={setSearch}/>
        <main className="flex-1 min-w-0">
          <RolesKey/>
          <hr className="border-stone-200 mx-10 my-0"/>
          <div className="px-10 py-8">
            {visible.length === 0
              ? <div className="text-center py-20 text-stone-400 text-sm">No flowers match your search.</div>
              : <div className="grid grid-cols-3 gap-6">{visible.map(f => <FlowerCard key={f.num} flower={f}/>)}</div>}
          </div>
        </main>
      </div>
    </div>
  );
}
