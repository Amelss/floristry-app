import { describe, it, expect } from 'vitest';
import {
  buildDeck,
  dayKey,
  daysBetween,
  selectDailyCards,
  interleaveByType,
  gradeCard,
  updateStreak,
  boxCounts,
  BOX_INTERVALS,
  MAX_BOX,
  DAILY_GOAL,
} from './spacedRepetition';

const groupOf = (c) => (c.type.startsWith('Glossary') ? 'Glossary' : c.type);

describe('buildDeck', () => {
  const deck = buildDeck();

  it('builds a substantial deck from all three data sources', () => {
    expect(deck.length).toBeGreaterThan(100);
    expect(deck.some((c) => c.type === 'Latin name')).toBe(true);
    expect(deck.some((c) => c.type === 'Flower meaning')).toBe(true);
    expect(deck.some((c) => c.type.startsWith('Glossary'))).toBe(true);
  });

  it('every card has unique id, front, prompt, and back', () => {
    expect(new Set(deck.map((c) => c.id)).size).toBe(deck.length);
    for (const c of deck) {
      expect(c.front, c.id).toBeTruthy();
      expect(c.prompt, c.id).toBeTruthy();
      expect(c.back, c.id).toBeTruthy();
    }
  });
});

describe('date helpers', () => {
  it('dayKey formats local dates as YYYY-MM-DD', () => {
    expect(dayKey(new Date(2026, 5, 10))).toBe('2026-06-10');
  });
  it('daysBetween counts whole days', () => {
    expect(daysBetween('2026-06-01', '2026-06-10')).toBe(9);
    expect(daysBetween('2026-06-10', '2026-06-10')).toBe(0);
  });
});

describe('gradeCard', () => {
  it('moves an unseen card to box 2 when correct, box 1 when wrong', () => {
    expect(gradeCard({}, 'a', true, '2026-06-10').a).toEqual({ box: 2, last: '2026-06-10' });
    expect(gradeCard({}, 'a', false, '2026-06-10').a).toEqual({ box: 1, last: '2026-06-10' });
  });

  it('caps at box 5 and resets to 1 on any mistake', () => {
    const high = { a: { box: 5, last: '2026-06-01' } };
    expect(gradeCard(high, 'a', true, '2026-06-10').a.box).toBe(MAX_BOX);
    expect(gradeCard(high, 'a', false, '2026-06-10').a.box).toBe(1);
  });

  it('does not mutate the previous state', () => {
    const before = { a: { box: 2, last: '2026-06-01' } };
    gradeCard(before, 'a', true, '2026-06-10');
    expect(before.a.box).toBe(2);
  });
});

describe('selectDailyCards', () => {
  const deck = buildDeck();

  it('serves unseen cards up to the daily goal when nothing is due', () => {
    const cards = selectDailyCards(deck, {}, '2026-06-10');
    expect(cards).toHaveLength(DAILY_GOAL);
    expect(new Set(cards.map((c) => c.id)).size).toBe(DAILY_GOAL);
  });

  it('mixes all three card types when filling with new cards', () => {
    const cards = selectDailyCards(deck, {}, '2026-06-10');
    const groups = new Set(cards.map(groupOf));
    expect([...groups].sort()).toEqual(['Flower meaning', 'Glossary', 'Latin name']);
  });

  it('keeps mixing as the deck is worked through', () => {
    // Simulate having seen the first 60 cards (well past the flowers section)
    let states = {};
    selectDailyCards(deck, {}, '2026-06-10', 60).forEach((c) => {
      states = gradeCard(states, c.id, true, '2026-06-10');
    });
    const nextDay = selectDailyCards(deck, states, '2026-06-11');
    const fresh = nextDay.filter((c) => !states[c.id]);
    expect(new Set(fresh.map(groupOf)).size).toBeGreaterThan(1);
  });

  it('puts due cards before unseen ones, weakest box first', () => {
    const [a, b, c] = deck;
    const states = {
      [a.id]: { box: 3, last: '2026-06-01' }, // due (9 days > 4-day interval)
      [b.id]: { box: 1, last: '2026-06-09' }, // due (1 day >= 1-day interval)
      [c.id]: { box: 5, last: '2026-06-09' }, // NOT due (16-day interval)
    };
    const cards = selectDailyCards(deck, states, '2026-06-10');
    expect(cards[0].id).toBe(b.id); // box 1 before box 3
    expect(cards[1].id).toBe(a.id);
    expect(cards.map((x) => x.id)).not.toContain(c.id);
  });

  it('respects every box interval boundary', () => {
    const card = deck[0];
    for (let box = 1; box <= MAX_BOX; box++) {
      const interval = BOX_INTERVALS[box - 1];
      const justBefore = { [card.id]: { box, last: '2026-06-01' } };
      const onDay = (days) =>
        selectDailyCards([card], justBefore, dayKey(new Date(2026, 5, 1 + days)), 1)
          .some((c) => c.id === card.id);
      expect(onDay(interval - 1), `box ${box} due too early`).toBe(false);
      expect(onDay(interval), `box ${box} not due on its interval`).toBe(true);
    }
  });
});

describe('interleaveByType', () => {
  it('round-robins across groups and keeps every card exactly once', () => {
    const cards = [
      { id: 'a1', type: 'Latin name' },
      { id: 'a2', type: 'Latin name' },
      { id: 'a3', type: 'Latin name' },
      { id: 'b1', type: 'Flower meaning' },
      { id: 'g1', type: 'Glossary · Design' },
      { id: 'g2', type: 'Glossary · Care' },
    ];
    const out = interleaveByType(cards);
    expect(out.map((c) => c.id)).toEqual(['a1', 'b1', 'g1', 'a2', 'g2', 'a3']);
  });

  it('handles empty and single-group input', () => {
    expect(interleaveByType([])).toEqual([]);
    const single = [{ id: 'x', type: 'Latin name' }];
    expect(interleaveByType(single)).toEqual(single);
  });
});

describe('updateStreak', () => {
  it('starts at 1, increments on consecutive days, resets after a gap', () => {
    let s = updateStreak(null, '2026-06-10');
    expect(s.count).toBe(1);
    s = updateStreak(s, '2026-06-11');
    expect(s.count).toBe(2);
    s = updateStreak(s, '2026-06-11'); // same day again — unchanged
    expect(s.count).toBe(2);
    s = updateStreak(s, '2026-06-20'); // gap — reset
    expect(s.count).toBe(1);
  });
});

describe('boxCounts', () => {
  it('tallies cards per box', () => {
    expect(
      boxCounts({
        a: { box: 1 }, b: { box: 1 }, c: { box: 5 },
      }),
    ).toEqual({ 1: 2, 2: 0, 3: 0, 4: 0, 5: 1 });
  });
});
