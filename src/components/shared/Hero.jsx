export default function Hero({ eyebrow, title, em, sub, subClassName, inline = false }) {
  const subClasses =
    subClassName ??
    "text-[12px] sm:text-[13px] text-white/70 font-light max-w-lg leading-relaxed";

  return (
    <div className="bg-[#3D5C3A] px-5 sm:px-14 py-10 sm:py-14 relative overflow-hidden">
      <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-4 font-medium">
        {eyebrow}
      </p>
      <h1
        style={{ fontFamily: '"Cormorant Garamond",serif' }}
        className={
          inline
            ? 'text-[28px] sm:text-[42px] font-semibold leading-[1.1] mb-4 whitespace-nowrap'
            : 'text-[36px] sm:text-[52px] font-semibold leading-[1.1] mb-4 max-w-2xl'
        }
      >
        {inline ? (
          <>
            <span className="italic text-[#D4B8B5]">{title} </span>
            {em && <span className="text-white font-normal not-italic">{em}</span>}
          </>
        ) : (
          <>
            <span className="block italic text-[#D4B8B5]">{title}</span>
            {em && (
              <em className="block text-white font-normal mt-3 text-[26px] sm:text-[32px]">
                {em}
              </em>
            )}
          </>
        )}
      </h1>
      <p className={subClasses}>{sub}</p>
    </div>
  );
}
