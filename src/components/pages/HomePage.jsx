import { useState, useEffect } from 'react';
import { fetchPexelsPhoto } from '../../utils/pexels';
import { CATEGORIES, FEATURED } from '../../data/categories';
import MONTHS_CAL from '../../data/seasonal';
// These data modules are already in the main bundle (search index) — free to reuse
import FLOWERS from '../../data/flowers';
import GLOSSARY from '../../data/glossary';
import MEANINGS from '../../data/meanings';
import { ROUTES } from '../../routes';

const STATS = [
  `${FLOWERS.length} core flowers`,
  `${GLOSSARY.length} glossary terms`,
  `${FLOWERS.length + MEANINGS.length + GLOSSARY.length} study cards`,
  `${Object.keys(ROUTES).length - 1} guides & tools`,
  'Free — no signup',
];

/* ── Section heading (serif, readable — replaces the 9px whispers) ── */
function SectionHead({ title, sub }) {
  return (
    <div className="mb-6">
      <h2
        style={{ fontFamily: '"Cormorant Garamond",serif' }}
        className="text-[26px] sm:text-[28px] font-semibold text-stone-800 leading-tight"
      >
        {title}
      </h2>
      {sub && <p className="text-[12.5px] text-stone-400 font-light mt-1">{sub}</p>}
    </div>
  );
}

/* ── SSR-safe localStorage read ── */
function readLS(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

// Local YYYY-MM-DD key (kept here so the flashcard deck stays out of this chunk)
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/* ── Hero ── */
function Hero({ go }) {
  const [heroImg, setHeroImg] = useState(null);
  useEffect(() => {
    fetchPexelsPhoto('romantic pastel pink flower bouquet soft').then(setHeroImg).catch(() => {});
  }, []);

  return (
    <div className="bg-[#3D5C3A] px-5 sm:px-14 py-12 sm:py-20 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />

      {/* Photo medallion — desktop only */}
      {heroImg && (
        <img
          src={heroImg}
          alt=""
          className="hidden lg:block absolute right-14 top-1/2 -translate-y-1/2 w-72 h-72 xl:w-80 xl:h-80 rounded-full object-cover ring-8 ring-white/10 pointer-events-none"
        />
      )}

      <div className="relative max-w-xl">
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-5 font-medium">
          Free Online Learning Resource · UK
        </p>
        <h1
          style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[40px] sm:text-[60px] font-semibold text-[#D4B8B5] leading-[1.05] mb-5"
        >
          Learn floristry, <em className="italic">properly.</em>
        </h1>
        <p className="text-[13.5px] sm:text-[15px] text-white/75 font-light max-w-lg leading-relaxed mb-8">
          A free study companion for UK floristry students and working florists —
          flower guides, colour theory, wedding work, calculators, quizzes, and
          daily practice. No signup, no cost.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => go('flowers')}
            className="px-6 py-3.5 rounded-xl bg-white text-[#3D5C3A] text-[13px] font-medium tracking-wide hover:bg-[#F2EDE4] transition-colors cursor-pointer"
          >
            Start with the 30 Core Flowers →
          </button>
          <button
            onClick={() => go('quiz')}
            className="px-6 py-3.5 rounded-xl border border-white/35 text-white text-[13px] font-medium tracking-wide hover:bg-white/10 transition-colors cursor-pointer"
          >
            Test your knowledge
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── This month / Daily practice strip ── */
function LiveStrip({ go, flashState }) {
  const month = MONTHS_CAL[new Date().getMonth()];

  return (
    <div className="bg-white border-b border-stone-100">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* In season now */}
        <button
          onClick={() => go('seasonal')}
          className="text-left rounded-2xl border border-stone-100 px-5 py-4 hover:border-[#3D5C3A]/30 hover:shadow-md transition-all cursor-pointer bg-white group"
        >
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-lg">{month.emoji}</span>
            <p className="text-[12px] font-medium text-stone-700">
              In season this {month.name}
            </p>
            <span
              className="text-[9px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full"
              style={{ background: month.colour + '30', color: '#5C4535' }}
            >
              {month.season}
            </span>
            <span className="ml-auto text-[11px] font-medium text-[#6B8A66] group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {month.flowers.slice(0, 6).map((f) => (
              <span key={f} className="text-[11px] text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full font-light">
                {f}
              </span>
            ))}
            <span className="text-[11px] text-stone-400 px-1 py-1 font-light">+ more</span>
          </div>
        </button>

        {/* Daily 10 — state-aware */}
        <button
          onClick={() => go('flashcards')}
          className="text-left rounded-2xl border border-[#3D5C3A]/20 bg-[#3D5C3A]/5 px-5 py-4 hover:border-[#3D5C3A]/40 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🗂️</span>
            <p className="text-[12px] font-medium text-[#3D5C3A]">Daily 10 Flashcards</p>
            {flashState.streakCount > 0 && (
              <span className="text-[10px] font-medium text-[#E8A44A]">🔥 {flashState.streakCount}-day streak</span>
            )}
            <span className="ml-auto text-[11px] font-medium text-[#3D5C3A] group-hover:translate-x-0.5 transition-transform">→</span>
          </div>
          <p className="text-[11.5px] text-stone-500 font-light leading-relaxed">
            {flashState.message}
          </p>
        </button>

      </div>

      {/* Stats / positioning line */}
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10 pb-5 -mt-1 text-center">
        <p className="text-[11.5px] text-stone-400 font-light tracking-wide flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1">
          {STATS.map((s, i) => (
            <span key={s} className="flex items-center gap-2.5">
              {i > 0 && <span className="text-stone-300">·</span>}
              <span>{s}</span>
            </span>
          ))}
        </p>
        <p className="text-[11px] text-stone-300 font-light mt-1.5">
          Built around UK floristry practice — from Latin names and conditioning to wedding pricing.
        </p>
      </div>
    </div>
  );
}

