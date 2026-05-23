import { useState, useEffect } from 'react';
import { generateDeepQuiz, DEEP_QUIZ_LENGTH, DEEP_CATEGORY_COLOURS } from '../../utils/deepQuizGenerator';

/* ── Helpers ── */
function grade(score, total) {
  const pct = score / total;
  if (pct === 1)    return { label: 'Master Florist',   colour: '#3D5C3A', sub: 'Flawless. Exceptional knowledge across every area of floristry.' };
  if (pct >= 0.85)  return { label: 'Distinction',      colour: '#6B8A66', sub: 'Outstanding. The depth and breadth of an excellent student.' };
  if (pct >= 0.7)   return { label: 'Merit',            colour: '#8B9DC0', sub: 'Strong result. A few areas to revisit before a distinction.' };
  if (pct >= 0.5)   return { label: 'Pass',             colour: '#C9948E', sub: 'A solid foundation. Review the sections where you lost marks.' };
  return              { label: 'Keep Studying',          colour: '#8B7355', sub: 'Complex topics take time. Work through the reference guides section by section.' };
}

function CategoryPill({ category }) {
  const colour = DEEP_CATEGORY_COLOURS[category] ?? '#948C82';
  return (
    <span
      className="inline-block text-[9px] font-medium tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
      style={{ background: colour + '18', color: colour, border: `1px solid ${colour}35` }}
    >
      {category}
    </span>
  );
}

/* ── Progress bar ── */
function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #3D5C3A, #6B8A66)' }}
        />
      </div>
    </div>
  );
}

/* ── Option button ── */
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

