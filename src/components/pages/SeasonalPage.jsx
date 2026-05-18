import MONTHS_CAL from '../../data/seasonal';
import Hero from '../shared/Hero';
import InfoBand from '../shared/InfoBand';

export default function SeasonalPage() {
  return (
    <div>
      <Hero eyebrow="UK Floristry · Seasonal Guide" title="UK Flower" em="Seasonal Calendar" sub="What's growing when — a month-by-month guide to British cut flowers and foliage, from January snowdrops to December amaryllis."/>
      <InfoBand items={[['UK grown only','This calendar covers flowers grown in Britain. Many additional varieties are available via import year-round.'],['Why seasonality matters','Seasonal flowers are fresher, cheaper, more sustainable, and support British flower farmers.'],["Ipswich & Suffolk","Your location has one of the longest growing seasons in the UK thanks to East Anglia's low rainfall and sunshine."]]}/>
      <div className="max-w-[1300px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {MONTHS_CAL.map(m => (
            <div key={m.name} className="bg-white rounded-xl border border-stone-100 overflow-hidden hover:shadow-md transition-all">
              <div className="px-4 py-3 flex items-center gap-3" style={{background:`${m.colour}20`,borderBottom:`1px solid ${m.colour}30`}}>
                <span className="text-2xl">{m.emoji}</span>
                <div>
                  <h3 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[18px] font-semibold text-stone-800">{m.name}</h3>
                  <p className="text-[10px] text-stone-500 font-light tracking-wide uppercase">{m.season}</p>
                </div>
                <div className="ml-auto w-3 h-3 rounded-full" style={{background:m.colour}}/>
              </div>
              <ul className="px-4 py-2">
                {m.flowers.map(fl => <li key={fl} className="text-[11px] text-stone-600 font-light py-0.5 border-b border-stone-50 last:border-0">{fl}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
