/**
 * Core shared types and pure arithmetic primitives for the STNumerology engine.
 *
 * This module intentionally has ZERO external dependencies: every function is a
 * deterministic pure TypeScript computation over strings and numbers.
 */

export type MasterNumber = 11 | 22 | 33;

/** A numerology "system" identifier used throughout the engine and API. */
export type NumerologySystem =
  | 'pythagorean'
  | 'chaldean'
  | 'vedic'
  | 'loshu'
  | 'kabbalah';

/** Input required to run the unified calculation across all traditions. */
export interface NumerologicalInput {
  /** Full legal birth name (used for Expression / Soul Urge / Personality). */
  fullName: string;
  /** Optional current / preferred name. */
  currentName?: string;
  /** Birth date in ISO-8601 `YYYY-MM-DD` format. */
  birthDate: string;
  /** Optional birth time `HH:mm` (24h) for micro-timing refinement. */
  birthTime?: string;
  /** Optional birth city (recorded, not used in arithmetic). */
  birthCity?: string;
}

export interface DateParts {
  year: number;
  month: number;
  day: number;
}

/**
 * Reduce a non-negative integer to a single digit (1-9), optionally preserving
 * master numbers 11, 22 and 33 during the reduction chain.
 *
 * Example (keepMasters=true): 1999 -> 1+9+9+9=28 -> 2+8=10 -> 1+0=1
 * Example (keepMasters=true): 29  -> 2+9=11   -> 11 (master preserved)
 */
export function reduceNumber(n: number, options: { keepMasters?: boolean } = {}): number {
  const keepMasters = options.keepMasters ?? true;
  let value = Math.abs(Math.floor(n));
  if (value === 0) return 0;

  while (value > 9) {
    if (keepMasters && (value === 11 || value === 22 || value === 33)) {
      return value;
    }
    value = digitSum(value);
  }
  return value;
}

/** Sum the decimal digits of a non-negative integer. */
export function digitSum(n: number): number {
  const abs = Math.abs(Math.floor(n));
  let sum = 0;
  let rest = abs;
  while (rest > 0) {
    sum += rest % 10;
    rest = Math.floor(rest / 10);
  }
  return sum;
}

/** Whether an integer is a master number (11, 22 or 33). */
export function isMasterNumber(n: number): n is MasterNumber {
  return n === 11 || n === 22 || n === 33;
}

/** Strip everything but ASCII letters and uppercase the result. */
export function normalizeName(name: string): string {
  return name
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
}

/** True if the character is an ASCII letter A-Z. */
export function isLetter(ch: string): boolean {
  return /^[A-Z]$/.test(ch);
}

/** True if the character is a vowel (A, E, I, O, U). Y is treated as a consonant. */
export function isVowel(ch: string): boolean {
  return /^[AEIOU]$/.test(ch);
}

/** True if the character is a consonant A-Z (excluding vowels; Y counts as consonant). */
export function isConsonant(ch: string): boolean {
  return isLetter(ch) && !isVowel(ch);
}

const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Parse an ISO-8601 date string `YYYY-MM-DD` into integer parts without any
 * timezone ambiguity (no `Date` object is involved).
 *
 * @throws if the string is malformed or the date is not a real calendar day.
 */
export function parseISODate(iso: string): DateParts {
  const match = ISO_DATE_RE.exec(iso.trim());
  if (!match) {
    throw new Error(`Invalid date format "${iso}", expected YYYY-MM-DD`);
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)) {
    throw new Error(`Invalid calendar date "${iso}"`);
  }
  return { year, month, day };
}

/** Number of days in a given month of a given year (Gregorian). */
export function daysInMonth(year: number, month: number): number {
  const lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) return 29;
  return lengths[month - 1];
}

/** Gregorian leap-year test. */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** Clamp an integer into the inclusive range [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Compute the arithmetic mean of an array of numbers (0 for empty input). */
export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  const total = values.reduce((acc, v) => acc + v, 0);
  return total / values.length;
}

/** Round to a fixed number of decimal places. */
export function round(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
