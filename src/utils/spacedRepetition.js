import FLOWERS from "../data/flowers";
import MEANINGS from "../data/meanings";
import GLOSSARY from "../data/glossary";

/**
 * Leitner-box spaced repetition.
 *
 * Every card lives in a box 1–5. Answer correctly → up a box (reviewed less
 * often); get it wrong → back to box 1. Box intervals in days:
 */
export const BOX_INTERVALS = [1, 2, 4, 8, 16]; // box 1 → every day … box 5 → every 16 days
export const MAX_BOX = 5;
export const DAILY_GOAL = 10;

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** The full card pool, built from the app's existing study data. */
export function buildDeck() {
  const deck = [];
  FLOWERS.forEach((f) =>
    deck.push({
      id: `latin-${f.num}`,
      type: "Latin name",
      front: f.common,
      prompt: "What is the Latin (botanical) name?",
      back: f.latin,
      detail: f.family ? `Family: ${f.family}` : null,
    }),
  );
  MEANINGS.forEach((m) =>
    deck.push({
      id: `meaning-${m.id}`,
      type: "Flower meaning",
      front: m.flower,
      prompt: "What does this flower symbolise?",
      back: m.overall,
      detail: null,
    }),
  );
  GLOSSARY.forEach((g) =>
    deck.push({
      id: `gloss-${slug(g.term)}`,
      type: `Glossary · ${g.category}`,
      front: g.term,
      prompt: "Define this floristry term.",
      back: g.def,
      detail: null,
    }),
  );
  return deck;
}

/** Local-timezone YYYY-MM-DD key for "today". */
export function dayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Whole days between two YYYY-MM-DD keys (b - a). */
export function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

function isDue(state, todayKey) {
  const interval = BOX_INTERVALS[Math.min(state.box, MAX_BOX) - 1];
  return daysBetween(state.last, todayKey) >= interval;
}

const typeGroup = (card) => (card.type.startsWith('Glossary') ? 'Glossary' : card.type);

/**
 * Round-robin cards across their type groups (Latin names, meanings,
 * glossary) so a run of new cards is a mixture rather than one topic —
 * the deck is stored grouped by source, which would otherwise mean weeks
 * of Latin names before the first meaning card appears.
 */
export function interleaveByType(cards) {
  const groups = [];
  const byKey = new Map();
  for (const c of cards) {
    const k = typeGroup(c);
    if (!byKey.has(k)) {
      byKey.set(k, []);
      groups.push(byKey.get(k));
    }
    byKey.get(k).push(c);
  }
  const out = [];
  for (let round = 0; out.length < cards.length; round++) {
    for (const g of groups) {
      if (g[round]) out.push(g[round]);
    }
  }
  return out;
}

/**
 * Pick today's session: due cards first (weakest box first, most overdue
 * first), then unseen cards — mixed across topics — to fill up to the goal.
 */
export function selectDailyCards(deck, cardStates, todayKey, goal = DAILY_GOAL) {
  const due = deck
    .filter((c) => cardStates[c.id] && isDue(cardStates[c.id], todayKey))
    .sort((a, b) => {
      const sa = cardStates[a.id];
      const sb = cardStates[b.id];
      return (
        sa.box - sb.box ||
        daysBetween(sb.last, todayKey) - daysBetween(sa.last, todayKey)
      );
    });
  const fresh = interleaveByType(deck.filter((c) => !cardStates[c.id]));
  return [...due, ...fresh].slice(0, goal);
}

/** Grade a card. Unseen cards count as box 1. Returns the new states map. */
export function gradeCard(cardStates, id, correct, todayKey) {
  const prevBox = cardStates[id]?.box ?? 1;
  const box = correct ? Math.min(prevBox + 1, MAX_BOX) : 1;
  return { ...cardStates, [id]: { box, last: todayKey } };
}

/**
 * Update the daily streak after completing a session.
 * Same day twice → unchanged; consecutive day → +1; gap → reset to 1.
 */
export function updateStreak(streak, todayKey) {
  if (streak?.lastDay === todayKey) return streak;
  const consecutive = streak?.lastDay && daysBetween(streak.lastDay, todayKey) === 1;
  return { lastDay: todayKey, count: consecutive ? streak.count + 1 : 1 };
}

/** Box distribution { 1: n, … 5: n } for the stats footer. */
export function boxCounts(cardStates) {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  Object.values(cardStates).forEach((s) => {
    counts[Math.min(s.box, MAX_BOX)]++;
  });
  return counts;
}
