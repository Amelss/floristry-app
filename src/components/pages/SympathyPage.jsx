import { useState } from 'react';
import Hero from '../shared/Hero';
import {
  TRIBUTE_TYPES,
  SYMPATHY_PALETTES,
  CULTURAL_CONSIDERATIONS,
  SUSTAINABLE_OPTIONS,
  FLOWER_SYMBOLISM,
} from '../../data/sympathy';

/* ─── Small shared components ─────────────────────────────── */

function Tag({ label, colour = '#3D5C3A' }) {
  return (
    <span
      className="text-[9px] font-medium tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
      style={{ background: `${colour}18`, color: colour }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-1">
      {children}
    </p>
  );
}

function Pill({ children, bg = 'bg-[#B8CEAE]/30', text = 'text-[#3D5C3A]' }) {
  return (
    <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${bg} ${text}`}>
      {children}
    </span>
  );
}

/* ─── Tribute selector card ────────────────────────────────── */

function TributeCard({ tribute, selected, onClick }) {
  const isSelected = selected === tribute.key;
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start gap-1 rounded-xl border-2 p-3 sm:p-4 w-full text-left transition-all cursor-pointer
        ${isSelected
          ? 'border-[#3D5C3A] bg-[#3D5C3A]/5 shadow-md'
          : 'border-stone-100 bg-white hover:border-[#3D5C3A]/30 hover:shadow-sm'}`}
    >
      <span className="text-xl leading-none">{tribute.icon}</span>
      <span className={`text-[12px] font-semibold leading-tight mt-0.5 ${isSelected ? 'text-[#3D5C3A]' : 'text-stone-700'}`}>
        {tribute.name}
      </span>
      <Tag label={tribute.tag} colour={isSelected ? '#3D5C3A' : '#6B8A66'} />
    </button>
  );
}

/* ─── Tribute detail panel ─────────────────────────────────── */

