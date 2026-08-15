import { describe, expect, it } from 'vitest';
import { calculateUnifiedMatrix, validateInput } from '../index';

const INPUT = {
  fullName: 'JOHN SMITH',
  currentName: 'JOHNNY',
  birthDate: '1987-11-23',
  birthTime: '14:30',
  birthCity: 'London',
};

describe('validateInput', () => {
  it('normalizes input fields', () => {
    const clean = validateInput({
      fullName: '  John Smith  ',
      birthDate: ' 1987-11-23 ',
    });
    expect(clean.fullName).toBe('John Smith');
    expect(clean.birthDate).toBe('1987-11-23');
    expect(clean.currentName).toBeUndefined();
  });

  it('throws when fullName is missing', () => {
    expect(() => validateInput({ fullName: '   ', birthDate: '1987-11-23' })).toThrow();
  });

  it('throws when birthDate is invalid', () => {
    expect(() => validateInput({ fullName: 'John', birthDate: 'nope' })).toThrow();
  });
});

describe('calculateUnifiedMatrix', () => {
  it('runs every tradition deterministically', () => {
    const matrix = calculateUnifiedMatrix(INPUT, '2024-07-15');
    expect(matrix.pythagorean.lifePath).toBe(5);
    expect(matrix.chaldean.single).toBeDefined();
    expect(matrix.vedic.moolank).toBe(5);
    expect(matrix.loshu.grid).toHaveLength(3);
    expect(matrix.kabbalah.number).toBeDefined();
    expect(matrix.microtiming.hourClock).toHaveLength(24);
  });

  it('exposes root rulers', () => {
    const matrix = calculateUnifiedMatrix(INPUT, '2024-07-15');
    expect(matrix.rootRulers.driver).toBe(5);
    expect(matrix.rootRulers.lifePath).toBe(5);
  });

  it('is deterministic across calls', () => {
    const first = calculateUnifiedMatrix(INPUT, '2024-07-15');
    const second = calculateUnifiedMatrix(INPUT, '2024-07-15');
    expect(second).toEqual(first);
  });
});
