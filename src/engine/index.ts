/**
 * OmniNumerology calculation engine — unified entry point.
 *
 * `calculateUnifiedMatrix` runs every tradition deterministically over a single
 * input and returns one complete, serializable result object.
 */
import { NumerologicalInput, parseISODate, reduceNumber } from './types';
import { calculatePythagorean } from './pythagorean';
import { calculateChaldean } from './chaldean';
import { calculateVedic } from './vedic';
import { calculateLoShu } from './loshu';
import { calculateKabbalah } from './kabbalah';
import { calculateMicroTiming, formatTodayISO } from './microtiming';
import { computeSynastry } from './synastry';

export interface UnifiedMatrix {
  input: NumerologicalInput;
  targetDate: string;
  pythagorean: ReturnType<typeof calculatePythagorean>;
  chaldean: ReturnType<typeof calculateChaldean>;
  vedic: ReturnType<typeof calculateVedic>;
  loshu: ReturnType<typeof calculateLoShu>;
  kabbalah: ReturnType<typeof calculateKabbalah>;
  microtiming: ReturnType<typeof calculateMicroTiming>;
  rootRulers: {
    driver: number;
    conductor: number;
    lifePath: number;
    expression: number;
  };
}

/**
 * Validate and normalize the raw input before calculation.
 * @throws if `fullName` is empty or `birthDate` is not a valid ISO date.
 */
export function validateInput(input: NumerologicalInput): NumerologicalInput {
  if (!input.fullName || input.fullName.trim().length === 0) {
    throw new Error('fullName is required');
  }
  parseISODate(input.birthDate);
  return {
    fullName: input.fullName.trim(),
    currentName: input.currentName?.trim() || undefined,
    birthDate: input.birthDate.trim(),
    birthTime: input.birthTime?.trim() || undefined,
    birthCity: input.birthCity?.trim() || undefined,
  };
}

/**
 * Run the complete unified calculation. `targetDate` defaults to today and is
 * used only for the micro-timing cycles.
 */
export function calculateUnifiedMatrix(input: NumerologicalInput, targetDate?: string): UnifiedMatrix {
  const clean = validateInput(input);
  const target = targetDate ?? formatTodayISO();
  parseISODate(target);

  const pythagorean = calculatePythagorean({ fullName: clean.fullName, birthDate: clean.birthDate });
  const chaldean = calculateChaldean(clean.fullName);
  const vedic = calculateVedic(clean.birthDate);
  const loshu = calculateLoShu(clean.birthDate);
  const kabbalah = calculateKabbalah(clean.fullName);
  const microtiming = calculateMicroTiming(clean.birthDate, target);

  return {
    input: clean,
    targetDate: target,
    pythagorean,
    chaldean,
    vedic,
    loshu,
    kabbalah,
    microtiming,
    rootRulers: {
      driver: vedic.moolank,
      conductor: vedic.bhagyank,
      lifePath: pythagorean.lifePath,
      expression: pythagorean.expression,
    },
  };
}

export {
  parseISODate,
  reduceNumber,
  calculatePythagorean,
  calculateChaldean,
  calculateVedic,
  calculateLoShu,
  calculateKabbalah,
  calculateMicroTiming,
  computeSynastry,
};

export type { NumerologicalInput };