function TributeDetail({ tribute }) {
  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="bg-white rounded-xl border border-stone-100 p-5 sm:p-6">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-4xl leading-none flex-shrink-0">{tribute.icon}</span>
          <div>
            <h2
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
              className="text-[26px] sm:text-[30px] font-semibold text-stone-800 leading-tight mb-1"
            >
              {tribute.name}
            </h2>
            <Tag label={tribute.tag} />
          </div>
        </div>
        <p className="text-[13px] text-stone-600 font-light leading-relaxed mb-4">
          {tribute.description}
        </p>

        {/* Sizing */}
        <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
          <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-wide mb-1">📏 Sizing guide</p>
          <p className="text-[12px] text-amber-800 font-light leading-relaxed">{tribute.sizingGuide}</p>
        </div>
      </div>

      {/* Design & mechanics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-stone-100 p-5">
          <SectionLabel>Design approach</SectionLabel>
          <p className="text-[12px] text-stone-600 font-light leading-relaxed mt-2">{tribute.design}</p>
        </div>
        <div className="bg-white rounded-xl border border-stone-100 p-5">
          <SectionLabel>Mechanics</SectionLabel>
          <p className="text-[12px] text-stone-600 font-light leading-relaxed mt-2">{tribute.mechanics}</p>
        </div>
      </div>

      {/* Flowers & foliage */}
      <div className="bg-white rounded-xl border border-stone-100 p-5">
        <SectionLabel>Recommended flowers & foliage</SectionLabel>
        <div className="mt-3 flex flex-col gap-3">
          <div>
            <p className="text-[10px] font-semibold text-[#3D5C3A] uppercase tracking-wide mb-2">Flowers</p>
            <div className="flex flex-wrap gap-1.5">
              {tribute.flowers.map(f => (
                <Pill key={f}>{f}</Pill>
              ))}
            </div>
          </div>
          <div className="border-t border-stone-100 pt-3">
            <p className="text-[10px] font-semibold text-[#6B8A66] uppercase tracking-wide mb-2">Foliage</p>
            <div className="flex flex-wrap gap-1.5">
              {tribute.foliage.map(f => (
                <Pill key={f} bg="bg-[#6B8A66]/10" text="text-[#6B8A66]">{f}</Pill>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Florist tips */}
      <div className="bg-white rounded-xl border border-stone-100 p-5">
        <SectionLabel>Florist tips</SectionLabel>
        <ul className="mt-3 flex flex-col gap-2.5">
          {tribute.tips.map((tip, i) => (
            <li key={i} className="flex gap-3 text-[12px] text-stone-600 font-light leading-relaxed">
              <span className="text-[#3D5C3A] flex-shrink-0 font-semibold mt-0.5">✓</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

/* ─── Colour palettes ──────────────────────────────────────── */

function PaletteCard({ palette }) {
  return (
    <div className="bg-white rounded-xl border border-stone-100 p-5 hover:shadow-sm transition-shadow">
      {/* Swatches */}
      <div className="flex gap-1.5 mb-3">
        {palette.swatch.map((hex, i) => (
          <div
            key={i}
            className="flex-1 h-8 rounded-md"
            style={{ background: hex }}
          />
        ))}
      </div>
      <h3
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
        className="text-[17px] font-semibold text-stone-800 leading-tight mb-1"
      >
        {palette.name}
      </h3>
      <p className="text-[11px] text-stone-500 font-light leading-relaxed mb-3">
        {palette.description}
      </p>
      <div className="border-t border-stone-100 pt-3">
        <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-2">Key flowers</p>
        <div className="flex flex-wrap gap-1">
          {palette.flowers.slice(0, 5).map(f => (
            <Pill key={f} bg="bg-stone-100" text="text-stone-600">{f}</Pill>
          ))}
          {palette.flowers.length > 5 && (
            <Pill bg="bg-stone-50" text="text-stone-400">+{palette.flowers.length - 5} more</Pill>
          )}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-1.5">Suitable for</p>
        <div className="flex flex-wrap gap-1">
          {palette.occasions.map(o => (
            <Tag key={o} label={o} colour="#6B8A66" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Cultural card ────────────────────────────────────────── */

function CulturalCard({ item }) {
  return (
    <div className="bg-white rounded-xl border border-stone-100 p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-2xl leading-none">{item.icon}</span>
        <h3
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
          className="text-[17px] font-semibold text-stone-800 leading-tight"
        >
          {item.culture}
        </h3>
      </div>
      <ul className="flex flex-col gap-1.5 mb-3">
        {item.notes.map((note, i) => (
          <li key={i} className="flex gap-2 text-[11.5px] text-stone-600 font-light leading-relaxed">
            <span className="text-[#3D5C3A] flex-shrink-0 mt-0.5">•</span>
            {note}
          </li>
        ))}
      </ul>
      {item.avoid && (
        <div className="bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
          <p className="text-[10px] font-semibold text-rose-700 uppercase tracking-wide mb-0.5">⚠ Consider</p>
          <p className="text-[11px] text-rose-700 font-light">{item.avoid}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Main page ────────────────────────────────────────────── */

export default function SympathyPage() {
  const [selectedTribute, setSelectedTribute] = useState(TRIBUTE_TYPES[0].key);
  const tribute = TRIBUTE_TYPES.find(t => t.key === selectedTribute);

  return (
    <div>
      <Hero
        eyebrow="Floral Foundations · Learn"
        title="Sympathy &"
        em="Funeral Floristry"
        inline
        sub="A comprehensive guide to creating respectful and beautiful tributes — covering funeral flowers, tribute types, cultural considerations, and sustainable practice."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-12">

        {/* ── Tribute types ── */}
        <div className="mb-12">
          <SectionLabel>Tribute types</SectionLabel>
          <p className="text-[12px] text-stone-400 font-light mb-5">
            Select a tribute to explore its design, sizing, flower recommendations, and florist tips.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">

            {/* Selector grid */}
            <div className="lg:sticky lg:top-24">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2.5">
                {TRIBUTE_TYPES.map(t => (
                  <TributeCard
                    key={t.key}
                    tribute={t}
                    selected={selectedTribute}
                    onClick={() => setSelectedTribute(t.key)}
                  />
                ))}
              </div>
            </div>

            {/* Detail */}
            {tribute && <TributeDetail tribute={tribute} />}
          </div>
        </div>

        {/* ── Colour palettes ── */}
        <div className="mb-12">
          <SectionLabel>Sympathy colour palettes</SectionLabel>
          <p className="text-[12px] text-stone-400 font-light mb-6">
            Choosing the right palette shows care and cultural sensitivity. Always check with the family when in doubt.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SYMPATHY_PALETTES.map(p => (
              <PaletteCard key={p.name} palette={p} />
            ))}
          </div>
        </div>

        {/* ── Flower symbolism ── */}
        <div className="mb-12">
          <SectionLabel>Flower symbolism</SectionLabel>
          <p className="text-[12px] text-stone-400 font-light mb-6">
            Understanding what each flower means allows you to create arrangements that carry personal significance.
          </p>
          <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
            {FLOWER_SYMBOLISM.map((item, i) => (
              <div
                key={item.flower}
                className={`flex gap-4 px-5 py-3.5 ${i < FLOWER_SYMBOLISM.length - 1 ? 'border-b border-stone-100' : ''}`}
              >
                <span className="text-[13px] font-semibold text-stone-800 w-36 flex-shrink-0 leading-tight pt-0.5">
                  {item.flower}
                </span>
                <p className="text-[12px] text-stone-500 font-light leading-relaxed">{item.meaning}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cultural considerations ── */}
        <div className="mb-12">
          <SectionLabel>Cultural & religious considerations</SectionLabel>
          <p className="text-[12px] text-stone-400 font-light mb-6">
            Funeral floral customs vary significantly across cultures and faiths. Understanding these differences is an essential professional skill.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CULTURAL_CONSIDERATIONS.map(item => (
              <CulturalCard key={item.culture} item={item} />
            ))}
          </div>
        </div>

        {/* ── Sustainable options ── */}
        <div>
          <SectionLabel>Sustainable funeral floristry</SectionLabel>
          <p className="text-[12px] text-stone-400 font-light mb-6">
            Demand for eco-friendly funeral flowers is growing. These practices reduce environmental impact without compromising beauty or care.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SUSTAINABLE_OPTIONS.map(opt => (
              <div key={opt.title} className="bg-white rounded-xl border border-stone-100 p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl leading-none">{opt.icon}</span>
                  <h3
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                    className="text-[18px] font-semibold text-stone-800 leading-tight"
                  >
                    {opt.title}
                  </h3>
                </div>
                <p className="text-[12px] text-stone-500 font-light leading-relaxed">{opt.body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
