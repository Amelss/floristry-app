import FlowerImage from './FlowerImage';
import SeasonBar from './SeasonBar';

export default function FlowerCard({ flower }) {
  return (
    <div className="bg-white rounded-xl border border-stone-100 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="relative w-full overflow-hidden" style={{paddingTop:'68%'}}>
        <FlowerImage flower={flower}/>
        <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-[10px] font-medium text-stone-600 px-2 py-0.5 rounded-full z-10">{String(flower.num).padStart(2,'0')}</div>
        <div className="absolute bottom-2.5 right-2.5 flex flex-wrap justify-end gap-1 z-10">
          {flower.roles.map(r => <span key={r} className="bg-white/90 backdrop-blur-sm text-[9px] font-medium text-stone-600 px-1.5 py-0.5 rounded-full">{r}</span>)}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div>
          <h3 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[22px] font-semibold text-stone-800 leading-tight">{flower.common}</h3>
          <p style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[14px] italic text-[#6B8A66]">{flower.latin}</p>
          <p className="text-[10px] text-stone-400 tracking-wide mt-0.5">Family: {flower.family}</p>
        </div>
        <hr className="border-stone-100"/>
        <p className="text-[12.5px] text-stone-500 leading-relaxed font-light flex-1">{flower.desc}</p>
        <div>
          <p className="text-[9px] font-medium tracking-[0.12em] uppercase text-stone-400 mb-0.5">Native Origin</p>
          <p className="text-[11px] text-[#5C4535] leading-relaxed">{flower.native}</p>
        </div>
        <div>
          <p className="text-[9px] font-medium tracking-[0.12em] uppercase text-stone-400 mb-0.5">UK Seasonality</p>
          <SeasonBar season={flower.season}/>
          <p className="text-[10px] text-stone-400 italic">{flower.imp ? 'Available imported year-round' : 'UK grown — seasonal only'}</p>
        </div>
        <div className="bg-stone-50 border-l-2 border-[#B8CEAE] pl-3 pr-2 py-2 rounded-r-lg mt-auto">
          <p className="text-[9px] font-medium tracking-[0.12em] uppercase text-stone-400 mb-0.5">Care Notes</p>
          <p className="text-[11px] text-[#5C4535] leading-relaxed italic">{flower.care}</p>
        </div>
      </div>
    </div>
  );
}
