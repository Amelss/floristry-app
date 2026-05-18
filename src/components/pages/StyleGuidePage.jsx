import { useState, useEffect } from 'react';
import STYLES from '../../data/styles';
import { fetchPexelsPhoto } from '../../utils/pexels';
import Hero from '../shared/Hero';
import InfoBand from '../shared/InfoBand';

const DIFFICULTY_ORDER = ['Beginner', 'Beginner-Intermediate', 'Intermediate', 'Intermediate-Advanced', 'Advanced'];

function StyleImage({ query, name }) {
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPexelsPhoto(query)
      .then(url => { setSrc(url); setLoading(false); })
      .catch(() => setLoading(false));
  }, [query]);
  if (loading) return <div className="w-full h-full animate-pulse bg-stone-200 flex items-center justify-center"><div className="w-6 h-6 rounded-full border-2 border-stone-300 border-t-[#6B8A66] animate-spin"/></div>;
  if (src) return <img src={src} alt={name} className="w-full h-full object-cover"/>;
  return <div className="w-full h-full bg-[#B8CEAE]"/>;
}

function PaletteSwatches({ colours }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {colours.map(c => (
        <div key={c} className="w-7 h-7 rounded-full border border-black/10 flex-shrink-0" style={{background:c}} title={c}/>
      ))}
    </div>
  );
}

function DifficultyBadge({ label, colour }) {
  return (
    <span className="text-[9px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full text-white" style={{background: colour}}>
      {label}
    </span>
  );
}

function StyleDetail({ style }) {
  return (
    <div className="flex-1 min-w-0 overflow-y-auto">
      <div className="relative overflow-hidden bg-stone-900" style={{height: '320px'}}>
        <StyleImage query={style.pexelsQuery} name={style.name}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-3 mb-2">
            <DifficultyBadge label={style.difficulty} colour={style.diffColour}/>
            <span className="text-[11px] text-white/60 font-light tracking-wide">{style.origin}</span>
          </div>
          <h2 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[42px] font-semibold text-white leading-tight">{style.name}</h2>
          <p className="text-[13px] text-white/70 font-light italic">{style.subtitle}</p>
        </div>
      </div>

      <div className="px-10 py-8 max-w-[900px]">
        <p className="text-[14px] text-stone-600 leading-relaxed font-light mb-8">{style.desc}</p>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Key Characteristics</p>
            <ul className="flex flex-col gap-2">
              {style.characteristics.map((c, i) => (
                <li key={i} className="flex gap-2.5 text-[12.5px] text-stone-600 font-light leading-relaxed">
                  <span className="text-[#6B8A66] font-bold flex-shrink-0 mt-0.5">—</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Colour Palette</p>
              <PaletteSwatches colours={style.palette}/>
            </div>
            <div>
              <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-2">Best For</p>
              <div className="flex flex-wrap gap-1.5">
                {style.occasions.map(o => (
                  <span key={o} className="text-[10.5px] font-light text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full">{o}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-stone-100 rounded-xl p-5">
            <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Signature Flowers</p>
            <div className="flex flex-wrap gap-1.5">
              {style.flowers.map(f => (
                <span key={f} style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[13px] font-semibold text-stone-700 bg-[#F0EBE1] px-2.5 py-0.5 rounded-full">{f}</span>
              ))}
            </div>
          </div>
          <div className="bg-white border border-stone-100 rounded-xl p-5">
            <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Signature Foliage</p>
            <div className="flex flex-wrap gap-1.5">
              {style.foliage.map(f => (
                <span key={f} style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[13px] italic text-[#6B8A66] bg-[#F0EBE1] px-2.5 py-0.5 rounded-full">{f}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#3D5C3A]/5 border-l-4 border-[#3D5C3A] pl-5 pr-5 py-4 rounded-r-xl">
          <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-[#3D5C3A] mb-1.5">Designer's Tip</p>
          <p className="text-[13px] text-stone-600 font-light leading-relaxed">{style.tip}</p>
        </div>
      </div>
    </div>
  );
}

function StyleSidebarItem({ style, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-full text-left px-4 py-3.5 border-b border-stone-100 transition-all cursor-pointer ${active ? 'bg-[#3D5C3A] text-white' : 'bg-white hover:bg-stone-50 text-stone-700'}`}>
      <div className="flex items-center justify-between gap-2 mb-0.5">
        <span style={{fontFamily:'"Cormorant Garamond",serif'}} className={`text-[16px] font-semibold leading-tight ${active ? 'text-white' : 'text-stone-800'}`}>{style.name}</span>
        <span className="text-[8px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full flex-shrink-0" style={{background: active ? 'rgba(255,255,255,0.2)' : style.diffColour + '22', color: active ? 'white' : style.diffColour}}>{style.difficulty}</span>
      </div>
      <p className={`text-[11px] font-light ${active ? 'text-white/70' : 'text-stone-400'}`}>{style.subtitle}</p>
    </button>
  );
}

export default function StyleGuidePage() {
  const [selected, setSelected] = useState(STYLES[0]);

  return (
    <div>
      <Hero
        eyebrow="UK Floristry · Design Styles"
        title="The Floristry"
        em="Style Guide"
        sub="Eight essential design styles every UK floristry student should know — from the loose romance of English Garden to the restrained precision of Ikebana."
      />
      <InfoBand items={[
        ['8 styles covered', 'From beginner-friendly English Garden to the advanced techniques of Dutch Masters and Ikebana.'],
        ['Difficulty levels', 'Each style is rated from Beginner to Advanced so you can study in the right order for your stage.'],
        ["Designer's tips", 'Every style includes a practical tip from a professional perspective — the things textbooks leave out.'],
      ]}/>

      <div className="flex" style={{minHeight:'calc(100vh - 49px)'}}>
        <aside className="w-64 flex-shrink-0 sticky top-[49px] self-start h-[calc(100vh-49px)] overflow-y-auto border-r border-stone-100 bg-white">
          <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 px-4 pt-5 pb-3">Select a style</p>
          {STYLES.map(s => (
            <StyleSidebarItem key={s.id} style={s} active={selected.id === s.id} onClick={() => setSelected(s)}/>
          ))}
        </aside>
        <StyleDetail style={selected}/>
      </div>
    </div>
  );
}
