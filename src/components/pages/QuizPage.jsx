import { useState, useEffect } from 'react';
import { generateQuiz, CATEGORIES } from '../../utils/quizGenerator';

const QUIZ_LENGTH = 10;

/* ── Progress bar ── */
function ProgressBar({ current, total }) {
  return (
    <div className="w-full bg-stone-100 rounded-full h-1.5">
      <div className="bg-[#3D5C3A] h-1.5 rounded-full transition-all duration-500" style={{width:`${(current/total)*100}%`}}/>
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

/* ── Grade helper ── */
function grade(score, total) {
  const pct = score / total;
  if (pct === 1)    return { label: 'Perfect score!',     colour: '#3D5C3A', sub: 'Exceptional. You really know your floristry.' };
  if (pct >= 0.8)   return { label: 'Distinction',        colour: '#6B8A66', sub: 'Outstanding work. Almost there!' };
  if (pct >= 0.6)   return { label: 'Merit',              colour: '#8B9DC0', sub: 'Good knowledge. Keep studying and try again.' };
  if (pct >= 0.4)   return { label: 'Pass',               colour: '#C9948E', sub: 'A solid start. Review the sections you missed.' };
  return              { label: 'Keep Practising',          colour: '#8B7355', sub: 'Floristry takes time to learn. Try a single topic first.' };
}

/* ── Start screen ── */
function StartScreen({ onStart }) {
  const [cat, setCat] = useState('all');
  return (
    <div>
      {/* Hero — consistent with all other pages */}
      <div className="bg-[#3D5C3A] px-5 sm:px-14 py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/5 pointer-events-none"/>
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-4 font-medium">UK Floristry · Self-Assessment</p>
        <h1 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[36px] sm:text-[52px] font-semibold leading-[1.1] mb-4 max-w-2xl">
          <span className="italic text-[#D4B8B5]">Knowledge </span><span className="text-white font-normal">Quiz</span>
        </h1>
        <p className="text-[12px] sm:text-[13px] text-white/70 font-light max-w-lg leading-relaxed">
          {QUIZ_LENGTH} questions drawn from across the reference guide — Latin names, seasonality, colour theory, design styles, and care.
        </p>
      </div>

      <div className="max-w-[700px] mx-auto px-5 sm:px-10 py-8 sm:py-10">
      <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">Choose a topic</p>
      <div className="flex flex-col gap-2 mb-10">
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)}
            className={`text-left px-5 py-4 rounded-xl border transition-all cursor-pointer ${cat===c.id ? 'bg-[#3D5C3A] border-[#3D5C3A] text-white' : 'bg-white border-stone-200 hover:border-[#3D5C3A]/40'}`}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{c.emoji}</span>
              <div>
                <div className={`text-[13px] font-medium ${cat===c.id ? 'text-white' : 'text-stone-800'}`}>{c.label}</div>
                <div className={`text-[11px] font-light ${cat===c.id ? 'text-white/70' : 'text-stone-400'}`}>{c.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button onClick={() => onStart(cat)}
        className="w-full bg-[#3D5C3A] text-white py-4 rounded-xl text-[13px] font-medium tracking-wide hover:bg-[#2D4A2D] transition-colors cursor-pointer">
        Start Quiz — {QUIZ_LENGTH} Questions
      </button>
      </div>
    </div>
  );
}

/* ── Question screen ── */
function QuestionScreen({ questions, current, score, onAnswer, onNext }) {
  const q = questions[current];
  const [selected, setSelected] = useState(null);

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

  return (
    <div className="max-w-[700px] mx-auto px-5 sm:px-10 py-8 sm:py-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-medium text-stone-400">{q.category}</span>
        <span className="text-[11px] font-medium text-stone-400">Question {current+1} of {questions.length}</span>
      </div>
      <ProgressBar current={current + (answered ? 1 : 0)} total={questions.length}/>

      <div className="mt-8 mb-6">
        <h2 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[26px] font-semibold text-stone-800 leading-snug">{q.question}</h2>
      </div>

      <div className="flex flex-col gap-2.5 mb-6">
        {q.options.map(opt => (
          <OptionButton key={opt} text={opt} state={optionState(opt)} onClick={() => handleSelect(opt)}/>
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
        <button onClick={onNext}
          className="w-full bg-[#3D5C3A] text-white py-3.5 rounded-xl text-[13px] font-medium tracking-wide hover:bg-[#2D4A2D] transition-colors cursor-pointer">
          {current + 1 < questions.length ? 'Next Question →' : 'See Results →'}
        </button>
      )}
    </div>
  );
}

/* ── Results screen ── */
function ResultsScreen({ score, total, questions, answers, onRetry, onHome }) {
  const g = grade(score, total);
  const pct = Math.round((score/total)*100);

  return (
    <div className="max-w-[700px] mx-auto px-5 sm:px-10 py-10 sm:py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-5 border-4" style={{borderColor:g.colour, background:g.colour+'15'}}>
          <span style={{fontFamily:'"Cormorant Garamond",serif', color:g.colour}} className="text-[40px] font-semibold">{score}</span>
        </div>
        <p style={{color:g.colour}} className="text-[11px] font-medium tracking-[0.2em] uppercase mb-2">{g.label}</p>
        <h2 style={{fontFamily:'"Cormorant Garamond",serif'}} className="text-[38px] font-semibold text-stone-800 mb-2">{score} / {total} correct</h2>
        <p className="text-[13px] text-stone-500 font-light">{g.sub}</p>
      </div>

      {/* Score breakdown by category */}
      {(() => {
        const cats = {};
        questions.forEach((q, i) => {
          if (!cats[q.category]) cats[q.category] = {correct:0, total:0};
          cats[q.category].total++;
          if (answers[i]) cats[q.category].correct++;
        });
        return (
          <div className="mb-8">
            <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">By topic</p>
            <div className="flex flex-col gap-2">
              {Object.entries(cats).map(([cat, {correct, total}]) => (
                <div key={cat} className="flex items-center gap-4 bg-white border border-stone-100 rounded-xl px-5 py-3">
                  <div className="flex-1">
                    <p className="text-[12px] font-medium text-stone-700">{cat}</p>
                    <div className="mt-1.5 w-full bg-stone-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full transition-all" style={{width:`${(correct/total)*100}%`, background: correct/total >= 0.7 ? '#6B8A66' : correct/total >= 0.4 ? '#8B9DC0' : '#C9948E'}}/>
                    </div>
                  </div>
                  <span className="text-[12px] font-medium text-stone-500 w-12 text-right flex-shrink-0">{correct}/{total}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

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

      <div className="flex gap-3">
        <button onClick={onRetry}
          className="flex-1 bg-[#3D5C3A] text-white py-3.5 rounded-xl text-[13px] font-medium tracking-wide hover:bg-[#2D4A2D] transition-colors cursor-pointer">
          Try Again
        </button>
        <button onClick={onHome}
          className="flex-1 bg-white border border-stone-200 text-stone-600 py-3.5 rounded-xl text-[13px] font-medium tracking-wide hover:bg-stone-50 transition-colors cursor-pointer">
          Change Topic
        </button>
      </div>
    </div>
  );
}

/* ── Main QuizPage ── */
export default function QuizPage() {
  const [screen, setScreen]    = useState('start');
  const [category, setCategory]= useState('all');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent]  = useState(0);
  const [score, setScore]      = useState(0);
  const [answers, setAnswers]  = useState([]);

  function startQuiz(cat) {
    setCategory(cat);
    setQuestions(generateQuiz(cat, QUIZ_LENGTH));
    setCurrent(0);
    setScore(0);
    setAnswers([]);
    setScreen('question');
  }

  function handleAnswer(correct) {
    if (correct) setScore(s => s + 1);
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
        <StartScreen onStart={startQuiz}/>
      )}
      {screen === 'question' && questions.length > 0 && (
        <QuestionScreen
          questions={questions}
          current={current}
          score={score}
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
          onRetry={() => startQuiz(category)}
          onHome={() => setScreen('start')}
        />
      )}
    </div>
  );
}
