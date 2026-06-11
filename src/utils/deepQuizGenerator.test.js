import { describe, it, expect } from 'vitest';
import { generateDeepQuiz, DEEP_QUIZ_LENGTH, DEEP_CATEGORY_COLOURS } from './deepQuizGenerator';

const RUNS = 15;

describe('generateDeepQuiz', () => {
  it(`returns exactly ${DEEP_QUIZ_LENGTH} questions`, () => {
    for (let i = 0; i < RUNS; i++) {
      expect(generateDeepQuiz()).toHaveLength(DEEP_QUIZ_LENGTH);
    }
  });

  it('every question is well-formed and its answer is among the options', () => {
    for (let i = 0; i < RUNS; i++) {
      for (const q of generateDeepQuiz()) {
        expect(q.question).toBeTruthy();
        expect(new Set(q.options).size, `duplicate options in: ${q.question}`).toBe(q.options.length);
        expect(q.options, `answer missing from options in: ${q.question}`).toContain(q.answer);
        expect(q.explanation).toBeTruthy();
      }
    }
  });

  it('never repeats a question within a quiz', () => {
    for (let i = 0; i < RUNS; i++) {
      const texts = generateDeepQuiz().map((q) => q.question);
      expect(new Set(texts).size).toBe(texts.length);
    }
  });

  it('every question category has a display colour', () => {
    for (let i = 0; i < 5; i++) {
      for (const q of generateDeepQuiz()) {
        expect(
          DEEP_CATEGORY_COLOURS[q.category],
          `no colour for category "${q.category}"`,
        ).toBeTruthy();
      }
    }
  });
});
