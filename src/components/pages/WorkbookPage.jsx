import { useState } from 'react';
import Hero from '../shared/Hero';
import InfoBand from '../shared/InfoBand';
import { ROADMAP, CHECKLISTS, RHS, FURTHER_RESOURCES } from '../../data/workbook';

function SectionHeading({ title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <h2 style={{ fontFamily: '"Cormorant Garamond",serif' }}
        className="text-[22px] font-semibold text-stone-700 whitespace-nowrap">{title}</h2>
      {subtitle && <p className="text-[11.5px] text-stone-400 font-light hidden sm:block">{subtitle}</p>}
      <div className="flex-1 h-px bg-stone-100" />
    </div>
  );
}

/* ── Roadmap ── */
function RoadmapSection() {
  return (
    <div>
      <SectionHeading title="Learning Roadmap" subtitle={ROADMAP.subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ROADMAP.stages.map(s => (
          <div key={s.stage} className="bg-white border border-stone-100 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-medium tracking-[0.14em] uppercase px-2 py-0.5 rounded-full bg-[#3D5C3A]/10 text-[#3D5C3A]">{s.stage}</span>
              <span className="text-[10px] text-stone-400 font-light">{s.weeks}</span>
            </div>
            <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }}
              className="text-[17px] font-semibold text-stone-800 mb-3">{s.title}</h3>
            <ul className="flex flex-col gap-1.5">
              {s.items.map((item, i) => (
                <li key={i} className="flex gap-2 text-[12px] text-stone-500 font-light leading-snug">
                  <span className="text-[#6B8A66] flex-shrink-0 mt-0.5">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Interactive checklist card ── */
const PROGRESS_LEVELS = [
  { min: 0,    max: 0,    label: null },
  { min: 0.01, max: 0.39, label: 'Beginner',    bg: '#C9948E22', colour: '#8B3A2A' },
  { min: 0.40, max: 0.69, label: 'Developing',  bg: '#8B9DC022', colour: '#3D5878' },
  { min: 0.70, max: 0.99, label: 'Confident',   bg: '#6B8A6622', colour: '#3D5C3A' },
  { min: 1,    max: 1,    label: 'Complete',     bg: '#3D5C3A',   colour: '#fff'    },
];

function getLevel(pct) {
  return PROGRESS_LEVELS.find(l => pct >= l.min && pct <= l.max) ?? PROGRESS_LEVELS[0];
}

function ChecklistCard({ list }) {
  const [checked, setChecked] = useState(() => new Array(list.items.length).fill(false));

  const count = checked.filter(Boolean).length;
  const total = list.items.length;
  const pct   = total > 0 ? count / total : 0;
  const level = getLevel(pct);

  function toggle(i) {
    setChecked(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  }

  return (
    <div className="bg-white border border-stone-100 rounded-xl p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: list.colour }} />
          <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }}
            className="text-[16px] font-semibold text-stone-800">{list.title}</h3>
        </div>
        {level.label && (
          <span className="text-[9px] font-medium tracking-[0.12em] uppercase px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: level.bg, color: level.colour }}>
            {level.label}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full bg-stone-100 rounded-full mb-4 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct * 100}%`, background: list.colour }} />
      </div>

      {/* Items */}
      <ul className="flex flex-col flex-1">
        {list.items.map((item, i) => (
          <li key={i}
            className="flex items-start gap-3 py-2 border-b border-stone-50 last:border-0 cursor-pointer group"
            onClick={() => toggle(i)}
          >
            <span className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all duration-150
              ${checked[i] ? 'border-transparent' : 'border-stone-300 group-hover:border-stone-400'}`}
              style={checked[i] ? { background: list.colour } : {}}>
              {checked[i] && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span className={`text-[12px] font-light leading-snug transition-colors duration-150 select-none
              ${checked[i] ? 'text-stone-400 line-through' : 'text-stone-600 group-hover:text-stone-800'}`}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* Count */}
      <p className="text-[10px] text-stone-400 font-light mt-3 text-right">
        {count} of {total} completed
      </p>
    </div>
  );
}

function ChecklistsSection() {
  return (
    <div>
      <SectionHeading title="Topic Checklists" subtitle="Tick off each skill as you feel genuinely confident — progress updates live" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CHECKLISTS.map(list => <ChecklistCard key={list.title} list={list} />)}
      </div>
    </div>
  );
}

/* ── RHS ── */
function RHSSection() {
  const sec = RHS.sections[0];
  return (
    <div>
      <SectionHeading title="The Royal Horticultural Society" subtitle="Deepening your plant knowledge beyond the cut-flower context" />
      <div className="bg-white border border-stone-100 rounded-xl p-6">
        <p className="text-[13px] text-stone-600 font-light leading-relaxed mb-5">{RHS.intro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {sec.points.map((pt, i) => (
            <div key={i} className="border border-stone-100 rounded-xl p-4">
              <p className="text-[11px] font-semibold text-stone-700 mb-1">{pt.heading}</p>
              <p className="text-[12px] text-stone-500 font-light leading-relaxed">{pt.text}</p>
            </div>
          ))}
        </div>

        <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-3">RHS Qualifications</p>
        <div className="flex flex-col gap-3 mb-6">
          {RHS.sections[1].qualifications.map((q, i) => (
            <div key={i} className="flex gap-3 border-b border-stone-50 pb-3 last:border-0 last:pb-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B7BA8] flex-shrink-0 mt-1.5" />
              <div>
                <p className="text-[12.5px] font-medium text-stone-700">{q.name}</p>
                <p className="text-[12px] text-stone-500 font-light mt-0.5">{q.desc}</p>
              </div>
            </div>
          ))}
          <p className="text-[11px] text-stone-400 font-light italic">{RHS.sections[1].note}</p>
        </div>

        <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-3">On the RHS Website</p>
        <ul className="flex flex-col gap-1.5">
          {RHS.sections[2].resources.map((r, i) => (
            <li key={i} className="flex gap-2.5 text-[12.5px] text-stone-600 font-light leading-relaxed">
              <span className="font-bold flex-shrink-0 mt-0.5" style={{ color: '#5B7BA8' }}>—</span>
              {r}
            </li>
          ))}
        </ul>

        <a href="https://www.rhs.org.uk" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-5 text-[11.5px] font-medium text-[#5B7BA8] hover:text-[#3D5878] transition-colors">
          Visit rhs.org.uk
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ── External link component ── */
function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 text-[#3D5C3A] hover:text-[#2D4A2D] transition-colors font-medium">
      {children}
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none" className="opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* ── Further resources ── */
function ResourcesSection() {
  return (
    <div>
      <SectionHeading title="Further Resources" subtitle="Books, qualifications, and industry connections" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white border border-stone-100 rounded-xl p-5">
          <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-4">Recommended Reading</p>
          <div className="flex flex-col gap-3">
            {FURTHER_RESOURCES.books.map((b, i) => (
              <div key={i} className="border-b border-stone-50 pb-3 last:border-0 last:pb-0">
                <ExternalLink href={b.url}>{b.title}</ExternalLink>
                <p className="text-[10.5px] text-stone-400 font-light italic mt-0.5">{b.author}</p>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed mt-1">{b.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-stone-100 rounded-xl p-5">
          <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-4">UK Qualifications</p>
          <div className="flex flex-col gap-3">
            {FURTHER_RESOURCES.qualifications.map((q, i) => (
              <div key={i} className="border-b border-stone-50 pb-3 last:border-0 last:pb-0">
                <ExternalLink href={q.url}>{q.name}</ExternalLink>
                <p className="text-[11px] text-stone-500 font-light mt-1 leading-relaxed">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-stone-100 rounded-xl p-5">
          <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-4">Industry & Inspiration</p>
          <div className="flex flex-col gap-3">
            {FURTHER_RESOURCES.industry.map((r, i) => (
              <div key={i} className="border-b border-stone-50 pb-3 last:border-0 last:pb-0">
                <ExternalLink href={r.url}>{r.name}</ExternalLink>
                <p className="text-[11px] text-stone-500 font-light mt-1 leading-relaxed">{r.note}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function WorkbookPage() {
  return (
    <div>
      <Hero
        eyebrow="UK Floristry · Self-Guided Learning"
        title="Study"
        em="Workbook"
        inline
        sub="A six-week self-guided learning companion — a roadmap, topic checklists, RHS guidance, and further reading to support your floristry journey."
      />
      <InfoBand items={[
        ['Six-week roadmap', 'A structured progression from foundation knowledge through to applied professional practice.'],
        ['Interactive checklists', 'Tick off skills as you develop them — your progress level updates automatically.'],
        ['RHS guidance', 'An introduction to the Royal Horticultural Society and how it supports plant knowledge for floristry students.'],
      ]}/>

      <div className="max-w-[960px] mx-auto px-4 sm:px-10 py-10 flex flex-col gap-12">
        <RoadmapSection />
        <ChecklistsSection />
        <RHSSection />
        <ResourcesSection />
      </div>
    </div>
  );
}
