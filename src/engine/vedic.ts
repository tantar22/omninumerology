/**
 * Vedic (Sankhya Shastra) Numerology.
 *
 * Reduces to single digits 1-9 (no master-number preservation) and maps each
 * number to its ruling planet. The Mitra (friend) / Shatru (enemy) / Sama
 * (neutral) matrix is derived from classical planetary friendships.
 */
import { digitSum, parseISODate, reduceNumber } from './types';

/** Number -> ruling planet in Vedic Sankhya Shastra. */
export const VEDIC_PLANETS: Record<number, string> = {
  1: 'Sun',
  2: 'Moon',
  3: 'Jupiter',
  4: 'Rahu',
  5: 'Mercury',
  6: 'Venus',
  7: 'Ketu',
  8: 'Saturn',
  9: 'Mars',
};

export type VedicRelation = 'mitra' | 'shatru' | 'sama';

/**
 * Complete friendship matrix. Each entry lists the numbers that are friends,
 * enemies and neutral relative to the key number (self is always a friend).
 */
export const VEDIC_RELATIONSHIPS: Record<number, { friends: number[]; enemies: number[]; neutral: number[] }> = {
  1: { friends: [1, 2, 3, 9], enemies: [6, 8], neutral: [4, 5, 7] },
  2: { friends: [1, 2, 5], enemies: [], neutral: [3, 4, 6, 7, 8, 9] },
  3: { friends: [1, 2, 3, 9], enemies: [5, 6], neutral: [4, 7, 8] },
  4: { friends: [4, 5, 6, 8], enemies: [1, 2, 9], neutral: [3, 7] },
  5: { friends: [1, 5, 6], enemies: [2], neutral: [3, 4, 7, 8, 9] },
  6: { friends: [5, 6, 8], enemies: [1, 2], neutral: [3, 4, 7, 9] },
  7: { friends: [3, 7, 9], enemies: [1, 2, 5], neutral: [4, 6, 8] },
  8: { friends: [5, 6, 8], enemies: [1, 2, 9], neutral: [3, 4, 7] },
  9: { friends: [1, 2, 3, 9], enemies: [5], neutral: [4, 6, 7, 8] },
};

/** Moolank (Psychic / Driver number): day of birth reduced to 1-9. */
export function moolank(birthDate: string): number {
  const { day } = parseISODate(birthDate);
  return reduceNumber(day, { keepMasters: false });
}

/** Bhagyank (Destiny / Conductor number): full birth date reduced to 1-9. */
export function bhagyank(birthDate: string): number {
  const { year, month, day } = parseISODate(birthDate);
  const total = digitSum(year) + digitSum(month) + digitSum(day);
  return reduceNumber(total, { keepMasters: false });
}

/** The ruling planet for a number 1-9. */
export function planetFor(n: number): string {
  const reduced = reduceNumber(n, { keepMasters: false });
  return VEDIC_PLANETS[reduced] ?? 'Unknown';
}

/** Classify `other` relative to `subject` as mitra (friend), shatru (enemy) or sama (neutral). */
export function vedicRelationship(subject: number, other: number): VedicRelation {
  const s = reduceNumber(subject, { keepMasters: false });
  const o = reduceNumber(other, { keepMasters: false });
  const rel = VEDIC_RELATIONSHIPS[s];
  if (!rel) return 'sama';
  if (rel.friends.includes(o)) return 'mitra';
  if (rel.enemies.includes(o)) return 'shatru';
  return 'sama';
}

/** Whether two numbers are compatible in the Vedic sense (friends, not enemies). */
export function isVedicCompatible(a: number, b: number): boolean {
  return vedicRelationship(a, b) !== 'shatru';
}

export interface VedicResult {
  moolank: number;
  bhagyank: number;
  moolankPlanet: string;
  bhagyankPlanet: string;
  driverConductor: VedicRelation;
  relationships: Record<number, VedicRelation>;
}

export function calculateVedic(birthDate: string): VedicResult {
  const m = moolank(birthDate);
  const b = bhagyank(birthDate);
  const relationships = {} as Record<number, VedicRelation>;
  for (let n = 1; n <= 9; n += 1) {
    relationships[n] = vedicRelationship(m, n);
  }
  return {
    moolank: m,
    bhagyank: b,
    moolankPlanet: planetFor(m),
    bhagyankPlanet: planetFor(b),
    driverConductor: vedicRelationship(m, b),
    relationships,
  };
}