/* ── One live quiz question, right on the homepage ── */
function QuizTeaser({ go }) {
  const [q, setQ] = useState(null);
  const [selected, setSelected] = useState(null);

  // Lazy-load the generator so the quiz pools stay out of the homepage chunk
  useEffect(() => {
    let active = true;
    import('../../utils/quizGenerator').then((m) => {
      if (active) setQ(m.generateQuiz('all', 1)[0]);
    });
    return () => { active = false; };
  }, []);

  if (!q) return null;

  const answered = !!selected;
  const correct = selected === q.answer;

  function optionClasses(opt) {
    const base = 'w-full text-left px-5 py-3 rounded-xl border text-[13px] leading-relaxed transition-all duration-200 font-light cursor-pointer';
    if (!answered) return `${base} bg-white border-stone-200 text-stone-700 hover:border-[#3D5C3A] hover:bg-[#3D5C3A]/5`;
    if (opt === q.answer) return `${base} bg-[#3D5C3A] border-[#3D5C3A] text-white font-medium`;
    if (opt === selected) return `${base} bg-[#C9948E]/15 border-[#C9948E] text-[#8B3A2A]`;
    return `${base} bg-white border-stone-200 text-stone-400`;
  }

  return (
    <div className="mb-14">
      <SectionHead
        title="Try a question"
        sub="One from the quiz pool — a fresh one every visit."
      />
      <div className="bg-white border border-stone-100 rounded-2xl p-6 sm:p-7">
        <h3
          style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[21px] sm:text-[23px] font-semibold text-stone-800 leading-snug mb-5"
        >
          {q.question}
        </h3>
        <div className="flex flex-col gap-2.5">
          {q.options.map((opt) => (
            <button
              key={opt}
              disabled={answered}
              onClick={() => setSelected(opt)}
              className={optionClasses(opt)}
            >
              {answered && opt === q.answer && <span className="mr-2">✓</span>}
              {answered && opt === selected && opt !== q.answer && <span className="mr-2">✗</span>}
              {opt}
            </button>
          ))}
        </div>
        {answered && (
          <div className="mt-5">
            <div className={`rounded-xl px-5 py-4 border-l-4 ${correct ? 'bg-[#3D5C3A]/5 border-[#3D5C3A]' : 'bg-[#C9948E]/10 border-[#C9948E]'}`}>
              <p className={`text-[10px] font-medium tracking-[0.15em] uppercase mb-1 ${correct ? 'text-[#3D5C3A]' : 'text-[#8B3A2A]'}`}>
                {correct ? '✓ Correct' : '✗ Not quite'}
              </p>
              <p className="text-[12.5px] text-stone-600 font-light leading-relaxed">{q.explanation}</p>
            </div>
            <button
              onClick={() => go('quiz')}
              className="w-full mt-4 bg-[#3D5C3A] text-white py-3.5 rounded-xl text-[13px] font-medium tracking-wide hover:bg-[#2D4A2D] transition-colors cursor-pointer"
            >
              {correct ? 'Nice — take the full quiz →' : 'Learn it properly — take the full quiz →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Continue where you left off (returning visitors only) ── */
function ContinueRow({ go, resume }) {
  const items = [];

  if (resume.lastQuiz) {
    const topic = CATEGORIES.find((c) => c.id === resume.lastQuiz.category)?.label ?? 'Mixed — All Topics';
    items.push({
      key: 'quiz',
      icon: '✏️',
      label: `Last quiz: ${resume.lastQuiz.score}/${resume.lastQuiz.total}`,
      detail: `${topic} — try to beat it`,
      goTo: 'quiz',
    });
  }
  if (resume.recipes.length > 0) {
    items.push({
      key: 'recipe',
      icon: '💐',
      label: resume.recipes[0].name,
      detail: resume.recipes.length > 1
        ? `${resume.recipes.length} saved recipes in the builder`
        : 'Saved recipe — open in the builder',
      goTo: 'builder',
    });
  }
  if (resume.batchCount > 0) {
    items.push({
      key: 'batches',
      icon: '⏱️',
      label: `${resume.batchCount} flower ${resume.batchCount === 1 ? 'batch' : 'batches'} in care`,
      detail: 'Check conditioning timers',
      goTo: 'flowertimer',
    });
  }

  if (!items.length) return null;

  return (
    <div className="mb-14">
      <SectionHead title="Welcome back" sub="Pick up where you left off." />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => go(item.goTo)}
            className="text-left bg-white border border-stone-100 rounded-2xl px-5 py-4 hover:shadow-md hover:border-[#3D5C3A]/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-base">{item.icon}</span>
              <p className="text-[12.5px] font-medium text-stone-800 truncate">{item.label}</p>
              <span className="ml-auto text-[11px] font-medium text-[#6B8A66] group-hover:translate-x-0.5 transition-transform flex-shrink-0">→</span>
            </div>
            <p className="text-[11px] text-stone-400 font-light pl-7">{item.detail}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Category tile (large, image-left on desktop) ── */
function CategoryTile({ cat, go }) {
  const [src, setSrc]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPexelsPhoto(cat.pexelsQuery)
      .then(url => { setSrc(url); setLoading(false); })
      .catch(() => setLoading(false));
  }, [cat.pexelsQuery]);

  return (
    <div
      onClick={() => go(cat.key)}
      className="group bg-white border border-stone-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row"
    >
      {/* Image */}
      <div className="relative sm:w-56 flex-shrink-0 overflow-hidden bg-stone-100" style={{ minHeight: '180px' }}>
        {loading && <div className="absolute inset-0 animate-pulse bg-stone-200" />}
        {!loading && src && (
          <img src={src} alt={cat.label}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
        {!loading && !src && <div className="absolute inset-0" style={{ background: cat.colour + '33' }} />}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 sm:bg-none" />
      </div>

      {/* Text */}
      <div className="p-5 flex flex-col justify-between flex-1 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.colour }} />
            <h2 style={{ fontFamily: '"Cormorant Garamond",serif', color: cat.colour }}
              className="text-[24px] font-semibold leading-tight group-hover:opacity-80 transition-opacity">
              {cat.label}
            </h2>
            {cat.key === 'foundations' && (
              <span className="text-[9px] font-medium tracking-wide uppercase bg-[#3D5C3A] text-white px-2.5 py-1 rounded-full flex-shrink-0">
                Start here
              </span>
            )}
          </div>
          <p className="text-[12px] font-medium text-stone-500 mb-2">{cat.tagline}</p>
          <p className="text-[13px] text-stone-500 font-light leading-relaxed">{cat.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-stone-400 font-light">{cat.topics.length} topics</span>
          <span className="text-[12px] font-medium transition-colors" style={{ color: cat.colour }}>
            Explore →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Featured resource tile ── */
function FeaturedTile({ item, go }) {
  const [src, setSrc]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPexelsPhoto(item.pexelsQuery)
      .then(url => { setSrc(url); setLoading(false); })
      .catch(() => setLoading(false));
  }, [item.pexelsQuery]);

  return (
    <div
      onClick={() => go(item.key)}
      className="group rounded-2xl overflow-hidden border border-stone-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="relative overflow-hidden bg-stone-100" style={{ paddingTop: '62%' }}>
        {loading && <div className="absolute inset-0 animate-pulse bg-stone-200" />}
        {!loading && src && (
          <img src={src} alt={item.label}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
        {!loading && !src && <div className="absolute inset-0 bg-[#B8CEAE]" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent z-10" />
        <span className="absolute top-3 left-3 z-20 text-[9px] font-medium tracking-wide uppercase bg-white/90 text-[#5C4535] px-2.5 py-1 rounded-full">
          {item.tag}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[20px] font-semibold text-stone-800 leading-tight group-hover:text-[#3D5C3A] transition-colors">
          {item.label}
        </h3>
        <p className="text-[13px] text-stone-500 leading-relaxed font-light flex-1">{item.desc}</p>
        <span className="text-[11px] font-medium text-[#6B8A66] mt-1">Explore →</span>
      </div>
    </div>
  );
}

export default function HomePage({ go }) {
  // Read once on mount — SSR-safe (prerendered HTML carries the new-visitor state)
  const [resume] = useState(() => ({
    lastQuiz: readLS('quizHistory', [])[0] ?? null,
    recipes: readLS('savedRecipes', []),
    batchCount: readLS('floristry_batches_v1', []).length,
  }));

  const [flashState] = useState(() => {
    const session = readLS('flashcardSession', null);
    const streak = readLS('flashcardStreak', null);
    const today = todayKey();
    const streakCount = streak?.count ?? 0;
    if (session?.day === today) {
      const done = session.done.length;
      const total = session.ids.length;
      if (done >= total && total > 0) {
        return { streakCount, message: 'Done for today — come back tomorrow for your next ten.' };
      }
      if (done > 0) {
        return { streakCount, message: `${done} of ${total} done — finish today's session.` };
      }
      return { streakCount, message: "Today's ten cards are ready — Latin names, meanings, and terms." };
    }
    if (streakCount > 0) {
      return { streakCount, message: "Today's ten cards are ready — keep the streak alive." };
    }
    return {
      streakCount: 0,
      message: 'Ten spaced-repetition cards a day — the fastest way to memorise Latin names and terms.',
    };
  });

  return (
    <div>
      <Hero go={go} />
      <LiveStrip go={go} flashState={flashState} />

      <main className="max-w-[1100px] mx-auto px-5 sm:px-10 py-10 sm:py-14">

        <ContinueRow go={go} resume={resume} />

        {/* ── Categories ── */}
        <div className="mb-14">
          <SectionHead title="Browse by category" sub="Three areas of study — choose where to begin." />
          <div className="flex flex-col gap-4">
            {CATEGORIES.map(cat => (
              <CategoryTile key={cat.key} cat={cat} go={go} />
            ))}
          </div>
        </div>

        {/* ── Quiz teaser ── */}
        <QuizTeaser go={go} />

        {/* ── Featured resources ── */}
        <div>
          <SectionHead title="Featured resources" sub="The most-used tools and references — good starting points for any session." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {FEATURED.map(item => (
              <FeaturedTile key={item.key} item={item} go={go} />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
