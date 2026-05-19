export default function InfoBand({ items }) {
  return (
    <div className="bg-white border-b border-stone-100 px-5 sm:px-14 py-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-0">
      {items.map(([t, d], i) => (
        <div
          key={i}
          className={
            i < items.length - 1
              ? "sm:border-r sm:border-stone-100 sm:pr-6 sm:mr-6"
              : ""
          }
        >
          <p className="text-[12px] font-medium text-stone-700 mb-0.5">{t}</p>
          <p className="text-[11.5px] text-stone-500 font-light leading-relaxed">
            {d}
          </p>
        </div>
      ))}
    </div>
  );
}
