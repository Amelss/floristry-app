import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { generateQuiz, CATEGORIES } from '../../utils/quizGenerator';
import { generateDeepQuiz, DEEP_QUIZ_LENGTH, DEEP_CATEGORY_COLOURS } from '../../utils/deepQuizGenerator';

const QUIZ_LENGTH = 10;

/* ── Shared: Progress bar ── */
function ProgressBar({ current, total, accent }) {
  return (
    <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
      <div
        className="h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${(current / total) * 100}%`, background: accent ?? '#3D5C3A' }}
      />
    </div>
  );
}

/* ── Shared: Option button ── */
function OptionButton({ text, state, onClick }) {
  const base = 'w-full text-left px-5 py-3.5 rounded-xl border text-[13px] leading-relaxed transition-all duration-200 font-light cursor-pointer';
  const styles = {
    idle:    'bg-white border-stone-200 text-stone-700 hover:border-[#3D5C3A] hover:bg-[#3D5C3A]/5',
    correct: 'bg-[#3D5C3A] border-[#3D5C3A] text-white font-medium',
    wrong:   'bg-[#C9948E]/15 border-[#C9948E] text-[#8B3A2A]',
    missed:  'bg-[#3D5C3A]/10 border-[#3D5C3A] text-[#3D5C3A] font-medium',
  };
  return (
    <button onClick={onClick} disabled={state !== 'idle'} className={`${base} ${styles[state]}`}>
      {state === 'correct' && <span className="mr-2">✓</span>}
      {state === 'wrong'   && <span className="mr-2">✗</span>}
      {state === 'missed'  && <span className="mr-2">✓</span>}
      {text}
    </button>
  );
}

/* ── Quick quiz: grade ── */
function gradeQuick(score, total) {
  const pct = score / total;
  if (pct === 1)    return { label: 'Perfect score!',   colour: '#3D5C3A', sub: 'Exceptional. You really know your floristry.' };
  if (pct >= 0.8)   return { label: 'Distinction',      colour: '#6B8A66', sub: 'Outstanding work. Almost there!' };
  if (pct >= 0.6)   return { label: 'Merit',            colour: '#8B9DC0', sub: 'Good knowledge. Keep studying and try again.' };
  if (pct >= 0.4)   return { label: 'Pass',             colour: '#C9948E', sub: 'A solid start. Review the sections you missed.' };
  return              { label: 'Keep Practising',        colour: '#8B7355', sub: 'Floristry takes time to learn. Try a single topic first.' };
}

/* ── Deep quiz: grade ── */
function gradeDeep(score, total) {
  const pct = score / total;
  if (pct === 1)    return { label: 'Master Florist',   colour: '#3D5C3A', sub: 'Flawless. Exceptional knowledge across every area of floristry.' };
  if (pct >= 0.85)  return { label: 'Distinction',      colour: '#6B8A66', sub: 'Outstanding. The depth and breadth of an excellent student.' };
  if (pct >= 0.7)   return { label: 'Merit',            colour: '#8B9DC0', sub: 'Strong result. A few areas to revisit before a distinction.' };
  if (pct >= 0.5)   return { label: 'Pass',             colour: '#C9948E', sub: 'A solid foundation. Review the sections where you lost marks.' };
  return              { label: 'Keep Studying',          colour: '#8B7355', sub: 'Complex topics take time. Work through the reference guides section by section.' };
}

/* ════════════════════════════════════════
   SELECTION SCREEN
   ════════════════════════════════════════ */
function scoreColour(score, total) {
  const pct = score / total;
  if (pct >= 0.8) return '#3D5C3A';
  if (pct >= 0.6) return '#8B9DC0';
  if (pct >= 0.4) return '#C9948E';
  return '#8B7355';
}

