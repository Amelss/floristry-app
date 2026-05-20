import COND_DATA from "../../data/conditioning";
import Hero from "../shared/Hero";

export default function ConditioningPage() {
  return (
    <div>
      <Hero
        eyebrow="Floral Foundations · Post-Harvest Care"
        title="Conditioning &"
        em="Care Guide"
        inline
        sub="How to maximise the vase life of every flower you buy — the difference between a professional and an amateur is almost always in the conditioning."
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {COND_DATA.map(({ emoji, title, sub, tips }) => (
            <div
              key={title}
              className="bg-white rounded-xl border border-stone-100 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="px-5 py-4 bg-[#3D5C3A]/5 border-b border-stone-100">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{emoji}</span>
                  <h3
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}
                    className="text-[20px] font-semibold text-stone-800"
                  >
                    {title}
                  </h3>
                </div>
                <p className="text-[11px] text-stone-500 font-light tracking-wide">
                  {sub}
                </p>
              </div>
              <ul className="px-5 py-4 flex flex-col gap-1.5">
                {tips.map((t, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[12px] text-stone-600 font-light leading-relaxed"
                  >
                    <span className="text-[#6B8A66] font-bold flex-shrink-0 mt-0.5">
                      ·
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
