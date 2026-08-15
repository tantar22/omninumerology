/**
 * Chinese Lo Shu Magic Square.
 *
 * A fixed 3x3 magic square is used to tally the frequency of each digit (1-9)
 * appearing in a birth date. Eight "planes" (three rows, three columns and the
 * two diagonals) are then evaluated as active or missing.
 */
import { parseISODate, round } from './types';

/** The fixed Lo Shu magic square (each row/column/diagonal sums to 15). */
export const LO_SHU_GRID: number[][] = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

export type PlaneType = 'row' | 'column' | 'diagonal';

export interface Plane {
  id: string;
  name: string;
  type: PlaneType;
  /** The three numbers that define this plane, in reading order. */
  numbers: number[];
  /** Grid cells (row, col) participating in this plane. */
  cells: Array<[number, number]>;
}

/**
 * The eight planes. Three rows (Mental/Emotional/Practical), three columns
 * (Thought/Will/Action) and the two diagonals.
 *
 * NOTE on diagonals: the true diagonals of the standard Lo Shu grid above are
 * 4-5-6 (main) and 2-5-8 (anti). In the grid layout used here the middle column
 * is 9-5-1 and the middle row is 3-5-7; those correspond to the "Will" and
 * "Emotional" planes respectively. The diagonals are therefore 4-5-6 and 2-5-8.
 */
export const LO_SHU_PLANES: Plane[] = [
  { id: 'mental', name: 'Mental Plane', type: 'row', numbers: [4, 9, 2], cells: [[0, 0], [0, 1], [0, 2]] },
  { id: 'emotional', name: 'Emotional Plane', type: 'row', numbers: [3, 5, 7], cells: [[1, 0], [1, 1], [1, 2]] },
  { id: 'practical', name: 'Practical Plane', type: 'row', numbers: [8, 1, 6], cells: [[2, 0], [2, 1], [2, 2]] },
  { id: 'thought', name: 'Thought Plane', type: 'column', numbers: [4, 3, 8], cells: [[0, 0], [1, 0], [2, 0]] },
  { id: 'will', name: 'Will Plane', type: 'column', numbers: [9, 5, 1], cells: [[0, 1], [1, 1], [2, 1]] },
  { id: 'action', name: 'Action Plane', type: 'column', numbers: [2, 7, 6], cells: [[0, 2], [1, 2], [2, 2]] },
  { id: 'determination', name: 'Determination (Diagonal)', type: 'diagonal', numbers: [4, 5, 6], cells: [[0, 0], [1, 1], [2, 2]] },
  { id: 'spirituality', name: 'Spirituality (Diagonal)', type: 'diagonal', numbers: [2, 5, 8], cells: [[0, 2], [1, 1], [2, 0]] },
];

/** Position (row, col) of each number 1-9 inside the Lo Shu grid. */
export function loShuPosition(n: number): [number, number] {
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      if (LO_SHU_GRID[r][c] === n) return [r, c];
    }
  }
  return [-1, -1];
}