/* ── Start screen ── */
function StartScreen({ onStart }) {
  const topics = [
    { label: 'Flower Meanings & Symbolism', colour: DEEP_CATEGORY_COLOURS['Flower Meanings'] },
    { label: 'Gifting & Occasions',          colour: DEEP_CATEGORY_COLOURS['Gifting & Occasions'] },
    { label: 'Cultural Knowledge',           colour: DEEP_CATEGORY_COLOURS['Cultural Knowledge'] },
    { label: 'Sustainable Floristry',        colour: DEEP_CATEGORY_COLOURS['Sustainable Floristry'] },
    { label: 'Floristry Terminology',        colour: DEEP_CATEGORY_COLOURS['Floristry Terminology'] },
    { label: 'Wedding Floristry',            colour: DEEP_CATEGORY_COLOURS['Wedding Floristry'] },
    { label: 'Care & Conditioning',          colour: DEEP_CATEGORY_COLOURS['Care & Conditioning'] },
    { label: 'Design Principles',            colour: DEEP_CATEGORY_COLOURS['Design Principles'] },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="bg-[#2D4A2D] px-5 sm:px-14 py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full border border-white/4 pointer-events-none" />
        <p className="text-[10px] tracking-[0.24em] uppercase text-[#B8CEAE] mb-4 font-medium">
          Floral Foundations · Comprehensive Assessment
        </p>
        <h1
          style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[38px] sm:text-[56px] font-semibold leading-[1.05] mb-5 max-w-2xl"
        >
          <span className="italic text-[#D4B8B5]">In-Depth </span>
          <span className="text-white font-normal">Floristry Quiz</span>
        </h1>
        <p className="text-[13px] sm:text-[14px] text-white/65 font-light max-w-lg leading-relaxed mb-6">
          {DEEP_QUIZ_LENGTH} questions drawn from every area of the reference guide — meanings,
          symbolism, sustainability, glossary, care, design, and wedding floristry.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <span className="text-[10px] font-medium text-white/50 bg-white/8 px-3 py-1.5 rounded-full border border-white/10">
            {DEEP_QUIZ_LENGTH} questions
          </span>
          <span className="text-[10px] font-medium text-white/50 bg-white/8 px-3 py-1.5 rounded-full border border-white/10">
            8 topic areas
          </span>
          <span className="text-[10px] font-medium text-white/50 bg-white/8 px-3 py-1.5 rounded-full border border-white/10">
            No repeats
          </span>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-5 sm:px-10 py-8 sm:py-10">

        {/* Topics covered */}
        <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Topics covered</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {topics.map(t => (
            <span
              key={t.label}
              className="text-[10px] font-medium px-3 py-1.5 rounded-full"
              style={{ background: t.colour + '14', color: t.colour, border: `1px solid ${t.colour}30` }}
            >
              {t.label}
            </span>
          ))}
        </div>

        {/* What to expect */}
        <div className="bg-white border border-stone-100 rounded-xl p-5 mb-8">
          <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">What to expect</p>
          <div className="flex flex-col gap-2.5">
            {[
              ['Questions', `${DEEP_QUIZ_LENGTH} questions — more comprehensive than the Quick Quiz`],
              ['Topics', 'Covers all areas of the site including meanings, history, and sustainability'],
              ['Scoring', 'Detailed breakdown by topic at the end so you know where to study'],
              ['Difficulty', 'Questions range from accessible to genuinely challenging'],
            ].map(([label, desc]) => (
              <div key={label} className="flex gap-3 items-start">
                <span className="text-[#6B8A66] font-bold flex-shrink-0 text-[11px] mt-0.5">—</span>
                <p className="text-[12px] text-stone-600 font-light leading-relaxed">
                  <span className="font-medium text-stone-700">{label}: </span>{desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-[#2D4A2D] text-white py-4 rounded-xl text-[13px] font-medium tracking-wide hover:bg-[#1E3A1E] transition-colors cursor-pointer"
        >
          Begin the Test — {DEEP_QUIZ_LENGTH} Questions
        </button>
      </div>
    </div>
  );
}

/* ── Question screen ── */
function QuestionScreen({ questions, current, score, streak, onAnswer, onNext }) {
  const q = questions[current];
  const [selected, setSelected] = useState(null);
  const colour = DEEP_CATEGORY_COLOURS[q.category] ?? '#948C82';

  useEffect(() => { setSelected(null); }, [current]);

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
  const isLast = current + 1 === questions.length;

  return (
    <div className="max-w-[700px] mx-auto px-5 sm:px-10 py-8 sm:py-10">

      {/* Header row */}
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <CategoryPill category={q.category} />
        <div className="flex items-center gap-3">
          {streak >= 3 && (
            <span className="text-[10px] font-medium text-[#E8A44A] flex items-center gap-1">
              🔥 {streak} streak
            </span>
          )}
          <span className="text-[11px] font-medium text-stone-400">
            {current + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <ProgressBar current={current + (answered ? 1 : 0)} total={questions.length} />
      </div>

      {/* Question */}
      <div
        className="bg-white border border-stone-100 rounded-xl px-6 py-5 mb-5 border-l-4"
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

      {/* Feedback panel */}
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
        <button
          onClick={onNext}
          className="w-full py-3.5 rounded-xl text-[13px] font-medium tracking-wide transition-colors cursor-pointer text-white"
          style={{ background: '#2D4A2D' }}
        >
          {isLast ? 'See My Results →' : 'Next Question →'}
        </button>
      )}

      {/* Score ticker */}
      {answered && (
        <p className="text-center text-[10.5px] text-stone-400 font-light mt-3">
          Score so far: {score + (correct ? 1 : 0)} / {current + 1}
        </p>
      )}
    </div>
  );
}

/* ── Results screen ── */
function ResultsScreen({ score, total, questions, answers, onRetry }) {
  const g = grade(score, total);
  const pct = Math.round((score / total) * 100);

  /* category breakdown */
  const cats = {};
  questions.forEach((q, i) => {
    if (!cats[q.category]) cats[q.category] = { correct: 0, total: 0 };
    cats[q.category].total++;
    if (answers[i]) cats[q.category].correct++;
  });

  /* wrong answers */
  const wrongs = questions.filter((_, i) => !answers[i]);

  return (
    <div className="max-w-[700px] mx-auto px-5 sm:px-10 py-10 sm:py-14">

      {/* Score */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center justify-center w-28 h-28 rounded-full mb-5 border-4"
          style={{ borderColor: g.colour, background: g.colour + '12' }}
        >
          <span
            style={{ fontFamily: '"Cormorant Garamond",serif', color: g.colour }}
            className="text-[44px] font-semibold leading-none"
          >
            {score}
          </span>
        </div>
        <p style={{ color: g.colour }} className="text-[10px] font-medium tracking-[0.22em] uppercase mb-2">
          {g.label}
        </p>
        <h2
          style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[38px] sm:text-[44px] font-semibold text-stone-800 mb-2"
        >
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
                    {catPct === 1 && <span className="text-[9px] text-[#6B8A66] font-medium bg-[#6B8A66]/10 px-2 py-0.5 rounded-full">Perfect</span>}
                    {catPct === 0 && <span className="text-[9px] text-[#C9948E] font-medium bg-[#C9948E]/10 px-2 py-0.5 rounded-full">Review</span>}
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{ width: `${catPct * 100}%`, background: colour }}
                    />
                  </div>
                </div>
                <span className="text-[12px] font-medium text-stone-500 w-10 text-right flex-shrink-0">
                  {correct}/{t}
                </span>
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

      <button
        onClick={onRetry}
        className="w-full text-white py-4 rounded-xl text-[13px] font-medium tracking-wide transition-colors cursor-pointer"
        style={{ background: '#2D4A2D' }}
      >
        Take the Test Again
      </button>
    </div>
  );
}

/* ── Main ── */
export default function DeepQuizPage() {
  const [screen, setScreen]       = useState('start');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent]     = useState(0);
  const [score, setScore]         = useState(0);
  const [streak, setStreak]       = useState(0);
  const [answers, setAnswers]     = useState([]);

  function startQuiz() {
    setQuestions(generateDeepQuiz());
    setCurrent(0);
    setScore(0);
    setStreak(0);
    setAnswers([]);
    setScreen('question');
  }

  function handleAnswer(correct) {
    if (correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
    setAnswers(a => [...a, correct]);
  }

  function handleNext() {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
    } else {
      setScreen('results');
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      {screen === 'start' && (
        <StartScreen onStart={startQuiz} />
      )}
      {screen === 'question' && questions.length > 0 && (
        <QuestionScreen
          questions={questions}
          current={current}
          score={score}
          streak={streak}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}
      {screen === 'results' && (
        <ResultsScreen
          score={score}
          total={questions.length}
          questions={questions}
          answers={answers}
          onRetry={startQuiz}
        />
      )}
    </div>
  );
}
