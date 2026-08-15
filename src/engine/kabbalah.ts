/**
 * Kabbalah Numerology (Western Hermetic Kabbalah mapping).
 *
 * Uses a positional letter table (1-9, then 10, 20, ... 800) and maps the
 * reduced name number to one of the ten Sephirah of the Tree of Life.
 */
import { isLetter, normalizeName, reduceNumber } from './types';

/** Western Kabbalah letter-to-number table. */
export const KABBALAH_TABLE: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 10, K: 20, L: 30, M: 40, N: 50, O: 60, P: 70, Q: 80, R: 90,
  S: 100, T: 200, U: 300, V: 400, W: 500, X: 600, Y: 700, Z: 800,
};

/** The ten Sephirah of the Tree of Life, indexed by their number 1-10. */
export const SEPHIROT: Record<number, { name: string; hebrew: string; meaning: string }> = {
  1: { name: 'Kether', hebrew: 'Keter', meaning: 'The Crown — pure unity and will' },
  2: { name: 'Chokhmah', hebrew: 'Chokhmah', meaning: 'Wisdom — creative force' },
  3: { name: 'Binah', hebrew: 'Binah', meaning: 'Understanding — form and structure' },
  4: { name: 'Chesed', hebrew: 'Chesed', meaning: 'Mercy — expansive love' },
  5: { name: 'Geburah', hebrew: 'Gevurah', meaning: 'Severity — discipline and strength' },
  6: { name: 'Tiphareth', hebrew: 'Tiferet', meaning: 'Beauty — harmony and balance' },
  7: { name: 'Netzach', hebrew: 'Netzach', meaning: 'Eternity — endurance and desire' },
  8: { name: 'Hod', hebrew: 'Hod', meaning: 'Splendor — intellect and honesty' },
  9: { name: 'Yesod', hebrew: 'Yesod', meaning: 'Foundation — the bridge to manifestation' },
  10: { name: 'Malkuth', hebrew: 'Malkuth', meaning: 'The Kingdom — physical realization' },
};

/** Numeric value of a single uppercase letter in the Kabbalah system. */
export function kabbalahLetterValue(ch: string): number {
  const upper = ch.toUpperCase();
  if (!isLetter(upper)) return 0;
  return KABBALAH_TABLE[upper];
}

/** Sum of all letter values in a name (unreduced). */
export function kabbalahNameValue(name: string): number {
  return normalizeName(name)
    .split('')
    .reduce((acc, ch) => acc + kabbalahLetterValue(ch), 0);
}

/** The reduced Kabbalah name number (1-9; master numbers are not used here). */
export function kabbalahNameNumber(name: string): number {
  return reduceNumber(kabbalahNameValue(name), { keepMasters: false });
}

/** The Sephirah associated with a reduced number 1-9 (10 maps to 1). */
export function sephiraFor(n: number): { name: string; hebrew: string; meaning: string } {
  let s = reduceNumber(n, { keepMasters: false });
  if (s === 0) s = 1;
  return SEPHIROT[s] ?? SEPHIROT[1];
}

export interface KabbalahResult {
  nameValue: number;
  number: number;
  sephira: { name: string; hebrew: string; meaning: string };
}

export function calculateKabbalah(name: string): KabbalahResult {
  const nameValue = kabbalahNameValue(name);
  const number = kabbalahNameNumber(name);
  return { nameValue, number, sephira: sephiraFor(number) };
}
