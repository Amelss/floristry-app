import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  generateUnifiedQuiz,
  lengthsFor,
  CATEGORIES,
  QUIZ_LENGTHS,
} from '../../utils/quizGenerator';
import { DEEP_CATEGORY_COLOURS } from '../../utils/deepQuizGenerator';

// One colour map across both question pools
const CATEGORY_COLOURS = {
  ...DEEP_CATEGORY_COLOURS,
  'Flower Knowledge': '#3D5C3A',
  'Colour Theory':    '#8B5E9E',
  'Design Styles':    '#5B7BA8',
};

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
  };
  return (
    <button onClick={onClick} disabled={state !== 'idle'} className={`${base} ${styles[state]}`}>
      {state === 'correct' && <span className="mr-2">✓</span>}
      {state === 'wrong'   && <span className="mr-2">✗</span>}
      {text}
    </button>
  );
}

/* ── One grading scale, percentage-based so it works at any length ── */
function grade(score, total) {
  const pct = score / total;
  if (pct === 1)    return { label: 'Perfect score!',  colour: '#3D5C3A', sub: 'Flawless. Exceptional floristry knowledge.' };
  if (pct >= 0.85)  return { label: 'Distinction',     colour: '#6B8A66', sub: 'Outstanding work — exam-ready on this material.' };
  if (pct >= 0.7)   return { label: 'Merit',           colour: '#8B9DC0', sub: 'Strong result. A few areas to revisit before a distinction.' };
  if (pct >= 0.5)   return { label: 'Pass',            colour: '#C9948E', sub: 'A solid foundation. Review the sections where you lost marks.' };
  return              { label: 'Keep Practising',      colour: '#8B7355', sub: 'Floristry takes time to learn. Try a shorter quiz or a single topic first.' };
}

function scoreColour(score, total) {
  const pct = score / total;
  if (pct >= 0.8) return '#3D5C3A';
  if (pct >= 0.6) return '#8B9DC0';
  if (pct >= 0.4) return '#C9948E';
  return '#8B7355';
}

