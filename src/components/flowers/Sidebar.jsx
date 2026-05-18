export default function Sidebar({ filter, setFilter, search, setSearch }) {
  const sF = [{key:'all',label:'All 30'},{key:'spring',label:'Spring'},{key:'summer',label:'Summer'},{key:'autumn',label:'Autumn'},{key:'winter',label:'Winter'},{key:'yearround',label:'Year-round'},{key:'british',label:'British grown'}];
  const rF = [{key:'role-Focal',label:'Focal'},{key:'role-Secondary',label:'Secondary'},{key:'role-Filler',label:'Filler'},{key:'role-Line',label:'Line'},{key:'role-Foliage',label:'Foliage'},{key:'role-Texture',label:'Texture'}];
  const Btn = ({f, ac}) => (
    <button onClick={() => setFilter(f.key)} className={`text-left text-[11.5px] px-3 py-1.5 rounded-lg border transition-all cursor-pointer w-full ${filter===f.key?`${ac} text-white font-medium`:'bg-white border-stone-200 text-stone-500 hover:bg-stone-50'}`}>
      {f.label}
    </button>
  );
  return (
    <aside className="w-52 flex-shrink-0 sticky top-[49px] self-start h-[calc(100vh-49px)] overflow-y-auto border-r border-stone-100 bg-white flex flex-col gap-5 py-5 px-4">
      <input type="text" placeholder="Search flowers…" value={search} onChange={e => setSearch(e.target.value)} className="text-[11px] px-3 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 outline-none focus:border-[#6B8A66] w-full"/>
      <div>
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-2">Season</p>
        <div className="flex flex-col gap-1">{sF.map(f => <Btn key={f.key} f={f} ac="bg-[#3D5C3A] border-[#3D5C3A]"/>)}</div>
      </div>
      <div>
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-2">Role</p>
        <div className="flex flex-col gap-1">{rF.map(f => <Btn key={f.key} f={f} ac="bg-[#5C4535] border-[#5C4535]"/>)}</div>
      </div>
    </aside>
  );
}
