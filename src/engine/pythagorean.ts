/**
 * Pythagorean (Modern Western) Numerology.
 *
 * The Pythagorean system assigns letters the values 1-9 cyclically and reduces
 * every name/date sum to a single digit while preserving master numbers 11/22/33.
 */
import {
  NumerologicalInput,
  digitSum,
  isConsonant,
  isLetter,
  isMasterNumber,
  isVowel,
  normalizeName,
  parseISODate,
  reduceNumber,
} from './types';

/** Pythagorean letter grid (A=1 .. I=9, J=1 .. R=9, S=1 .. Z=8). */
export const PYTHAGOREAN_TABLE: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

/** Numeric value of a single uppercase letter in the Pythagorean system. */
export function pythagoreanLetterValue(ch: string): number {
  const upper = ch.toUpperCase();
  if (!isLetter(upper)) return 0;
  return PYTHAGOREAN_TABLE[upper];
}

/** Sum of all letter values in a name (unreduced). */
export function pythagoreanNameValue(name: string): number {
  return normalizeName(name)
    .split('')
    .reduce((acc, ch) => acc + pythagoreanLetterValue(ch), 0);
}

/** Sum of vowel values in a name (unreduced). */
export function pythagoreanVowelValue(name: string): number {
  return normalizeName(name)
    .split('')
    .filter(isVowel)
    .reduce((acc, ch) => acc + pythagoreanLetterValue(ch), 0);
}

/** Sum of consonant values in a name (unreduced). */
export function pythagoreanConsonantValue(name: string): number {
  return normalizeName(name)
    .split('')
    .filter(isConsonant)
    .reduce((acc, ch) => acc + pythagoreanLetterValue(ch), 0);
}

/** Expression / Destiny number: full birth name reduced (masters preserved). */
export function expressionNumber(name: string): number {
  return reduceNumber(pythagoreanNameValue(name));
}

/** Soul Urge / Heart's Desire number: vowels reduced (masters preserved). */
export function soulUrgeNumber(name: string): number {
  return reduceNumber(pythagoreanVowelValue(name));
}

/** Personality number: consonants reduced (masters preserved). */
export function personalityNumber(name: string): number {
  return reduceNumber(pythagoreanConsonantValue(name));
}

/** Life Path number: full birth date reduced (masters preserved). */
export function lifePathNumber(birthDate: string): number {
  const { year, month, day } = parseISODate(birthDate);
  const total = digitSum(year) + digitSum(month) + digitSum(day);
  return reduceNumber(total);
}

/** Birthday number: day of the month reduced (masters preserved). */
export function birthdayNumber(birthDate: string): number {
  const { day } = parseISODate(birthDate);
  return reduceNumber(day);
}

/** Attainment / Achievement number: the day alone (unreduced, e.g. 11 stays 11). */
export function attainmentNumber(birthDate: string): number {
  const { day } = parseISODate(birthDate);
  return day;
}

/** Maturity number: Life Path + Expression reduced (masters preserved). */
export function maturityNumber(lifePath: number, expression: number): number {
  return reduceNumber(lifePath + expression);
}

/**
 * The four Pinnacle cycles, each covering roughly 9-year blocks. All values are
 * reduced with master numbers preserved.
 */
export function pinnacleCycles(birthDate: string): {
  first: number;
  second: number;
  third: number;
  fourth: number;
} {
  const { year, month, day } = parseISODate(birthDate);
  const first = reduceNumber(month + day);
  const second = reduceNumber(day + year);
  const third = reduceNumber(first + second);
  const fourth = reduceNumber(month + year);
  return { first, second, third, fourth };
}

/** Ages at which each Pinnacle cycle transitions (boundaries are inclusive of the second value). */
export function pinnacleAges(lifePath: number): { firstEnd: number; secondEnd: number; thirdEnd: number } {
  const firstEnd = 36 - lifePath;
  const secondEnd = firstEnd + 9;
  const thirdEnd = secondEnd + 9;
  return { firstEnd, secondEnd, thirdEnd };
}

/**
 * The four Challenge numbers (reduced, master numbers preserved). Challenges are
 * derived from the absolute differences between date components.
 */
export function challengeNumbers(birthDate: string): {
  first: number;
  second: number;
  third: number;
  fourth: number;
} {
  const { year, month, day } = parseISODate(birthDate);
  const m = reduceNumber(month, { keepMasters: false });
  const d = reduceNumber(day, { keepMasters: false });
  const y = reduceNumber(year, { keepMasters: false });
  const first = Math.abs(m - d);
  const second = Math.abs(d - y);
  const third = Math.abs(first - second);
  const fourth = Math.abs(m - y);
  return { first, second, third, fourth };
}

export interface PythagoreanResult {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  birthday: number;
  attainment: number;
  maturity: number;
  nameValue: number;
  vowelValue: number;
  consonantValue: number;
  pinnacles: { first: number; second: number; third: number; fourth: number };
  pinnacleAges: { firstEnd: number; secondEnd: number; thirdEnd: number };
  challenges: { first: number; second: number; third: number; fourth: number };
}

/** Compute the complete Pythagorean core-five plus Pinnacle/Challenge bands. */
export function calculatePythagorean(input: Pick<NumerologicalInput, 'fullName' | 'birthDate'>): PythagoreanResult {
  const { fullName, birthDate } = input;
  const lifePath = lifePathNumber(birthDate);
  const expression = expressionNumber(fullName);
  const soulUrge = soulUrgeNumber(fullName);
  const personality = personalityNumber(fullName);

  return {
    lifePath,
    expression,
    soulUrge,
    personality,
    birthday: birthdayNumber(birthDate),
    attainment: attainmentNumber(birthDate),
    maturity: maturityNumber(lifePath, expression),
    nameValue: pythagoreanNameValue(fullName),
    vowelValue: pythagoreanVowelValue(fullName),
    consonantValue: pythagoreanConsonantValue(fullName),
    pinnacles: pinnacleCycles(birthDate),
    pinnacleAges: pinnacleAges(lifePath),
    challenges: challengeNumbers(birthDate),
  };
}

/** Human-readable descriptions of the core five and master-number nuance. */
export function pythagoreanCoreFiveLabels(result: PythagoreanResult): Record<string, string> {
  const describe = (n: number, base: string): string =>
    isMasterNumber(n) ? `${base} (master number ${n})` : base;

  return {
    lifePath: describe(result.lifePath, 'Life Path'),
    expression: describe(result.expression, 'Expression / Destiny'),
    soulUrge: describe(result.soulUrge, 'Soul Urge / Heart\'s Desire'),
    personality: describe(result.personality, 'Personality'),
    birthday: describe(result.birthday, 'Birthday'),
  };
}