/* ── Recent results (supports both new and legacy history entries) ── */
function RecentResults({ history }) {
  if (!history.length) return null;
  return (
    <div className="mt-10">
      <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">
        Your recent results
      </p>
      <div className="bg-white border border-stone-200 rounded-2xl divide-y divide-stone-100 overflow-hidden">
        {history.slice(0, 5).map((r, i) => {
          const topic = r.mode === 'deep'
            ? 'In-Depth Quiz'
            : (CATEGORIES.find(c => c.id === r.category)?.label ?? 'Mixed — All Topics');
          return (
            <div key={`${r.ts}-${i}`} className="flex items-center gap-3 px-5 py-3">
              <span className="text-[11px] text-stone-400 font-light w-14 flex-shrink-0">
                {new Date(r.ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </span>
              <span className="text-[9px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 text-[#3D5C3A] bg-[#3D5C3A]/10">
                {r.total} Qs
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

/* ════════════════════════════════════════
   SETUP — topic + length, one screen
   ════════════════════════════════════════ */
function SetupScreen({ onStart, history }) {
  const [cat, setCat] = useState('all');
  const [length, setLength] = useState(10);

  const available = lengthsFor(cat);
  // If the chosen length isn't available for this topic, clamp to the longest that is
  const effectiveLength = available.some(l => l.value === length)
    ? length
    : available[available.length - 1].value;

  function pickCat(id) {
    setCat(id);
    const avail = lengthsFor(id);
    if (!avail.some(l => l.value === length)) setLength(avail[avail.length - 1].value);
  }

  return (
    <div>
      {/* Hero */}
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
          Pick a topic and a length — from a four-minute warm-up to a full
          in-depth test across every area of the reference guide.
        </p>
      </div>

      <div className="max-w-[700px] mx-auto px-5 sm:px-10 py-8 sm:py-10">

        {/* Topic */}
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">
          1 · Choose a topic
        </p>
        <div className="flex flex-col gap-2 mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => pickCat(c.id)}
              className={`text-left px-5 py-4 rounded-xl border transition-all cursor-pointer ${
                cat === c.id
                  ? 'bg-[#3D5C3A] border-[#3D5C3A] text-white'
                  : 'bg-white border-stone-200 hover:border-[#3D5C3A]/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-[13px] font-medium ${cat === c.id ? 'text-white' : 'text-stone-800'}`}>{c.label}</div>
                  <div className={`text-[11px] font-light ${cat === c.id ? 'text-white/70' : 'text-stone-400'}`}>{c.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Length */}
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">
          2 · Choose a length
        </p>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {QUIZ_LENGTHS.map(l => {
            const enabled = available.some(a => a.value === l.value);
            const active = effectiveLength === l.value;
            return (
              <button
                key={l.value}
                disabled={!enabled}
                onClick={() => setLength(l.value)}
                className={`px-3 py-3.5 rounded-xl border text-center transition-all
                  ${active
                    ? 'bg-[#3D5C3A] border-[#3D5C3A] text-white cursor-pointer'
                    : enabled
                      ? 'bg-white border-stone-200 hover:border-[#3D5C3A]/40 cursor-pointer'
                      : 'bg-stone-50 border-stone-100 opacity-40 cursor-default'}`}
              >
                <div className={`text-[15px] font-semibold ${active ? 'text-white' : 'text-stone-800'}`}>{l.value}</div>
                <div className={`text-[10px] font-light ${active ? 'text-white/70' : 'text-stone-400'}`}>
                  {l.label} · {l.time}
                </div>
              </button>
            );
          })}
        </div>
        {available.length < QUIZ_LENGTHS.length && (
          <p className="text-[10.5px] text-stone-400 font-light mb-2">
            Longer quizzes aren't offered for this topic — it doesn't have enough unique questions to fill them without repeats.
          </p>
        )}

        <button
          onClick={() => onStart(cat, effectiveLength)}
          className="w-full mt-6 bg-[#3D5C3A] text-white py-4 rounded-xl text-[13px] font-medium tracking-wide hover:bg-[#2D4A2D] transition-colors cursor-pointer"
        >
          Start Quiz — {effectiveLength} Questions →
        </button>

        <RecentResults history={history} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   QUESTION SCREEN
   ════════════════════════════════════════ */
function QuestionScreen({ questions, current, score, streak, onAnswer, onNext, onExit }) {
  const q = questions[current];
  const [selected, setSelected] = useState(null);
  const colour = CATEGORY_COLOURS[q.category] ?? '#948C82';

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
   RESULTS SCREEN
   ════════════════════════════════════════ */
function ResultsScreen({ score, total, questions, answers, onRetry, onChangeSetup }) {
  const g = grade(score, total);
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
            const colour = CATEGORY_COLOURS[cat] ?? '#948C82';
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
          Try Again — Same Settings
        </button>
        <button
          onClick={onChangeSetup}
          className="w-full bg-transparent border border-stone-200 text-stone-400 py-3 rounded-xl text-[12px] font-medium hover:bg-stone-50 transition-colors cursor-pointer"
        >
          Change topic or length
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN QuizPage
   ════════════════════════════════════════ */
export default function QuizPage() {
  const [screen, setScreen]     = useState('setup');
  const [category, setCategory] = useState('all');
  const [length, setLength]     = useState(10);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent]   = useState(0);
  const [score, setScore]       = useState(0);
  const [answers, setAnswers]   = useState([]);
  const [streak, setStreak]     = useState(0);
  const [history, setHistory]   = useLocalStorage('quizHistory', []);

  function startQuiz(cat, len) {
    setCategory(cat);
    setLength(len);
    setQuestions(generateUnifiedQuiz(cat, len));
    setCurrent(0); setScore(0); setAnswers([]); setStreak(0);
    setScreen('question');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleExit() {
    setScreen('setup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleAnswer(correct) {
    if (correct) setScore(s => s + 1);
    setStreak(s => correct ? s + 1 : 0);
    setAnswers(a => [...a, correct]);
  }

  function handleNext() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
    } else {
      setHistory(h => [
        { ts: Date.now(), category, score, total: questions.length },
        ...h,
      ].slice(0, 20));
      setScreen('results');
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4]">

      {screen === 'setup' && (
        <SetupScreen onStart={startQuiz} history={history} />
      )}

      {screen === 'question' && questions.length > 0 && (
        <QuestionScreen
          questions={questions}
          current={current}
          score={score}
          streak={streak}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onExit={handleExit}
        />
      )}

      {screen === 'results' && (
        <ResultsScreen
          score={score}
          total={questions.length}
          questions={questions}
          answers={answers}
          onRetry={() => startQuiz(category, length)}
          onChangeSetup={() => setScreen('setup')}
        />
      )}

    </div>
  );
}
