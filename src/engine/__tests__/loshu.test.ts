import { describe, expect, it } from 'vitest';
import {
  LO_SHU_GRID,
  LO_SHU_PLANES,
  loShuPosition,
  birthDateDigits,
  digitFrequency,
  buildLoShuGrid,
  isPlaneActive,
  planeStrength,
  calculateLoShu,
  combineFrequencies,
  analyzeLoShuFrequency,
} from '../loshu';

describe('Lo Shu grid layout', () => {
  it('uses the fixed magic square', () => {
    expect(LO_SHU_GRID).toEqual([
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6],
    ]);
  });

  it('locates numbers in the grid', () => {
    expect(loShuPosition(4)).toEqual([0, 0]);
    expect(loShuPosition(5)).toEqual([1, 1]);
    expect(loShuPosition(6)).toEqual([2, 2]);
    expect(loShuPosition(99)).toEqual([-1, -1]);
  });

  it('defines exactly eight planes', () => {
    expect(LO_SHU_PLANES).toHaveLength(8);
  });
});

describe('digit extraction and frequency', () => {
  it('extracts only digits 1-9 from a birth date', () => {
    expect(birthDateDigits('1992-04-22')).toEqual([1, 9, 9, 2, 4, 2, 2]);
  });

  it('tallies frequencies', () => {
    const freq = digitFrequency('1992-04-22');
    expect(freq[1]).toBe(1);
    expect(freq[2]).toBe(3);
    expect(freq[4]).toBe(1);
    expect(freq[9]).toBe(2);
    expect(freq[5]).toBe(0);
  });

  it('builds the count grid', () => {
    const grid = buildLoShuGrid('1992-04-22');
    expect(grid[0][0]).toEqual({ number: 4, count: 1, row: 0, col: 0 });
    expect(grid[0][1]).toEqual({ number: 9, count: 2, row: 0, col: 1 });
    expect(grid[1][1]).toEqual({ number: 5, count: 0, row: 1, col: 1 });
  });
});

describe('plane evaluation', () => {
  it('detects active and inactive planes', () => {
    const mental = LO_SHU_PLANES.find((p) => p.id === 'mental')!;
    const determination = LO_SHU_PLANES.find((p) => p.id === 'determination')!;
    expect(isPlaneActive('1992-04-22', mental)).toBe(true);
    expect(isPlaneActive('1992-04-22', determination)).toBe(false);
  });

  it('computes plane strength percentages', () => {
    const mental = LO_SHU_PLANES.find((p) => p.id === 'mental')!;
    expect(planeStrength('1992-04-22', mental)).toBe(100);
    expect(planeStrength('1992-04-22', LO_SHU_PLANES.find((p) => p.id === 'determination')!)).toBe(33.33);
  });
});

describe('calculateLoShu', () => {
  const result = calculateLoShu('1992-04-22');

  it('reports present and missing numbers', () => {
    expect(result.presentNumbers.sort()).toEqual([1, 2, 4, 9]);
    expect(result.missingNumbers.sort()).toEqual([3, 5, 6, 7, 8]);
  });

  it('marks planes active/inactive', () => {
    const mental = result.planes.find((p) => p.id === 'mental')!;
    expect(mental.active).toBe(true);
    expect(mental.strength).toBe(100);
    expect(result.activePlanes.map((p) => p.id)).toContain('mental');
    expect(result.missingPlanes.map((p) => p.id)).not.toContain('mental');
  });

  it('provides remedies for every missing number', () => {
    for (const n of result.missingNumbers) {
      expect(result.remedies[n]).toBeTruthy();
    }
  });

  it('computes an overall strength between 0 and 100', () => {
    expect(result.overallStrength).toBeGreaterThanOrEqual(0);
    expect(result.overallStrength).toBeLessThanOrEqual(100);
  });
});

describe('frequency helpers', () => {
  it('merges frequency maps', () => {
    const a = digitFrequency('1992-04-22');
    const b = digitFrequency('2000-03-15');
    const merged = combineFrequencies(a, b);
    expect(merged[1]).toBe(a[1] + b[1]);
    expect(merged[5]).toBe(a[5] + b[5]);
  });

  it('analyzes an arbitrary frequency map', () => {
    const freq: Record<number, number> = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1 };
    const result = analyzeLoShuFrequency(freq);
    expect(result.missingNumbers).toHaveLength(0);
    expect(result.activePlanes).toHaveLength(8);
    expect(result.overallStrength).toBe(100);
  });
});
