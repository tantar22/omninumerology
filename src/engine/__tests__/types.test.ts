import { describe, expect, it } from 'vitest';
import {
  reduceNumber,
  digitSum,
  isMasterNumber,
  normalizeName,
  isVowel,
  isConsonant,
  parseISODate,
  isLeapYear,
  daysInMonth,
  clamp,
  mean,
  round,
} from '../types';

describe('reduceNumber', () => {
  it('reduces multi-digit numbers to a single digit', () => {
    expect(reduceNumber(1999)).toBe(1);
    expect(reduceNumber(44)).toBe(8);
    expect(reduceNumber(28)).toBe(1);
  });

  it('preserves master numbers 11, 22 and 33 by default', () => {
    expect(reduceNumber(11)).toBe(11);
    expect(reduceNumber(22)).toBe(22);
    expect(reduceNumber(33)).toBe(33);
    expect(reduceNumber(29)).toBe(11);
  });

  it('reduces master numbers when keepMasters is false', () => {
    expect(reduceNumber(11, { keepMasters: false })).toBe(2);
    expect(reduceNumber(22, { keepMasters: false })).toBe(4);
    expect(reduceNumber(33, { keepMasters: false })).toBe(6);
  });

  it('handles zero, negatives and floats', () => {
    expect(reduceNumber(0)).toBe(0);
    expect(reduceNumber(-44)).toBe(8);
    expect(reduceNumber(3.9)).toBe(3);
  });

  it('keeps single digits unchanged', () => {
    for (let n = 1; n <= 9; n += 1) {
      expect(reduceNumber(n)).toBe(n);
    }
  });
});

describe('digitSum', () => {
  it('sums decimal digits', () => {
    expect(digitSum(1234)).toBe(10);
    expect(digitSum(0)).toBe(0);
    expect(digitSum(1999)).toBe(28);
  });
});

describe('isMasterNumber', () => {
  it('recognizes 11, 22, 33 only', () => {
    expect(isMasterNumber(11)).toBe(true);
    expect(isMasterNumber(22)).toBe(true);
    expect(isMasterNumber(33)).toBe(true);
    expect(isMasterNumber(44)).toBe(false);
    expect(isMasterNumber(9)).toBe(false);
  });
});

describe('name utilities', () => {
  it('normalizes names to uppercase letters only', () => {
    expect(normalizeName('John Smith!')).toBe('JOHNSMITH');
    expect(normalizeName('  äéî 123 ')).toBe('');
  });

  it('classifies vowels and consonants', () => {
    expect(isVowel('A')).toBe(true);
    expect(isVowel('E')).toBe(true);
    expect(isVowel('Y')).toBe(false);
    expect(isConsonant('B')).toBe(true);
    expect(isConsonant('A')).toBe(false);
  });
});

describe('parseISODate', () => {
  it('parses valid dates', () => {
    expect(parseISODate('1987-11-23')).toEqual({ year: 1987, month: 11, day: 23 });
    expect(parseISODate('2024-02-29')).toEqual({ year: 2024, month: 2, day: 29 });
  });

  it('throws on malformed or invalid dates', () => {
    expect(() => parseISODate('1987/11/23')).toThrow();
    expect(() => parseISODate('1994-02-29')).toThrow();
    expect(() => parseISODate('2023-13-01')).toThrow();
    expect(() => parseISODate('2023-00-10')).toThrow();
    expect(() => parseISODate('')).toThrow();
  });
});

describe('calendar helpers', () => {
  it('detects leap years', () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(1900)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(2023)).toBe(false);
  });

  it('computes days in month', () => {
    expect(daysInMonth(2024, 2)).toBe(29);
    expect(daysInMonth(2023, 2)).toBe(28);
    expect(daysInMonth(2023, 4)).toBe(30);
    expect(daysInMonth(2023, 1)).toBe(31);
  });
});

describe('numeric helpers', () => {
  it('clamps values', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });

  it('computes mean', () => {
    expect(mean([1, 2, 3])).toBe(2);
    expect(mean([])).toBe(0);
  });

  it('rounds to decimals', () => {
    expect(round(3.14159, 2)).toBe(3.14);
    expect(round(3.14159)).toBe(3.14);
    expect(round(2.5, 0)).toBe(3);
  });
});
