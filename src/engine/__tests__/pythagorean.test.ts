import { describe, expect, it } from 'vitest';
import {
  PYTHAGOREAN_TABLE,
  pythagoreanLetterValue,
  pythagoreanNameValue,
  pythagoreanVowelValue,
  pythagoreanConsonantValue,
  expressionNumber,
  soulUrgeNumber,
  personalityNumber,
  lifePathNumber,
  birthdayNumber,
  attainmentNumber,
  maturityNumber,
  pinnacleCycles,
  pinnacleAges,
  challengeNumbers,
  calculatePythagorean,
  pythagoreanCoreFiveLabels,
} from '../pythagorean';

describe('pythagorean letter values', () => {
  it('maps the cyclic 1-9 grid correctly', () => {
    expect(pythagoreanLetterValue('A')).toBe(1);
    expect(pythagoreanLetterValue('I')).toBe(9);
    expect(pythagoreanLetterValue('J')).toBe(1);
    expect(pythagoreanLetterValue('R')).toBe(9);
    expect(pythagoreanLetterValue('S')).toBe(1);
    expect(pythagoreanLetterValue('Z')).toBe(8);
    expect(pythagoreanLetterValue('a')).toBe(1);
    expect(pythagoreanLetterValue('5')).toBe(0);
    expect(pythagoreanLetterValue('-')).toBe(0);
  });

  it('has exactly 26 entries', () => {
    expect(Object.keys(PYTHAGOREAN_TABLE)).toHaveLength(26);
  });
});

describe('pythagorean name sums', () => {
  it('sums name values', () => {
    expect(pythagoreanNameValue('JOHN SMITH')).toBe(44);
    expect(pythagoreanVowelValue('JOHN SMITH')).toBe(15);
    expect(pythagoreanConsonantValue('JOHN SMITH')).toBe(29);
  });

  it('derives core name numbers', () => {
    expect(expressionNumber('JOHN SMITH')).toBe(8);
    expect(soulUrgeNumber('JOHN SMITH')).toBe(6);
    expect(personalityNumber('JOHN SMITH')).toBe(11);
  });
});

describe('pythagorean date numbers', () => {
  it('computes life path and birthday numbers', () => {
    expect(lifePathNumber('1987-11-23')).toBe(5);
    expect(birthdayNumber('1987-11-23')).toBe(5);
    expect(attainmentNumber('1987-11-23')).toBe(23);
  });

  it('preserves master life paths', () => {
    expect(lifePathNumber('1990-05-14')).toBe(11);
  });

  it('computes maturity number', () => {
    expect(maturityNumber(5, 8)).toBe(4);
    expect(maturityNumber(11, 22)).toBe(33);
  });
});

describe('pinnacles and challenges', () => {
  it('computes the four pinnacle cycles', () => {
    expect(pinnacleCycles('1987-11-23')).toEqual({
      first: 7,
      second: 3,
      third: 1,
      fourth: 9,
    });
  });

  it('computes pinnacle transition ages', () => {
    expect(pinnacleAges(5)).toEqual({ firstEnd: 31, secondEnd: 40, thirdEnd: 49 });
  });

  it('computes the four challenge numbers', () => {
    expect(challengeNumbers('1987-11-23')).toEqual({
      first: 3,
      second: 2,
      third: 1,
      fourth: 5,
    });
  });
});

describe('calculatePythagorean', () => {
  const result = calculatePythagorean({ fullName: 'JOHN SMITH', birthDate: '1987-11-23' });

  it('returns the complete core-five result', () => {
    expect(result.lifePath).toBe(5);
    expect(result.expression).toBe(8);
    expect(result.soulUrge).toBe(6);
    expect(result.personality).toBe(11);
    expect(result.birthday).toBe(5);
    expect(result.maturity).toBe(4);
  });

  it('includes pinnacle and challenge bands', () => {
    expect(result.pinnacles.first).toBe(7);
    expect(result.challenges.first).toBe(3);
    expect(result.pinnacleAges.firstEnd).toBe(31);
  });

  it('produces human-readable labels', () => {
    const labels = pythagoreanCoreFiveLabels(result);
    expect(labels.lifePath).toBe('Life Path');
    expect(labels.personality).toContain('master number 11');
  });
});
