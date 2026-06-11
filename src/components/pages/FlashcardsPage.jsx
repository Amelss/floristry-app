import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  buildDeck,
  dayKey,
  selectDailyCards,
  gradeCard,
  updateStreak,
  boxCounts,
  MAX_BOX,
} from '../../utils/spacedRepetition';

const DECK = buildDeck();
const DECK_BY_ID = Object.fromEntries(DECK.map((c) => [c.id, c]));

const BOX_LABELS = ['New & learning', 'Warming up', 'Getting there', 'Nearly solid', 'Mastered'];

function ProgressBar({ current, total }) {
  return (
    <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
      <div
        className="h-1.5 rounded-full bg-[#3D5C3A] transition-all duration-500"
        style={{ width: `${(current / Math.max(total, 1)) * 100}%` }}
      />
    </div>
  );
}

function StreakBadge({ streak, today }) {
  if (!streak?.count) return null;
  const active = streak.lastDay === today;
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full
        ${active ? 'bg-[#3D5C3A]/10 text-[#3D5C3A]' : 'bg-stone-100 text-stone-500'}`}
    >
      🔥 {streak.count}-day streak
    </span>
  );
}

export default function FlashcardsPage() {
  const [cardStates, setCardStates] = useLocalStorage('flashcardProgress', {});
  const [session, setSession] = useLocalStorage('flashcardSession', null);
  const [streak, setStreak] = useLocalStorage('flashcardStreak', null);
  const [revealed, setRevealed] = useState(false);

  const today = dayKey();

  // Start (or roll over to) today's session
  const sessionValid = session && session.day === today;
  let activeSession = session;
  if (!sessionValid) {
    const ids = selectDailyCards(DECK, cardStates, today).map((c) => c.id);
    activeSession = { day: today, ids, done: [], correct: 0 };
    setSession(activeSession);
  }

  const remaining = activeSession.ids.filter((id) => !activeSession.done.includes(id));
  const card = DECK_BY_ID[remaining[0]];
  const total = activeSession.ids.length;
  const position = total - remaining.length;
  const finished = total > 0 && remaining.length === 0;

  function grade(correct) {
    setCardStates(gradeCard(cardStates, card.id, correct, today));
    const done = [...activeSession.done, card.id];
    setSession({
      ...activeSession,
      done,
      correct: activeSession.correct + (correct ? 1 : 0),
    });
    setRevealed(false);
    if (done.length === total) setStreak(updateStreak(streak, today));
  }

  const boxes = boxCounts(cardStates);
  const seen = Object.keys(cardStates).length;

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      {/* Hero */}
      <div className="bg-[#3D5C3A] px-5 sm:px-14 py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#B8CEAE] mb-4 font-medium">
          Floral Foundations · Daily Practice
        </p>
        <h1
          style={{ fontFamily: '"Cormorant Garamond",serif' }}
          className="text-[36px] sm:text-[52px] font-semibold leading-[1.1] mb-4 max-w-2xl"
        >
          <span className="italic text-[#D4B8B5]">Daily 10 </span>
          <span className="text-white font-normal">Flashcards</span>
        </h1>
        <p className="text-[12px] sm:text-[13px] text-white/70 font-light max-w-lg leading-relaxed">
          Ten cards a day — Latin names, flower meanings, and glossary terms.
          Cards you know come back less often; cards you miss come back tomorrow.
        </p>
      </div>

      <div className="max-w-[560px] mx-auto px-5 py-8 sm:py-10">
        {/* Session header */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] text-stone-400 font-light">
            {finished ? 'Session complete' : total === 0 ? 'All caught up' : `Card ${position + 1} of ${total}`}
          </p>
          <StreakBadge streak={streak} today={today} />
        </div>
        <ProgressBar current={position} total={total} />

        {/* Nothing due (deck fully scheduled into the future) */}
        {total === 0 && (
          <div className="bg-white border border-stone-100 rounded-2xl p-10 text-center mt-6 shadow-sm">
            <p className="text-[26px] mb-3">🌿</p>
            <p className="text-[14px] text-stone-600 font-light">
              Nothing is due today — your whole deck is scheduled ahead. Come back tomorrow.
            </p>
          </div>
        )}

        {/* Active card */}
        {!finished && card && (
          <div className="bg-white border border-stone-100 rounded-2xl shadow-sm mt-6 overflow-hidden">
            <div className="px-7 pt-7 pb-2 text-center">
              <span className="inline-block text-[9px] font-medium tracking-[0.16em] uppercase px-2.5 py-1 rounded-full bg-[#3D5C3A]/8 text-[#3D5C3A] mb-5">
                {card.type}
              </span>
              <h2
                style={{ fontFamily: '"Cormorant Garamond",serif' }}
                className="text-[30px] sm:text-[34px] font-semibold text-stone-800 leading-tight mb-2"
              >
                {card.front}
              </h2>
              <p className="text-[12px] text-stone-400 font-light mb-6">{card.prompt}</p>

              {revealed && (
                <div className="border-t border-stone-100 pt-5 pb-4">
                  <p className="text-[15px] text-[#3D5C3A] font-medium leading-relaxed">
                    {card.back}
                  </p>
                  {card.detail && (
                    <p className="text-[11px] text-stone-400 font-light mt-1.5">{card.detail}</p>
                  )}
                </div>
              )}
            </div>

            <div className="px-7 pb-7">
              {!revealed ? (
                <button
                  onClick={() => setRevealed(true)}
                  className="w-full bg-[#3D5C3A] text-white py-3 rounded-xl text-[12.5px] font-medium tracking-wide hover:bg-[#2D4A2D] transition-colors cursor-pointer"
                >
                  Reveal answer
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => grade(false)}
                    className="py-3 rounded-xl border border-[#C9948E] bg-[#C9948E]/10 text-[#8B3A2A] text-[12.5px] font-medium hover:bg-[#C9948E]/20 transition-colors cursor-pointer"
                  >
                    ✗ Still learning
                  </button>
                  <button
                    onClick={() => grade(true)}
                    className="py-3 rounded-xl bg-[#3D5C3A] text-white text-[12.5px] font-medium hover:bg-[#2D4A2D] transition-colors cursor-pointer"
                  >
                    ✓ Knew it
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Completion */}
        {finished && (
          <div className="bg-white border border-stone-100 rounded-2xl p-8 text-center mt-6 shadow-sm">
            <p className="text-[30px] mb-3">{activeSession.correct === total ? '🌸' : '🌷'}</p>
            <h2
              style={{ fontFamily: '"Cormorant Garamond",serif' }}
              className="text-[28px] font-semibold text-stone-800 mb-1"
            >
              {activeSession.correct} of {total} today
            </h2>
            <p className="text-[12.5px] text-stone-500 font-light mb-6">
              {activeSession.correct === total
                ? 'Perfect session. The cards you knew will wait longer before returning.'
                : 'Cards you missed will come back tomorrow — that repetition is how they stick.'}
            </p>
            <StreakBadge streak={streak} today={today} />
            <p className="text-[11px] text-stone-400 font-light mt-4">
              Come back tomorrow for your next ten.
            </p>
          </div>
        )}

        {/* Deck stats */}
        {seen > 0 && (
          <div className="bg-white border border-stone-100 rounded-2xl p-5 mt-5">
            <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-stone-400 mb-3">
              Your deck · {seen} of {DECK.length} cards started
            </p>
            <div className="flex flex-col gap-1.5">
              {Array.from({ length: MAX_BOX }, (_, i) => i + 1).map((box) => (
                <div key={box} className="flex items-center gap-2.5">
                  <span className="text-[10px] text-stone-400 font-light w-20 flex-shrink-0">
                    {BOX_LABELS[box - 1]}
                  </span>
                  <div className="flex-1 bg-stone-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${(boxes[box] / Math.max(seen, 1)) * 100}%`,
                        background: box === MAX_BOX ? '#3D5C3A' : '#B8CEAE',
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-stone-400 font-light w-6 text-right">{boxes[box]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
