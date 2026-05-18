const MONTHS_S = ['J','F','M','A','M','J','J','A','S','O','N','D'];

export default function SeasonBar({ season }) {
  return (
    <div className="grid grid-cols-12 gap-px mt-1 mb-1">
      {season.map((active, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <div className={`h-2.5 w-full rounded-sm ${active ? 'bg-[#6B8A66]' : 'bg-stone-100'}`}/>
          <span className="text-[8px] text-stone-400 leading-none">{MONTHS_S[i]}</span>
        </div>
      ))}
    </div>
  );
}
