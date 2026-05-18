export default function Nav({ page, go }) {
  const tabs = [
    ['home','Home'],['flowers','30 Core Flowers'],['wheel','Colour Wheel'],
    ['bouquets','Bouquets'],['seasonal','Seasonal'],['techniques','Techniques'],
    ['styles','Style Guide'],['quiz','Quiz'],['wedding','Wedding'],['conditioning','Conditioning'],
  ];
  const current = page === 'wheel' ? 'wheel' : page;
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-stone-100 flex px-4 overflow-x-auto">
      {tabs.map(([key, label]) => (
        <button key={key} onClick={() => go(key)}
          className={`px-4 py-3.5 text-[11px] font-medium tracking-wide cursor-pointer border-b-2 transition-all bg-transparent whitespace-nowrap flex-shrink-0 ${current===key?'text-[#3D5C3A] border-[#3D5C3A]':'text-stone-400 border-transparent hover:text-stone-600'}`}>
          {label}
        </button>
      ))}
    </nav>
  );
}
