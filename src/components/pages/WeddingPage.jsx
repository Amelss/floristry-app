import WEDDING_DATA from "../../data/wedding";
import Hero from "../shared/Hero";

export default function WeddingPage() {
  return (
    <div>
      <Hero
        eyebrow="UK Floristry · Event Work"
        title="Weddings"
        em="A Beginners Guide"
        sub="An introduction to the styles, structures, and personal flowers that make up a complete UK wedding floristry package."
      />
      <div className="max-w-[1100px] mx-auto px-4 sm:px-10 py-8 sm:py-10">
        <div className="bg-[#F0EBE1] border-l-4 border-[#B8CEAE] pl-5 pr-4 py-4 rounded-r-xl mb-8">
          <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-[#948C82] mb-1">
            Consultation tip
          </p>
          <p className="text-[13px] text-[#5C4535] leading-relaxed font-light">
            Always ask your client to bring three inspiration images and one
            image of what they <em>don't</em> want. Show fabric swatches and
            venue photos before agreeing on a colour palette. Budget
            conversations should happen in the first meeting.
          </p>
        </div>
        {WEDDING_DATA.map(({ title, items }) => (
          <section key={title} className="mb-10">
            <h2
              style={{ fontFamily: '"Cormorant Garamond",serif' }}
              className="text-2xl font-semibold text-stone-800 mb-4 pb-3 border-b border-stone-100"
            >
              {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map(([name, desc]) => (
                <div
                  key={name}
                  className="p-4 border border-stone-100 rounded-xl bg-white hover:shadow-sm transition-all"
                >
                  <h4
                    style={{ fontFamily: '"Cormorant Garamond",serif' }}
                    className="text-[17px] font-semibold text-stone-800 mb-1"
                  >
                    {name}
                  </h4>
                  <p className="text-[12px] text-stone-500 font-light leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
