/**
 * Shared learning-course UI primitives
 * Used by HandTiedPage, FoamFreePage, WreathMakingPage
 */
import { useState, useEffect } from 'react';
import { fetchPexelsPhoto } from '../../utils/pexels';

/* ── Back link ──────────────────────────────────────────────── */
export function BackLink({ label, onBack }) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-1.5 text-[11px] text-[#3D5C3A] font-medium mb-10 hover:opacity-70 transition-opacity"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M9 2.5L4.5 7L9 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {label}
    </button>
  );
}

/* ── Section header ─────────────────────────────────────────── */
export function SectionHead({ eyebrow, title, desc }) {
  return (
    <div className="mb-6">
      <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-1">{eyebrow}</p>
      {title && (
        <h2 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[22px] font-semibold text-stone-800 mb-1">{title}</h2>
      )}
      {desc && <p className="text-[12px] text-stone-400 font-light leading-relaxed">{desc}</p>}
    </div>
  );
}

/* ── Step photo ─────────────────────────────────────────────── */
function StepPhoto({ query, fallbackEmoji = '🌸' }) {
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) { setLoading(false); return; }
    fetchPexelsPhoto(query)
      .then(url => { setSrc(url); setLoading(false); })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <div className="relative rounded-lg overflow-hidden bg-stone-100" style={{ paddingTop: '56%' }}>
      {loading && <div className="absolute inset-0 animate-pulse bg-stone-200" />}
      {!loading && src && (
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      {!loading && !src && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#3D5C3A]/5 text-4xl">
          {fallbackEmoji}
        </div>
      )}
    </div>
  );
}

/* ── Step card ──────────────────────────────────────────────── */
export function StepCard({ number, title, bullets, tip, pexelsQuery, fallbackEmoji }) {
  return (
    <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
      {/* Number banner */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3D5C3A] text-white text-[13px] font-bold flex items-center justify-center">
          {number}
        </span>
        <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[18px] font-semibold text-stone-800 leading-tight">
          {title}
        </h3>
      </div>

      {/* Photo */}
      <div className="px-5 mb-4">
        <StepPhoto query={pexelsQuery} fallbackEmoji={fallbackEmoji} />
      </div>

      {/* Bullets */}
      <ul className="px-5 pb-4 flex flex-col gap-1.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5 text-[12px] text-stone-600 font-light leading-relaxed">
            <span className="text-[#6B8A66] flex-shrink-0 font-bold mt-0.5">·</span>
            {b}
          </li>
        ))}
      </ul>

      {/* Tip callout */}
      {tip && (
        <div className="mx-5 mb-5 px-4 py-2.5 bg-[#B8CEAE]/20 border border-[#B8CEAE]/50 rounded-lg flex gap-2.5">
          <span className="text-[14px] flex-shrink-0">💡</span>
          <p className="text-[11px] text-[#3D5C3A] font-medium leading-relaxed">{tip}</p>
        </div>
      )}
    </div>
  );
}

/* ── Checklist ──────────────────────────────────────────────── */
export function Checklist({ items }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start text-[12px] text-stone-600 font-light leading-relaxed">
          <span className="flex-shrink-0 w-4 h-4 rounded border border-[#3D5C3A]/40 mt-0.5 flex items-center justify-center bg-white">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D5C3A]/30" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ── Tip card ───────────────────────────────────────────────── */
export function TipCard({ icon, label, tip }) {
  return (
    <div className="bg-white rounded-xl border border-stone-100 px-4 py-4 flex gap-3">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#3D5C3A] mb-1">{label}</p>
        <p className="text-[12px] text-stone-600 font-light leading-relaxed">{tip}</p>
      </div>
    </div>
  );
}

/* ── Mistake / accordion item ───────────────────────────────── */
export function MistakeCard({ title, problem, fix }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left px-4 py-3.5 flex items-center gap-3 cursor-pointer"
      >
        <span className="text-[16px] flex-shrink-0">⚠️</span>
        <span className="text-[12px] font-medium text-stone-700 flex-1 leading-snug">{title}</span>
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none"
          className={`flex-shrink-0 text-stone-400 transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="border-t border-stone-100 px-4 py-4 bg-stone-50/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-rose-400 mb-1.5">Why it happens</p>
            <p className="text-[12px] text-stone-600 font-light leading-relaxed">{problem}</p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-[#3D5C3A] mb-1.5">How to fix it</p>
            <p className="text-[12px] text-stone-600 font-light leading-relaxed">{fix}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Exercise card ──────────────────────────────────────────── */
export function ExerciseCard({ level, levelColour, title, task, goal, time }) {
  return (
    <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
      <div className="bg-[#3D5C3A]/5 border-b border-stone-100 px-4 py-3 flex items-center justify-between gap-2">
        <span className={`text-[8px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${levelColour}`}>{level}</span>
        <span className="text-[10px] text-stone-400 font-light">⏱ {time}</span>
      </div>
      <div className="px-4 py-4">
        <h4 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[17px] font-semibold text-stone-800 mb-2">{title}</h4>
        <p className="text-[11px] text-stone-500 font-light leading-relaxed mb-3">{task}</p>
        <div className="bg-[#B8CEAE]/20 border border-[#B8CEAE]/40 rounded-lg px-3 py-2">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-[#3D5C3A] mb-1">Goal</p>
          <p className="text-[11px] text-[#3D5C3A] font-medium leading-relaxed">{goal}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Pill tags ──────────────────────────────────────────────── */
export function PillGroup({ items, colour = 'bg-[#3D5C3A]/8 text-[#3D5C3A]' }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map(t => (
        <span key={t} className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${colour}`}>{t}</span>
      ))}
    </div>
  );
}
