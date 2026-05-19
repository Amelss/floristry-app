import TECHNIQUES_DATA from "../../data/techniques";
import Hero from "../shared/Hero";

export default function TechniquesPage() {
  return (
    <div>
      <Hero
        eyebrow="UK Floristry · Practical Skills"
        title="Techniques &"
        em="Skills Guide"
        inline
        sub="Step-by-step guides to the core practical skills every UK floristry student needs — from the hand-tied bouquet to foam-free mechanics."
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {TECHNIQUES_DATA.map(({ emoji, title, sub, steps, meta }) => (
            <div
              key={title}
              className="bg-white rounded-xl border border-stone-100 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="bg-[#3D5C3A]/5 border-b border-stone-100 px-5 py-4">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{emoji}</span>
                  <h3
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}
                    className="text-[22px] font-semibold text-stone-800"
                  >
                    {title}
                  </h3>
                </div>
                <p className="text-[12px] text-stone-500 font-light">{sub}</p>
              </div>
              <div className="px-5 py-4">
                <ol className="flex flex-col gap-2 mb-4">
                  {steps.map((s, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-[12px] text-stone-600 font-light leading-relaxed"
                    >
                      <span className="text-[#6B8A66] font-medium flex-shrink-0 mt-0.5">
                        {i + 1}.
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
                <div className="flex gap-4 pt-3 border-t border-stone-100 flex-wrap">
                  {meta.map((m) => (
                    <span
                      key={m}
                      className="text-[10px] text-stone-500 font-light"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
