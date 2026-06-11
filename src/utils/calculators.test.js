import { describe, it, expect } from 'vitest';
import { ARRANGEMENT_TYPES } from '../data/arrangementTypes';
import FLOWERS from '../data/flowers';
import { calcFromRatios, scaleByQty, stemCost } from './stemMath';
import {
  distributeStems,
  calcRecipe,
  calcCost,
  encodeRecipe,
  decodeRecipe,
} from './recipeMath';

describe('stem calculator — calcFromRatios', () => {
  it('role counts always sum to the requested total, for every type/size and 1–200 stems', () => {
    for (const type of ARRANGEMENT_TYPES) {
      for (let total = 1; total <= 200; total++) {
        const c = calcFromRatios(type.ratios, total);
        expect(c.focal + c.secondary + c.foliage + c.filler, `${type.id} @ ${total}`).toBe(total);
        expect(c.total).toBe(total);
      }
    }
  });

  it('never produces a negative role count with real arrangement ratios', () => {
    for (const type of ARRANGEMENT_TYPES) {
      for (let total = 1; total <= 200; total++) {
        const c = calcFromRatios(type.ratios, total);
        for (const role of ['focal', 'secondary', 'foliage', 'filler']) {
          expect(c[role], `${type.id} @ ${total} ${role}`).toBeGreaterThanOrEqual(0);
        }
      }
    }
  });

  it('clamps negative totals to zero', () => {
    const c = calcFromRatios(ARRANGEMENT_TYPES[0].ratios, -5);
    expect(c.total).toBe(0);
    expect(c.focal + c.secondary + c.foliage + c.filler).toBe(0);
  });
});

describe('stem calculator — scaling and pricing', () => {
  it('scaleByQty multiplies every role count', () => {
    expect(scaleByQty({ focal: 3, filler: 2 }, 4)).toEqual({ focal: 12, filler: 8 });
  });

  it('stemCost prices each role at its average and ignores unknown keys', () => {
    // AVG_PRICE: focal 1.6, secondary 0.9, foliage 0.95, filler 0.8
    expect(stemCost({ focal: 10, secondary: 0, foliage: 0, filler: 0 })).toBeCloseTo(16);
    expect(stemCost({ focal: 1, secondary: 1, foliage: 1, filler: 1 })).toBeCloseTo(4.25);
    expect(stemCost({})).toBe(0);
  });
});

describe('arrangement builder — distributeStems', () => {
  const flowers = FLOWERS.slice(0, 3);

  it('distributes the exact total across flowers, remainder to the front', () => {
    const out = distributeStems(flowers, 10);
    expect(out.reduce((s, x) => s + x.stems, 0)).toBe(10);
    expect(out.map((x) => x.stems)).toEqual([4, 3, 3]);
  });

  it('returns an empty list for no flowers', () => {
    expect(distributeStems([], 10)).toEqual([]);
  });
});

describe('arrangement builder — calcRecipe / calcCost', () => {
  const picks = {
    focal: FLOWERS.slice(0, 2),
    secondary: [],
    foliage: FLOWERS.slice(2, 3),
    filler: FLOWERS.slice(3, 4),
  };

  it('recipe stem counts sum to the size total when no secondary is picked', () => {
    for (const type of ARRANGEMENT_TYPES) {
      for (const size of Object.keys(type.sizes)) {
        const r = calcRecipe(type, size, picks);
        const sum = ['focal', 'secondary', 'foliage', 'filler']
          .flatMap((role) => r[role])
          .reduce((s, x) => s + x.stems, 0);
        expect(sum, `${type.id}/${size}`).toBe(type.sizes[size].stems);
        expect(r.secondary).toEqual([]);
      }
    }
  });

  it('cost is positive for a real recipe', () => {
    const type = ARRANGEMENT_TYPES[0];
    const size = Object.keys(type.sizes)[0];
    expect(calcCost(calcRecipe(type, size, picks))).toBeGreaterThan(0);
  });
});

describe('arrangement builder — share-link codec', () => {
  it('encode → decode round-trips name, type, size, and picks', () => {
    const recipe = {
      name: "Sarah's wedding — bridal",
      typeId: ARRANGEMENT_TYPES[0].id,
      size: Object.keys(ARRANGEMENT_TYPES[0].sizes)[0],
      picks: {
        focal: FLOWERS.slice(0, 2),
        secondary: [],
        foliage: FLOWERS.slice(2, 3),
        filler: FLOWERS.slice(3, 5),
      },
    };
    const decoded = decodeRecipe(encodeRecipe(recipe));
    expect(decoded.name).toBe(recipe.name);
    expect(decoded.typeId).toBe(recipe.typeId);
    expect(decoded.size).toBe(recipe.size);
    for (const role of ['focal', 'secondary', 'foliage', 'filler']) {
      expect(decoded.picks[role].map((f) => f.num)).toEqual(recipe.picks[role].map((f) => f.num));
    }
  });

  it('rejects garbage and unknown arrangement types instead of throwing', () => {
    expect(decodeRecipe('not-base64!!')).toBeNull();
    const bogus = encodeRecipe({
      name: '',
      typeId: 'no-such-type',
      size: 'medium',
      picks: { focal: [], secondary: [], foliage: [], filler: [] },
    });
    expect(decodeRecipe(bogus)).toBeNull();
  });

  it('drops unknown flower ids but keeps the rest', () => {
    const recipe = {
      name: '',
      typeId: ARRANGEMENT_TYPES[0].id,
      size: 'medium',
      picks: { focal: [{ num: 999999 }, FLOWERS[0]], secondary: [], foliage: [], filler: [] },
    };
    const decoded = decodeRecipe(encodeRecipe(recipe));
    expect(decoded.picks.focal.map((f) => f.num)).toEqual([FLOWERS[0].num]);
  });
});