function RecentResults({ history }) {
  if (!history.length) return null;
  return (
    <div className="mt-8">
      <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">
        Your recent results
      </p>
      <div className="bg-white border border-stone-200 rounded-2xl divide-y divide-stone-100 overflow-hidden">
        {history.slice(0, 5).map((r, i) => {
          const topic = r.mode === 'deep'
            ? 'In-Depth Quiz'
            : (CATEGORIES.find(c => c.id === r.category)?.label ?? 'Quick Quiz');
          return (
            <div key={`${r.ts}-${i}`} className="flex items-center gap-3 px-5 py-3">
              <span className="text-[11px] text-stone-400 font-light w-14 flex-shrink-0">
                {new Date(r.ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </span>
              <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full flex-shrink-0
                ${r.mode === 'deep' ? 'text-[#8B7355] bg-[#8B7355]/10' : 'text-[#3D5C3A] bg-[#3D5C3A]/10'}`}>
                {r.mode === 'deep' ? 'In-Depth' : 'Quick'}
              </span>
              <span className="text-[12px] text-stone-600 font-light flex-1 truncate">{topic}</span>
              <span className="text-[13px] font-medium flex-shrink-0" style={{ color: scoreColour(r.score, r.total) }}>
                {r.score}/{r.total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SelectScreen({ onSelectQuick, onSelectDeep, history }) {
  return (
    <div>
      {/* Hero — original, unchanged */}
      <div className="bg-[#3D5C3A] px-5 sm:px-14 py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-4 font-medium">
          Floral Foundations · Self-Assessment
        </p>
        <h1
          style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[36px] sm:text-[52px] font-semibold leading-[1.1] mb-4 max-w-2xl"
        >
          <span className="italic text-[#D4B8B5]">Knowledge </span>
          <span className="text-white font-normal">Quiz</span>
        </h1>
        <p className="text-[12px] sm:text-[13px] text-white/70 font-light max-w-lg leading-relaxed">
          {QUIZ_LENGTH} questions drawn from across the reference guide — Latin names, seasonality,
          colour theory, design styles, and care.
        </p>
      </div>

      <div className="max-w-[700px] mx-auto px-5 sm:px-10 py-8 sm:py-10">
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-4">
          Choose your quiz
        </p>

        <div className="flex flex-col gap-4">

          {/* Quick Quiz card */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="px-6 pt-6 pb-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2
                      style={{ fontFamily: '"Cormorant Garamond",serif' }}
                      className="text-[22px] font-semibold text-stone-800"
                    >
                      Quick Quiz
                    </h2>
                    <span className="text-[9px] font-medium text-[#3D5C3A] bg-[#3D5C3A]/10 px-2 py-0.5 rounded-full border border-[#3D5C3A]/20">
                      {QUIZ_LENGTH} questions
                    </span>
                  </div>
                  <p className="text-[12px] text-stone-500 font-light leading-relaxed">
                    Rapid-fire questions on Latin names, seasonality, colour theory, design styles,
                    and flower care. Choose a topic to focus on.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['Flower Knowledge', 'Colour Theory', 'Care & Conditioning', 'Design Styles'].map(t => (
                  <span key={t} className="text-[10px] text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <button
                onClick={onSelectQuick}
                className="w-full bg-[#3D5C3A] text-white py-3 rounded-xl text-[13px] font-medium tracking-wide hover:bg-[#2D4A2D] transition-colors cursor-pointer"
              >
                Choose Topic & Start →
              </button>
            </div>
          </div>

          {/* In-Depth Quiz card */}
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="px-6 pt-6 pb-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2
                      style={{ fontFamily: '"Cormorant Garamond",serif' }}
                      className="text-[22px] font-semibold text-stone-800"
                    >
                      In-Depth Floristry Quiz
                    </h2>
                    <span className="text-[9px] font-medium text-[#3D5C3A] bg-[#3D5C3A]/10 px-2 py-0.5 rounded-full border border-[#3D5C3A]/20">
                      {DEEP_QUIZ_LENGTH} questions
                    </span>
                  </div>
                  <p className="text-[12px] text-stone-500 font-light leading-relaxed">
                    A comprehensive test covering every area of the site — flower meanings,
                    symbolism, sustainability, terminology, gifting, care, design, and wedding
                    floristry.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {[
                  'Flower Meanings', 'Symbolism', 'Gifting & Occasions', 'Cultural Knowledge',
                  'Sustainability', 'Terminology', 'Care', 'Wedding Floristry', 'Design',
                ].map(t => (
                  <span key={t} className="text-[10px] text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <button
                onClick={onSelectDeep}
                className="w-full bg-[#3D5C3A] text-white py-3 rounded-xl text-[13px] font-medium tracking-wide hover:bg-[#2D4A2D] transition-colors cursor-pointer"
              >
                Begin the In-Depth Test →
              </button>
            </div>
          </div>

        </div>

        <RecentResults history={history} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   QUICK QUIZ: TOPIC SELECTOR
   ════════════════════════════════════════ */
function TopicScreen({ onStart, onBack }) {
  const [cat, setCat] = useState('all');
  return (
    <div className="max-w-[700px] mx-auto px-5 sm:px-10 py-8 sm:py-10">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[11px] text-stone-400 hover:text-stone-600 font-medium mb-6 cursor-pointer bg-transparent border-none transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2.5L4.5 7L9 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to quiz selection
      </button>

      <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Choose a topic</p>
      <div className="flex flex-col gap-2 mb-10">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`text-left px-5 py-4 rounded-xl border transition-all cursor-pointer ${
              cat === c.id
                ? 'bg-[#3D5C3A] border-[#3D5C3A] text-white'
                : 'bg-white border-stone-200 hover:border-[#3D5C3A]/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{c.emoji}</span>
              <div>
                <div className={`text-[13px] font-medium ${cat === c.id ? 'text-white' : 'text-stone-800'}`}>{c.label}</div>
                <div className={`text-[11px] font-light ${cat === c.id ? 'text-white/70' : 'text-stone-400'}`}>{c.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <button
        onClick={() => onStart(cat)}
        className="w-full bg-[#3D5C3A] text-white py-4 rounded-xl text-[13px] font-medium tracking-wide hover:bg-[#2D4A2D] transition-colors cursor-pointer"
      >
        Start Quiz — {QUIZ_LENGTH} Questions
      </button>
    </div>
  );
}

/* ════════════════════════════════════════
   QUICK QUIZ: QUESTION SCREEN
   ════════════════════════════════════════ */
function QuickQuestionScreen({ questions, current, onAnswer, onNext, onExit }) {
  const q = questions[current];
  const [selected, setSelected] = useState(null);

  // clear the chosen option when moving to the next question
  const [prevCurrent, setPrevCurrent] = useState(current);
  if (current !== prevCurrent) {
    setPrevCurrent(current);
    setSelected(null);
  }

  function handleSelect(opt) {
    if (selected) return;
    setSelected(opt);
    onAnswer(opt === q.answer);
  }

  function optionState(opt) {
    if (!selected) return 'idle';
    if (opt === q.answer) return 'correct';
    if (opt === selected) return 'wrong';
    return 'idle';
  }

  const answered = !!selected;
  const correct = selected === q.answer;

  return (
    <div className="max-w-[700px] mx-auto px-5 sm:px-10 py-8 sm:py-10">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-[11px] text-stone-400 hover:text-stone-600 font-medium cursor-pointer bg-transparent border-none transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2.5L4.5 7L9 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Exit Quiz
        </button>
        <span className="text-[11px] font-medium text-stone-400">Question {current + 1} of {questions.length}</span>
      </div>
      <div className="mb-3">
        <span className="text-[11px] font-medium text-stone-400">{q.category}</span>
      </div>
      <ProgressBar current={current + (answered ? 1 : 0)} total={questions.length} />

      <div className="mt-8 mb-6">
        <h2 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[26px] font-semibold text-stone-800 leading-snug">
          {q.question}
        </h2>
      </div>

      <div className="flex flex-col gap-2.5 mb-6">
        {q.options.map(opt => (
          <OptionButton key={opt} text={opt} state={optionState(opt)} onClick={() => handleSelect(opt)} />
        ))}
      </div>

      {answered && (
        <div className={`rounded-xl px-5 py-4 mb-6 border-l-4 ${correct ? 'bg-[#3D5C3A]/5 border-[#3D5C3A]' : 'bg-[#C9948E]/10 border-[#C9948E]'}`}>
          <p className={`text-[10px] font-medium tracking-[0.15em] uppercase mb-1 ${correct ? 'text-[#3D5C3A]' : 'text-[#8B3A2A]'}`}>
            {correct ? '✓ Correct' : '✗ Incorrect'}
          </p>
          <p className="text-[12.5px] text-stone-600 font-light leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={onNext}
          className="w-full bg-[#3D5C3A] text-white py-3.5 rounded-xl text-[13px] font-medium tracking-wide hover:bg-[#2D4A2D] transition-colors cursor-pointer"
        >
          {current + 1 < questions.length ? 'Next Question →' : 'See Results →'}
        </button>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   QUICK QUIZ: RESULTS SCREEN
   ════════════════════════════════════════ */
function QuickResultsScreen({ score, total, questions, answers, onRetry, onChangeTopic, onChangeQuiz }) {
  const g = gradeQuick(score, total);

  const cats = {};
  questions.forEach((q, i) => {
    if (!cats[q.category]) cats[q.category] = { correct: 0, total: 0 };
    cats[q.category].total++;
    if (answers[i]) cats[q.category].correct++;
  });

  return (
    <div className="max-w-[700px] mx-auto px-5 sm:px-10 py-10 sm:py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-5 border-4"
          style={{ borderColor: g.colour, background: g.colour + '15' }}>
          <span style={{ fontFamily: '"Cormorant Garamond",serif', color: g.colour }} className="text-[40px] font-semibold">{score}</span>
        </div>
        <p style={{ color: g.colour }} className="text-[11px] font-medium tracking-[0.2em] uppercase mb-2">{g.label}</p>
        <h2 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[38px] font-semibold text-stone-800 mb-2">
          {score} / {total} correct
        </h2>
        <p className="text-[13px] text-stone-500 font-light">{g.sub}</p>
      </div>

      {/* Category breakdown */}
      <div className="mb-8">
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">By topic</p>
        <div className="flex flex-col gap-2">
          {Object.entries(cats).map(([cat, { correct, total: t }]) => (
            <div key={cat} className="flex items-center gap-4 bg-white border border-stone-100 rounded-xl px-5 py-3">
              <div className="flex-1">
                <p className="text-[12px] font-medium text-stone-700">{cat}</p>
                <div className="mt-1.5 w-full bg-stone-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full transition-all"
                    style={{ width: `${(correct / t) * 100}%`, background: correct / t >= 0.7 ? '#6B8A66' : correct / t >= 0.4 ? '#8B9DC0' : '#C9948E' }} />
                </div>
              </div>
              <span className="text-[12px] font-medium text-stone-500 w-12 text-right flex-shrink-0">{correct}/{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Per-question review */}
      <div className="mb-8">
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Review your answers</p>
        <div className="flex flex-col gap-2">
          {questions.map((q, i) => (
            <div key={i} className={`px-4 py-3 rounded-xl border text-[11.5px] ${answers[i] ? 'bg-[#3D5C3A]/5 border-[#3D5C3A]/20' : 'bg-[#C9948E]/5 border-[#C9948E]/30'}`}>
              <div className="flex items-start gap-2">
                <span className={`flex-shrink-0 font-bold mt-0.5 ${answers[i] ? 'text-[#3D5C3A]' : 'text-[#C9948E]'}`}>{answers[i] ? '✓' : '✗'}</span>
                <div>
                  <p className="text-stone-600 font-light leading-snug mb-0.5">{q.question}</p>
                  {!answers[i] && <p className="text-[10.5px] text-[#3D5C3A] font-medium">Correct: {q.answer}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex gap-3">
          <button onClick={onRetry}
            className="flex-1 bg-[#3D5C3A] text-white py-3.5 rounded-xl text-[13px] font-medium tracking-wide hover:bg-[#2D4A2D] transition-colors cursor-pointer">
            Try Again
          </button>
          <button onClick={onChangeTopic}
            className="flex-1 bg-white border border-stone-200 text-stone-600 py-3.5 rounded-xl text-[13px] font-medium tracking-wide hover:bg-stone-50 transition-colors cursor-pointer">
            Change Topic
          </button>
        </div>
        <button onClick={onChangeQuiz}
          className="w-full bg-transparent border border-stone-200 text-stone-400 py-3 rounded-xl text-[12px] font-medium hover:bg-stone-50 transition-colors cursor-pointer">
          Try the In-Depth Quiz instead
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   DEEP QUIZ: QUESTION SCREEN
   ════════════════════════════════════════ */
function DeepQuestionScreen({ questions, current, score, streak, onAnswer, onNext, onExit }) {
  const q = questions[current];
  const [selected, setSelected] = useState(null);
  const colour = DEEP_CATEGORY_COLOURS[q.category] ?? '#948C82';

  // clear the chosen option when moving to the next question
  const [prevCurrent, setPrevCurrent] = useState(current);
  if (current !== prevCurrent) {
    setPrevCurrent(current);
    setSelected(null);
  }

  function handleSelect(opt) {
    if (selected) return;
    setSelected(opt);
    onAnswer(opt === q.answer);
  }

  function optionState(opt) {
    if (!selected) return 'idle';
    if (opt === q.answer) return 'correct';
    if (opt === selected) return 'wrong';
    return 'idle';
  }

  const answered = !!selected;
  const correct = selected === q.answer;

  return (
    <div className="max-w-[700px] mx-auto px-5 sm:px-10 py-8 sm:py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-[11px] text-stone-400 hover:text-stone-600 font-medium cursor-pointer bg-transparent border-none transition-colors flex-shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2.5L4.5 7L9 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Exit Quiz
        </button>
        <div className="flex items-center gap-3">
          {streak >= 3 && (
            <span className="text-[10px] font-medium text-[#E8A44A]">🔥 {streak} streak</span>
          )}
          <span className="text-[11px] font-medium text-stone-400">{current + 1} / {questions.length}</span>
        </div>
      </div>
      <div className="mb-3">
        <span
          className="text-[9px] font-medium tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
          style={{ background: colour + '18', color: colour, border: `1px solid ${colour}35` }}
        >
          {q.category}
        </span>
      </div>

      <ProgressBar
        current={current + (answered ? 1 : 0)}
        total={questions.length}
        accent={`linear-gradient(90deg, #2D4A2D, ${colour})`}
      />

      {/* Question card */}
      <div
        className="bg-white border border-stone-100 rounded-xl px-6 py-5 mt-7 mb-5 border-l-4"
        style={{ borderLeftColor: colour }}
      >
        <h2
          style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[24px] sm:text-[27px] font-semibold text-stone-800 leading-snug"
        >
          {q.question}
        </h2>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2.5 mb-5">
        {q.options.map(opt => (
          <OptionButton key={opt} text={opt} state={optionState(opt)} onClick={() => handleSelect(opt)} />
        ))}
      </div>

      {/* Feedback */}
      {answered && (
        <div
          className="rounded-xl px-5 py-4 mb-5 border-l-4"
          style={correct
            ? { background: '#3D5C3A08', borderLeftColor: '#3D5C3A' }
            : { background: '#C9948E0D', borderLeftColor: '#C9948E' }
          }
        >
          <p
            className="text-[10px] font-medium tracking-[0.15em] uppercase mb-2"
            style={{ color: correct ? '#3D5C3A' : '#8B3A2A' }}
          >
            {correct ? '✓ Correct' : `✗ Incorrect — correct answer: ${q.answer}`}
          </p>
          <p className="text-[12.5px] text-stone-600 font-light leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {answered && (
        <>
          <button
            onClick={onNext}
            className="w-full py-3.5 rounded-xl text-[13px] font-medium tracking-wide transition-colors cursor-pointer text-white"
            style={{ background: '#2D4A2D' }}
          >
            {current + 1 < questions.length ? 'Next Question →' : 'See My Results →'}
          </button>
          <p className="text-center text-[10.5px] text-stone-400 font-light mt-3">
            Score so far: {score + (correct ? 1 : 0)} / {current + 1}
          </p>
        </>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   DEEP QUIZ: RESULTS SCREEN
   ════════════════════════════════════════ */
function DeepResultsScreen({ score, total, questions, answers, onRetry, onChangeQuiz }) {
  const g = gradeDeep(score, total);
  const pct = Math.round((score / total) * 100);

  const cats = {};
  questions.forEach((q, i) => {
    if (!cats[q.category]) cats[q.category] = { correct: 0, total: 0 };
    cats[q.category].total++;
    if (answers[i]) cats[q.category].correct++;
  });

  const wrongs = questions.filter((_, i) => !answers[i]);

  return (
    <div className="max-w-[700px] mx-auto px-5 sm:px-10 py-10 sm:py-14">

      {/* Score */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center justify-center w-28 h-28 rounded-full mb-5 border-4"
          style={{ borderColor: g.colour, background: g.colour + '12' }}
        >
          <span style={{ fontFamily: '"Cormorant Garamond",serif', color: g.colour }} className="text-[44px] font-semibold leading-none">
            {score}
          </span>
        </div>
        <p style={{ color: g.colour }} className="text-[10px] font-medium tracking-[0.22em] uppercase mb-2">{g.label}</p>
        <h2 style={{ fontFamily: '"Cormorant Garamond",serif' }} className="text-[38px] sm:text-[44px] font-semibold text-stone-800 mb-2">
          {score} / {total} correct
        </h2>
        <p className="text-[12px] text-stone-500 font-light">{pct}% — {g.sub}</p>
      </div>

      {/* Topic breakdown */}
      <div className="mb-8">
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Breakdown by topic</p>
        <div className="flex flex-col gap-2">
          {Object.entries(cats).map(([cat, { correct, total: t }]) => {
            const colour = DEEP_CATEGORY_COLOURS[cat] ?? '#948C82';
            const catPct = correct / t;
            return (
              <div key={cat} className="bg-white border border-stone-100 rounded-xl px-5 py-3 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <p className="text-[12px] font-medium text-stone-700">{cat}</p>
                    {catPct === 1 && t > 0 && (
                      <span className="text-[9px] text-[#6B8A66] font-medium bg-[#6B8A66]/10 px-2 py-0.5 rounded-full">Perfect</span>
                    )}
                    {catPct === 0 && t > 0 && (
                      <span className="text-[9px] text-[#C9948E] font-medium bg-[#C9948E]/10 px-2 py-0.5 rounded-full">Review</span>
                    )}
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                    <div className="h-1.5 rounded-full transition-all" style={{ width: `${catPct * 100}%`, background: colour }} />
                  </div>
                </div>
                <span className="text-[12px] font-medium text-stone-500 w-10 text-right flex-shrink-0">{correct}/{t}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wrong answers review */}
      {wrongs.length > 0 && (
        <div className="mb-8">
          <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">
            Questions to review ({wrongs.length})
          </p>
          <div className="flex flex-col gap-2">
            {wrongs.map((q, i) => (
              <div key={i} className="bg-[#C9948E]/5 border border-[#C9948E]/20 rounded-xl px-4 py-3">
                <div className="flex items-start gap-2 mb-1.5">
                  <span className="text-[#C9948E] font-bold flex-shrink-0 mt-0.5">✗</span>
                  <p className="text-[12px] text-stone-600 font-light leading-snug">{q.question}</p>
                </div>
                <p className="text-[11px] text-[#3D5C3A] font-medium pl-4">✓ {q.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        <button
          onClick={onRetry}
          className="w-full text-white py-4 rounded-xl text-[13px] font-medium tracking-wide transition-colors cursor-pointer"
          style={{ background: '#2D4A2D' }}
        >
          Take the Test Again
        </button>
        <button
          onClick={onChangeQuiz}
          className="w-full bg-transparent border border-stone-200 text-stone-400 py-3 rounded-xl text-[12px] font-medium hover:bg-stone-50 transition-colors cursor-pointer"
        >
          Try the Quick Quiz instead
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN QuizPage
   ════════════════════════════════════════ */
export default function QuizPage() {
  const [screen, setScreen]     = useState('select');
  const [mode, setMode]         = useState(null);
  const [category, setCategory] = useState('all');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent]   = useState(0);
  const [score, setScore]       = useState(0);
  const [answers, setAnswers]   = useState([]);
  const [streak, setStreak]     = useState(0);
  const [history, setHistory]   = useLocalStorage('quizHistory', []);

  function startQuick(cat) {
    setMode('quick');
    setCategory(cat);
    setQuestions(generateQuiz(cat, QUIZ_LENGTH));
    setCurrent(0); setScore(0); setAnswers([]);
    setScreen('question');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function startDeep() {
    setMode('deep');
    setQuestions(generateDeepQuiz());
    setCurrent(0); setScore(0); setAnswers([]); setStreak(0);
    setScreen('question');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleExit() {
    setScreen('select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleAnswer(correct) {
    if (correct) setScore(s => s + 1);
    if (mode === 'deep') setStreak(s => correct ? s + 1 : 0);
    setAnswers(a => [...a, correct]);
  }

  function handleNext() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
    } else {
      setHistory(h => [
        { ts: Date.now(), mode, category: mode === 'quick' ? category : null, score, total: questions.length },
        ...h,
      ].slice(0, 20));
      setScreen('results');
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4]">

      {screen === 'select' && (
        <SelectScreen
          onSelectQuick={() => setScreen('topic')}
          onSelectDeep={startDeep}
          history={history}
        />
      )}

      {screen === 'topic' && (
        <TopicScreen
          onStart={startQuick}
          onBack={() => setScreen('select')}
        />
      )}

      {screen === 'question' && questions.length > 0 && mode === 'quick' && (
        <QuickQuestionScreen
          questions={questions}
          current={current}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onExit={handleExit}
        />
      )}

      {screen === 'question' && questions.length > 0 && mode === 'deep' && (
        <DeepQuestionScreen
          questions={questions}
          current={current}
          score={score}
          streak={streak}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onExit={handleExit}
        />
      )}

      {screen === 'results' && mode === 'quick' && (
        <QuickResultsScreen
          score={score}
          total={questions.length}
          questions={questions}
          answers={answers}
          onRetry={() => startQuick(category)}
          onChangeTopic={() => setScreen('topic')}
          onChangeQuiz={() => setScreen('select')}
        />
      )}

      {screen === 'results' && mode === 'deep' && (
        <DeepResultsScreen
          score={score}
          total={questions.length}
          questions={questions}
          answers={answers}
          onRetry={startDeep}
          onChangeQuiz={() => setScreen('select')}
        />
      )}

    </div>
  );
}
