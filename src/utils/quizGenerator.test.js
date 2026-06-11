import { describe, it, expect } from 'vitest';
import {
  generateQuiz,
  generateUnifiedQuiz,
  lengthsFor,
  CATEGORIES,
  QUIZ_LENGTHS,
} from './quizGenerator';

const RUNS = 25; // generators are random — hammer them to catch flaky invariants

function expectValidQuestion(q) {
  expect(q.question, 'question text').toBeTruthy();
  expect(q.options, 'options array').toBeInstanceOf(Array);
  expect(q.options.length).toBeGreaterThanOrEqual(2);
  expect(new Set(q.options).size, `duplicate options in: ${q.question}`).toBe(q.options.length);
  expect(q.options, `answer "${q.answer}" missing from options in: ${q.question}`).toContain(q.answer);
  expect(q.explanation, 'explanation').toBeTruthy();
  expect(q.category, 'category').toBeTruthy();
}

describe('generateQuiz', () => {
  it('returns the requested number of questions', () => {
    for (let i = 0; i < RUNS; i++) {
      expect(generateQuiz('all', 10)).toHaveLength(10);
    }
  });

  it('every question is well-formed and its answer is among the options', () => {
    for (let i = 0; i < RUNS; i++) {
      generateQuiz('all', 10).forEach(expectValidQuestion);
    }
  });

  it('never repeats a question within a quiz', () => {
    for (let i = 0; i < RUNS; i++) {
      const texts = generateQuiz('all', 10).map((q) => q.question);
      expect(new Set(texts).size).toBe(texts.length);
    }
  });

  for (const cat of CATEGORIES.filter((c) => c.id !== 'all')) {
    it(`category "${cat.id}" produces valid single-topic quizzes`, () => {
      for (let i = 0; i < RUNS; i++) {
        const quiz = generateQuiz(cat.id, 10);
        expect(quiz.length).toBeGreaterThan(0);
        quiz.forEach(expectValidQuestion);
      }
    });
  }
});

describe('generateUnifiedQuiz', () => {
  it('fills every offered topic/length combination exactly, with no repeated questions', () => {
    for (const cat of CATEGORIES) {
      for (const { value: len } of lengthsFor(cat.id)) {
        for (let i = 0; i < 5; i++) {
          const quiz = generateUnifiedQuiz(cat.id, len);
          expect(quiz, `${cat.id} @ ${len}`).toHaveLength(len);
          const texts = quiz.map((q) => q.question);
          expect(new Set(texts).size, `${cat.id} @ ${len} repeats`).toBe(len);
          quiz.forEach(expectValidQuestion);
        }
      }
    }
  });

  it('mixed 40-question quizzes blend both pools (deep-only categories appear)', () => {
    const deepOnly = ['Flower Meanings', 'Floristry Terminology', 'Sustainable Floristry', 'Cultural Knowledge', 'Wedding Floristry', 'Gifting & Occasions', 'Design Principles'];
    for (let i = 0; i < 5; i++) {
      const cats = new Set(generateUnifiedQuiz('all', 40).map((q) => q.category));
      expect(deepOnly.some((c) => cats.has(c)), `got: ${[...cats].join(', ')}`).toBe(true);
    }
  });
});

describe('lengthsFor', () => {
  it('every topic offers at least the quick length', () => {
    for (const cat of CATEGORIES) {
      const lengths = lengthsFor(cat.id).map((l) => l.value);
      expect(lengths).toContain(10);
    }
  });

  it('only offers lengths from the master list', () => {
    const valid = QUIZ_LENGTHS.map((l) => l.value);
    for (const cat of CATEGORIES) {
      for (const l of lengthsFor(cat.id)) expect(valid).toContain(l.value);
    }
  });
});
