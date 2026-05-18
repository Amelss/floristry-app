export default function InfoBand({ items }) {
  return (
    <div className="bg-white border-b border-stone-100 px-14 py-5 grid gap-0" style={{gridTemplateColumns:`repeat(${items.length},1fr)`}}>
      {items.map(([t, d], i) => (
        <div key={i} className={i < items.length - 1 ? 'border-r border-stone-100 pr-6 mr-6' : ''}>
          <p className="text-[12px] font-medium text-stone-700 mb-0.5">{t}</p>
          <p className="text-[11.5px] text-stone-500 font-light leading-relaxed">{d}</p>
        </div>
      ))}
    </div>
  );
}
