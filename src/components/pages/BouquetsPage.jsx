import { useState, useEffect } from "react";
import { FOCAL, FOLIAGE, FILLER } from "../../data/bouquets";
import { fetchPexelsPhoto } from "../../utils/pexels";
import Hero from "../shared/Hero";
import InfoBand from "../shared/InfoBand";

function WikiFlowerCard({ flower, roleColour, roleLabel }) {
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPexelsPhoto(`${flower.name} flower`)
      .then((url) => {
        setSrc(url);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [flower.name]);

  return (
    <div className="bg-white rounded-xl border border-stone-100 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="relative overflow-hidden" style={{ paddingTop: "65%" }}>
        {loading && (
          <div className="absolute inset-0 animate-pulse bg-stone-100 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-stone-300 border-t-[#6B8A66] animate-spin" />
          </div>
        )}
        {!loading && src && (
          <img
            src={src}
            alt={flower.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {!loading && !src && (
          <div className="absolute inset-0 bg-[#B8CEAE] flex items-center justify-center text-white/70 text-sm font-light">
            {flower.name}
          </div>
        )}
        <span
          className="absolute top-2.5 left-2.5 z-10 text-[9px] font-medium tracking-wide uppercase text-white px-2.5 py-1 rounded-full"
          style={{ background: roleColour }}
        >
          {roleLabel}
        </span>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <h3
            style={{ fontFamily: '"Cormorant Garamond",serif' }}
            className="text-[20px] font-semibold text-stone-800 leading-tight"
          >
            {flower.name}
          </h3>
          <p
            style={{ fontFamily: '"Cormorant Garamond",serif' }}
            className="text-[13px] italic text-[#6B8A66]"
          >
            {flower.latin}
          </p>
        </div>
        <p className="text-[12px] text-stone-500 leading-relaxed font-light">
          {flower.desc}
        </p>
      </div>
    </div>
  );
}

function BouquetsSection({ title, subtitle, flowers, roleLabel, roleColour }) {
  return (
    <section className="mb-16">
      <div className="mb-6 pb-4 border-b border-stone-100">
        <div className="flex items-baseline gap-3">
          <span
            className="text-[9px] font-medium tracking-wide uppercase px-3 py-1 rounded-full text-white"
            style={{ background: roleColour }}
          >
            {roleLabel}
          </span>
          <h2
            style={{ fontFamily: '"Cormorant Garamond",serif' }}
            className="text-3xl font-semibold text-stone-800"
          >
            {title}
          </h2>
        </div>
        <p className="text-[13px] text-stone-500 font-light mt-2 max-w-2xl">
          {subtitle}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {flowers.map((f) => (
          <WikiFlowerCard
            key={f.name}
            flower={f}
            roleColour={roleColour}
            roleLabel={roleLabel}
          />
        ))}
      </div>
    </section>
  );
}

export default function BouquetsPage() {
  return (
    <div>
      <Hero
        eyebrow="Floral Foundations · Bouquet Building"
        title="Bouquets"
        em="The Top Flowers"
        sub="The essential focal flowers, foliage, and filler flowers for building beautiful hand-tied bouquets — the cornerstone skill of UK floristry."
      />
      <InfoBand
        items={[
          [
            "Focal flowers",
            "The stars of the bouquet — choose one dominant focal and build everything else around it.",
          ],
          [
            "Foliage",
            "The frame that makes focal flowers sing. Good foliage adds depth, movement, and texture.",
          ],
          [
            "Filler flowers",
            "Fill the gaps, add texture, and create a sense of abundance. Great filler separates good from great.",
          ],
        ]}
      />
      <div className="max-w-[1300px] mx-auto px-4 sm:px-10 py-8 sm:py-12">
        <BouquetsSection
          title="Top 10 Focal Flowers"
          subtitle="The stars of the bouquet — the first flowers the eye is drawn to. Choose one dominant focal and build everything else around it."
          flowers={FOCAL}
          roleLabel="Focal"
          roleColour="#3D5C3A"
        />
        <BouquetsSection
          title="Top 10 Foliage"
          subtitle="The frame that makes focal flowers sing. Good foliage adds depth, movement, and texture that no flower alone can provide."
          flowers={FOLIAGE}
          roleLabel="Foliage"
          roleColour="#6B8A66"
        />
        <BouquetsSection
          title="Top 10 Filler Flowers"
          subtitle="Fill the gaps, add texture, and create a sense of abundance. Great filler flowers are often what separates a good bouquet from a great one."
          flowers={FILLER}
          roleLabel="Filler"
          roleColour="#C9948E"
        />
      </div>
    </div>
  );
}
