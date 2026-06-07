import { useState } from 'react';
import { CORE_TECHNIQUES, WIRE_GAUGES, WIRING_METHODS, TAPING_TIPS } from '../../data/techniques';
import Hero from '../shared/Hero';

/* ─── Core technique nav card ────────────────────────────────── */
function TechNavCard({ emoji, title, sub, desc, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="group rounded-xl border border-stone-100 overflow-hidden hover:border-[#3D5C3A]/30 hover:shadow-md transition-all text-left w-full h-full p-0 flex flex-col"
    >
      <div className="bg-[#3D5C3A]/5 border-b border-stone-100 px-5 py-4 rounded-t-xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{emoji}</span>
            <div>
              <h3
                style={{ fontFamily: '"Cormorant Garamond",serif' }}
                className="text-[20px] font-semibold text-stone-800 leading-tight"
              >
                {title}
              </h3>
              <p className="text-[11px] text-stone-500 font-light mt-0.5">{sub}</p>
            </div>
          </div>
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            className="flex-shrink-0 text-[#3D5C3A] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
          >
            <path d="M5 3L10.5 8L5 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="bg-white px-5 py-4 rounded-b-xl flex-1">
        <p className="text-[12px] text-stone-500 font-light leading-relaxed mb-3">{desc}</p>
        <p className="text-[11px] text-[#3D5C3A] font-medium">Explore full guide →</p>
      </div>
    </button>
  );
}

