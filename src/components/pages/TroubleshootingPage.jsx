import { useState } from 'react';
import TROUBLESHOOTING, { CATEGORIES } from '../../data/troubleshooting';
import Hero from '../shared/Hero';
import InfoBand from '../shared/InfoBand';

const CATEGORY_COLOURS = {
  'Wilting & Drooping':      '#6B8A66',
  'Browning & Discolouration': '#C9948E',
  'Not Opening':             '#8B9DC0',
  'Stem & Water Problems':   '#8B7355',
  'Arrangement & Design':    '#3D5C3A',
  'Mechanics & Wiring':      '#948C82',
};

function CategoryBadge({ category }) {
  const colour = CATEGORY_COLOURS[category] ?? '#948C82';
  return (
    <span className="text-[9px] font-medium tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border flex-shrink-0"
      style={{ color: colour, borderColor: colour + '40', background: colour + '12' }}>
      {category}
    </span>
  );
}

function IssueCard({ issue }) {
  const [open, setOpen] = useState(false);
  const colour = CATEGORY_COLOURS[issue.category] ?? '#948C82';

  return (
    <div className="bg-white border border-stone-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left px-5 py-4 cursor-pointer bg-transparent border-none flex items-start gap-4"
      >
        <span className="text-2xl flex-shrink-0 mt-0.5">{issue.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap mb-1.5">
            <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }}
              className="text-[17px] font-semibold text-stone-800 leading-tight">
              {issue.problem}
            </h3>
            <CategoryBadge category={issue.category} />
          </div>
          <p className="text-[12px] text-stone-500 font-light leading-relaxed line-clamp-2">{issue.symptoms}</p>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          className={`flex-shrink-0 mt-1.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ color: colour }}>
          <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-stone-50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="sm:col-span-1">
              <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-2">Symptoms</p>
              <p className="text-[12.5px] text-stone-600 font-light leading-relaxed">{issue.symptoms}</p>
            </div>
            <div className="sm:col-span-1">
              <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-2">Likely Causes</p>
              <p className="text-[12.5px] text-stone-600 font-light leading-relaxed">{issue.causes}</p>
            </div>
            <div className="sm:col-span-1">
              <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-2">Fix</p>
              <p className="text-[12.5px] text-stone-600 font-light leading-relaxed">{issue.fix}</p>
            </div>
          </div>
          <div className="mt-4 bg-[#3D5C3A]/5 border-l-4 border-[#3D5C3A] pl-4 pr-4 py-3 rounded-r-xl">
            <p className="text-[9px] font-medium tracking-[0.16em] uppercase text-[#3D5C3A] mb-1">Pro tip</p>
            <p className="text-[12.5px] text-stone-600 font-light leading-relaxed">{issue.tip}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TroubleshootingPage() {
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = activeCategory
    ? TROUBLESHOOTING.filter(i => i.category === activeCategory)
    : TROUBLESHOOTING;

  const grouped = filtered.reduce((acc, issue) => {
    if (!acc[issue.category]) acc[issue.category] = [];
    acc[issue.category].push(issue);
    return acc;
  }, {});

  return (
    <div>
      <Hero
        eyebrow="UK Floristry · Problem Solving"
        title="Floristry"
        em="Troubleshooting Guide"
        sub="Common floristry problems explained — symptoms, causes, and step-by-step fixes for wilting, browning, wiring issues, and more."
      />
      <InfoBand items={[
        ['Tap any issue', 'Each card expands to show symptoms, likely causes, and a step-by-step fix.'],
        ['Prevention first', 'Most floristry problems stem from skipping conditioning. Good habits prevent 80% of issues before they start.'],
        ['Filter by category', 'Use the category buttons to quickly find issues related to your specific problem.'],
      ]}/>

      <div className="max-w-[900px] mx-auto px-4 sm:px-10 py-8">

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-[10px] font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer
              ${!activeCategory ? 'bg-[#3D5C3A] text-white border-[#3D5C3A]' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'}`}
          >
            All issues
          </button>
          {CATEGORIES.map(cat => {
            const colour = CATEGORY_COLOURS[cat] ?? '#948C82';
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(prev => prev === cat ? null : cat)}
                className="text-[10px] font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1.5"
                style={isActive
                  ? { color: '#fff', background: colour, borderColor: colour }
                  : { color: colour, borderColor: colour + '40', background: colour + '12' }
                }
              >
                {cat}
                {isActive && <span className="text-white/80 text-[11px]">×</span>}
              </button>
            );
          })}
        </div>

        {/* Issues grouped by category */}
        <div className="flex flex-col gap-10">
          {Object.entries(grouped).map(([category, issues]) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: CATEGORY_COLOURS[category] ?? '#948C82' }}/>
                <h2 style={{ fontFamily: '"Cormorant Garamond",serif' }}
                  className="text-[22px] font-semibold text-stone-700">{category}</h2>
                <div className="flex-1 h-px bg-stone-100"/>
              </div>
              <div className="flex flex-col gap-3">
                {issues.map(issue => <IssueCard key={issue.id} issue={issue}/>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
