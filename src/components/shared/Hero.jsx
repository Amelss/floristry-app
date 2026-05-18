export default function Hero({ eyebrow, title, em, sub }) {
  return (
    <div className="bg-[#3D5C3A] px-5 sm:px-14 py-10 sm:py-14 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/5 pointer-events-none"/>
      <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-4 font-medium">{eyebrow}</p>
      <h1 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[36px] sm:text-[52px] font-semibold text-white leading-[1.1] mb-4 max-w-2xl">
        {title} <em className="italic text-[#D4B8B5]">{em}</em>
      </h1>
      <p className="text-[13px] text-white/55 font-light max-w-lg leading-relaxed">{sub}</p>
    </div>
  );
}
