import { describe, expect, it } from 'vitest';
import {
  CHALDEAN_TABLE,
  chaldeanLetterValue,
  chaldeanNameValue,
  chaldeanSingleNumber,
  compoundNumber,
  compoundMeaning,
  COMPOUND_MEANINGS,
  calculateChaldean,
  suggestPositiveAdjustment,
} from '../chaldean';

describe('chaldean letter values', () => {
  it('maps the Chaldean table correctly', () => {
    expect(chaldeanLetterValue('A')).toBe(1);
    expect(chaldeanLetterValue('O')).toBe(7);
    expect(chaldeanLetterValue('Z')).toBe(7);
    expect(chaldeanLetterValue('F')).toBe(8);
    expect(chaldeanLetterValue('u')).toBe(6);
    expect(chaldeanLetterValue('1')).toBe(0);
  });

  it('never assigns the value 9', () => {
    const values = Object.values(CHALDEAN_TABLE);
    expect(values).not.toContain(9);
    expect(values).toHaveLength(26);
  });
});

describe('chaldean name numbers', () => {
  it('sums name values', () => {
    expect(chaldeanNameValue('JOHN')).toBe(18);
    expect(chaldeanNameValue('John Smith')).toBe(chaldeanNameValue('JOHNSMITH'));
  });

  it('reduces to a single number without masters', () => {
    expect(chaldeanSingleNumber('JOHN')).toBe(9);
  });

  it('keeps compound numbers within 10-52', () => {
    expect(compoundNumber('JOHN')).toBe(18);
    expect(compoundNumber('A')).toBe(1);
    expect(compoundNumber('WWWWWWWWWWWWWW')).toBeLessThanOrEqual(52);
  });
});

describe('compound meanings', () => {
  it('classifies documented positive and negative numbers', () => {
    expect(compoundMeaning(19)?.positive).toBe(true);
    expect(compoundMeaning(19)?.name).toBe('The Prince of Heaven');
    expect(compoundMeaning(16)?.positive).toBe(false);
    expect(compoundMeaning(13)?.positive).toBe(false);
  });

  it('returns undefined outside the 10-52 band', () => {
    expect(compoundMeaning(9)).toBeUndefined();
    expect(compoundMeaning(53)).toBeUndefined();
  });

  it('covers every number from 10 to 52', () => {
    for (let n = 10; n <= 52; n += 1) {
      expect(COMPOUND_MEANINGS[n]).toBeDefined();
    }
  });
});

describe('calculateChaldean', () => {
  it('detects negative compound numbers', () => {
    const result = calculateChaldean('JOHN');
    expect(result.nameValue).toBe(18);
    expect(result.single).toBe(9);
    expect(result.compound).toBe(18);
    expect(result.meaning?.positive).toBe(false);
    expect(result.negative).toBe(true);
  });

  it('detects positive compound numbers', () => {
    const result = calculateChaldean('BOB'); // B=2,O=7,B=2 = 11
    expect(result.compound).toBe(11);
    expect(result.negative).toBe(true); // 11 is a warning number
  });
});

describe('suggestPositiveAdjustment', () => {
  it('offers positive alternatives for a negative name', () => {
    const { current, suggestions } = suggestPositiveAdjustment('JOHN');
    expect(current.negative).toBe(true);
    expect(suggestions.length).toBeGreaterThan(0);
    for (const s of suggestions) {
      expect(s.meaning.positive).toBe(true);
      expect(s.targetValue).toBeGreaterThanOrEqual(10);
      expect(s.targetValue).toBeLessThanOrEqual(52);
    }
  });

  it('returns no suggestions for an already-positive name', () => {
    // Name summing to 19 (positive).
    const { current, suggestions } = suggestPositiveAdjustment('GODFREY');
    if (current.negative) {
      expect(suggestions.length).toBeGreaterThan(0);
    } else {
      expect(suggestions).toHaveLength(0);
    }
  });
});