/** Extract the digits 1-9 from a birth date (0 is ignored by the Lo Shu system). */
export function birthDateDigits(birthDate: string): number[] {
  const { year, month, day } = parseISODate(birthDate);
  const raw = `${String(year).padStart(4, '0')}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
  return raw.split('').map(Number).filter((d) => d >= 1 && d <= 9);
}

/** Tally digit frequencies 1-9 from a birth date. */
export function digitFrequency(birthDate: string): Record<number, number> {
  const freq: Record<number, number> = {};
  for (let n = 1; n <= 9; n += 1) freq[n] = 0;
  for (const d of birthDateDigits(birthDate)) {
    freq[d] += 1;
  }
  return freq;
}

export interface LoShuCell {
  number: number;
  count: number;
  row: number;
  col: number;
}

export interface PlaneStatus {
  id: string;
  name: string;
  type: PlaneType;
  numbers: number[];
  active: boolean;
  missingCount: number;
  presentCount: number;
  /** Strength as a percentage (0-100) of the three cells being occupied. */
  strength: number;
}

export interface LoShuResult {
  grid: LoShuCell[][];
  frequency: Record<number, number>;
  planes: PlaneStatus[];
  missingNumbers: number[];
  presentNumbers: number[];
  missingPlanes: PlaneStatus[];
  activePlanes: PlaneStatus[];
  remedies: Record<number, string>;
  overallStrength: number;
}

/** Build the 3x3 count grid where each cell holds the frequency of its fixed number. */
export function buildLoShuGrid(birthDate: string): LoShuCell[][] {
  const freq = digitFrequency(birthDate);
  return LO_SHU_GRID.map((row, r) =>
    row.map((num, c) => ({ number: num, count: freq[num], row: r, col: c })),
  );
}

/** Whether a plane is fully active (all three cells have a non-zero count). */
export function isPlaneActive(birthDate: string, plane: Plane): boolean {
  const freq = digitFrequency(birthDate);
  return plane.numbers.every((n) => freq[n] > 0);
}

/** Strength (0-100) of a single plane: fraction of its cells occupied. */
export function planeStrength(birthDate: string, plane: Plane): number {
  const freq = digitFrequency(birthDate);
  const present = plane.numbers.filter((n) => freq[n] > 0).length;
  return round((present / plane.numbers.length) * 100);
}

/** Remedies for numbers missing from the Lo Shu grid. */
export const MISSING_NUMBER_REMEDIES: Record<number, string> = {
  1: 'Practice independence and self-direction; set clear personal goals.',
  2: 'Cultivate cooperation and empathy; nurture partnerships.',
  3: 'Engage creative and expressive outlets; write, speak, perform.',
  4: 'Build structure and routine; honor commitments and discipline.',
  5: 'Welcome change and flexibility; travel and broaden horizons.',
  6: 'Invest in home and service; foster harmony and caregiving.',
  7: 'Carve out quiet study and introspection; pursue knowledge.',
  8: 'Develop financial literacy and accountability; take initiative.',
  9: 'Practice compassion and completion; finish what you begin.',
};

/** Compute the full Lo Shu analysis for a birth date. */
export function calculateLoShu(birthDate: string): LoShuResult {
  return analyzeLoShuFrequency(digitFrequency(birthDate));
}

/** Merge several digit-frequency maps by summing each digit's counts. */
export function combineFrequencies(...freqs: Array<Record<number, number>>): Record<number, number> {
  const merged: Record<number, number> = {};
  for (let n = 1; n <= 9; n += 1) merged[n] = 0;
  for (const freq of freqs) {
    for (let n = 1; n <= 9; n += 1) {
      merged[n] += freq[n] ?? 0;
    }
  }
  return merged;
}

/** Analyze an already-computed frequency map (used for team aggregation). */
export function analyzeLoShuFrequency(freq: Record<number, number>): LoShuResult {
  const grid: LoShuCell[][] = LO_SHU_GRID.map((row, r) =>
    row.map((num, c) => ({ number: num, count: freq[num] ?? 0, row: r, col: c })),
  );

  const planes: PlaneStatus[] = LO_SHU_PLANES.map((plane) => {
    const presentCount = plane.numbers.filter((n) => (freq[n] ?? 0) > 0).length;
    const missingCount = plane.numbers.length - presentCount;
    return {
      id: plane.id,
      name: plane.name,
      type: plane.type,
      numbers: plane.numbers,
      active: presentCount === plane.numbers.length,
      presentCount,
      missingCount,
      strength: round((presentCount / plane.numbers.length) * 100),
    };
  });

  const presentNumbers: number[] = [];
  const missingNumbers: number[] = [];
  for (let n = 1; n <= 9; n += 1) {
    if ((freq[n] ?? 0) > 0) presentNumbers.push(n);
    else missingNumbers.push(n);
  }

  const remedies: Record<number, string> = {};
  for (const n of missingNumbers) {
    remedies[n] = MISSING_NUMBER_REMEDIES[n] ?? 'Balance this energy through mindful practice.';
  }

  const overallStrength = round(
    planes.reduce((acc, p) => acc + p.strength, 0) / planes.length,
  );

  return {
    grid,
    frequency: freq,
    planes,
    missingNumbers,
    presentNumbers,
    missingPlanes: planes.filter((p) => !p.active),
    activePlanes: planes.filter((p) => p.active),
    remedies,
    overallStrength,
  };
}