/* ─── Wire gauge card ───────────────────────────────────────── */
function GaugeCard({ gauge, label, uses, tip, recommended }) {
  return (
    <div className={`bg-white rounded-xl border overflow-hidden ${recommended ? 'border-[#3D5C3A] shadow-sm' : 'border-stone-100'}`}>
      <div className={`px-4 py-3 border-b ${recommended ? 'bg-[#3D5C3A] border-[#3D5C3A]' : 'bg-stone-50 border-stone-100'}`}>
        <div className="flex items-center justify-between gap-2">
          <span className={`font-mono text-[15px] font-bold ${recommended ? 'text-white' : 'text-stone-700'}`}>{gauge}</span>
          {recommended && (
            <span className="text-[8px] font-semibold uppercase tracking-widest bg-white/20 text-white px-2 py-0.5 rounded-full">
              Start here
            </span>
          )}
        </div>
        <p className={`text-[10px] font-medium mt-0.5 ${recommended ? 'text-white/80' : 'text-stone-500'}`}>{label}</p>
      </div>
      <div className="px-4 py-3">
        <ul className="flex flex-col gap-1 mb-2">
          {uses.map((u, i) => (
            <li key={i} className="flex gap-2 text-[11px] text-stone-600 font-light leading-snug">
              <span className="text-[#B8CEAE] flex-shrink-0 mt-0.5">•</span>
              {u}
            </li>
          ))}
        </ul>
        {tip && (
          <p className="text-[10.5px] text-[#3D5C3A] font-medium mt-2 pt-2 border-t border-stone-100">
            {tip}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Wiring method card ────────────────────────────────────── */
function MethodCard({ name, icon, difficulty, bestFor, gauge, steps, open, onToggle }) {
  const diffColour =
    difficulty === 'Beginner' ? 'bg-[#B8CEAE]/40 text-[#3D5C3A]' :
    difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700' :
    'bg-[#B8CEAE]/40 text-[#3D5C3A]';

  return (
    <div className="bg-white rounded-xl border border-stone-100 overflow-hidden hover:shadow-sm transition-all">
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 cursor-pointer"
      >
        <div className="flex items-start gap-3">
          <span className="text-xl leading-none flex-shrink-0 mt-0.5">{icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4
                style={{ fontFamily: '"Cormorant Garamond",serif' }}
                className="text-[18px] font-semibold text-stone-800 leading-tight"
              >
                {name}
              </h4>
              <span className={`text-[8px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${diffColour}`}>
                {difficulty}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-light leading-snug">
              <span className="font-medium text-stone-600">Best for: </span>{bestFor}
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5 font-light">
              <span className="font-medium">Wire: </span>{gauge}
            </p>
          </div>
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            className={`flex-shrink-0 mt-1 transition-transform duration-200 text-stone-400 ${open ? 'rotate-180' : ''}`}
          >
            <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {open && (
        <div className="border-t border-stone-100 px-5 py-4 bg-stone-50/50">
          <ol className="flex flex-col gap-2">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-2.5 text-[12px] text-stone-600 font-light leading-relaxed">
                <span className="text-[#6B8A66] font-semibold flex-shrink-0 w-4 mt-0.5">{i + 1}.</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────────── */
export default function TechniquesPage({ go }) {
  const [openMethod, setOpenMethod] = useState(null);

  return (
    <div>
      <Hero
        eyebrow="Floral Foundations · Practical Skills"
        title="Techniques &"
        em="Skills Guide"
        inline
        sub="Step-by-step guides to the core practical skills every UK floristry student needs — from the hand-tied bouquet to professional wiring and mechanics."
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-8 sm:py-12">

        {/* ── Core technique nav cards ── */}
        <div className="mb-14">
          <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-1">Core techniques</p>
          <p className="text-[12px] text-stone-400 font-light mb-6">
            The three hands-on skills that form the backbone of practical floristry training. Each opens a full guide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_TECHNIQUES.map(t => (
              <TechNavCard
                key={t.page}
                emoji={t.emoji}
                title={t.title}
                sub={t.sub}
                desc={t.desc}
                onOpen={() => go?.(t.page)}
              />
            ))}
          </div>
        </div>

        {/* ── See also ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          {[
            {
              key: 'conditioning',
              icon: '💧',
              title: 'Conditioning & Care',
              desc: 'Recutting, hydrating, and preparing flowers for maximum vase life — covered in full detail on its own page.',
            },
            {
              key: 'wheel',
              icon: '🎨',
              title: 'Colour Theory',
              desc: 'Harmony schemes, temperature, and suggested flowers for each palette — explore the interactive colour wheel.',
            },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => go?.(item.key)}
              className="flex items-start gap-4 bg-white border border-stone-100 rounded-xl px-5 py-4 hover:border-[#3D5C3A]/30 hover:shadow-sm transition-all cursor-pointer text-left"
            >
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="text-[13px] font-semibold text-stone-700 mb-0.5">{item.title}</p>
                <p className="text-[11px] text-stone-400 font-light leading-relaxed">{item.desc}</p>
                <p className="text-[10px] text-[#3D5C3A] font-medium mt-1.5">Go to {item.title} →</p>
              </div>
            </button>
          ))}
        </div>

        {/* ── Wiring & Mechanics Guide ── */}
        <div>
          <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-1">Wiring & Mechanics Guide</p>
          <p className="text-[12px] text-stone-400 font-light mb-8">
            A complete reference for professional wired floristry — wire gauges, six wiring methods, and taping technique.
          </p>

          {/* Wire gauges */}
          <div className="mb-10">
            <h3
              style={{ fontFamily: '"Cormorant Garamond",serif' }}
              className="text-[22px] font-semibold text-stone-800 mb-1"
            >
              Wire Gauges
            </h3>
            <p className="text-[12px] text-stone-400 font-light mb-4">
              Choosing the correct gauge is as important as the wiring technique itself. Too fine and the wire buckles; too heavy and you damage the stem.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WIRE_GAUGES.map(g => (
                <GaugeCard key={g.gauge} {...g} />
              ))}
            </div>
          </div>

          {/* Wiring methods */}
          <div className="mb-10">
            <h3
              style={{ fontFamily: '"Cormorant Garamond",serif' }}
              className="text-[22px] font-semibold text-stone-800 mb-1"
            >
              Wiring Methods
            </h3>
            <p className="text-[12px] text-stone-400 font-light mb-4">
              Six techniques covering every stem type you will encounter. Tap a method to expand the step-by-step guide.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
              {WIRING_METHODS.map(m => (
                <MethodCard
                  key={m.name}
                  {...m}
                  open={openMethod === m.name}
                  onToggle={() => setOpenMethod(n => n === m.name ? null : m.name)}
                />
              ))}
            </div>
          </div>

          {/* Taping tips */}
          <div>
            <h3
              style={{ fontFamily: '"Cormorant Garamond",serif' }}
              className="text-[22px] font-semibold text-stone-800 mb-1"
            >
              Taping Technique
            </h3>
            <p className="text-[12px] text-stone-400 font-light mb-4">
              Taping is the finish. Wiring can be technically perfect but poor taping makes it look amateur.
            </p>
            <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
              {TAPING_TIPS.map((tip, i) => (
                <div
                  key={i}
                  className={`flex gap-4 px-5 py-3.5 ${i < TAPING_TIPS.length - 1 ? 'border-b border-stone-100' : ''}`}
                >
                  <span className="text-[#3D5C3A] font-semibold text-[12px] flex-shrink-0 w-5 mt-0.5">{i + 1}.</span>
                  <p className="text-[12px] text-stone-600 font-light leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
