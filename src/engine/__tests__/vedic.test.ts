import { describe, expect, it } from 'vitest';
import {
  VEDIC_PLANETS,
  VEDIC_RELATIONSHIPS,
  moolank,
  bhagyank,
  planetFor,
  vedicRelationship,
  isVedicCompatible,
  calculateVedic,
} from '../vedic';

describe('moolank and bhagyank', () => {
  it('computes Moolank from the day of birth (1-9)', () => {
    expect(moolank('1987-11-23')).toBe(5);
    expect(moolank('2000-01-01')).toBe(1);
    expect(moolank('2000-01-28')).toBe(1);
  });

  it('computes Bhagyank from the full birth date (1-9)', () => {
    expect(bhagyank('1987-11-23')).toBe(5);
    expect(bhagyank('1990-05-14')).toBe(2);
  });
});

describe('planet mapping', () => {
  it('maps numbers to planets', () => {
    expect(planetFor(1)).toBe('Sun');
    expect(planetFor(2)).toBe('Moon');
    expect(planetFor(3)).toBe('Jupiter');
    expect(planetFor(4)).toBe('Rahu');
    expect(planetFor(5)).toBe('Mercury');
    expect(planetFor(6)).toBe('Venus');
    expect(planetFor(7)).toBe('Ketu');
    expect(planetFor(8)).toBe('Saturn');
    expect(planetFor(9)).toBe('Mars');
  });

  it('has a complete planet table', () => {
    expect(Object.keys(VEDIC_PLANETS)).toHaveLength(9);
  });
});

describe('relationship matrix', () => {
  it('classifies friend, enemy and neutral numbers', () => {
    expect(vedicRelationship(1, 2)).toBe('mitra');
    expect(vedicRelationship(1, 6)).toBe('shatru');
    expect(vedicRelationship(1, 5)).toBe('sama');
    expect(vedicRelationship(1, 1)).toBe('mitra');
  });

  it('is complete for every pair of numbers 1-9', () => {
    for (let a = 1; a <= 9; a += 1) {
      expect(VEDIC_RELATIONSHIPS[a]).toBeDefined();
      const { friends, enemies, neutral } = VEDIC_RELATIONSHIPS[a];
      for (let b = 1; b <= 9; b += 1) {
        const rel = vedicRelationship(a, b);
        expect(['mitra', 'shatru', 'sama']).toContain(rel);
        if (rel === 'mitra') expect(friends).toContain(b);
        if (rel === 'shatru') expect(enemies).toContain(b);
        if (rel === 'sama') expect(neutral).toContain(b);
      }
    }
  });

  it('computes compatibility flags', () => {
    expect(isVedicCompatible(1, 2)).toBe(true);
    expect(isVedicCompatible(1, 6)).toBe(false);
  });
});

describe('calculateVedic', () => {
  it('returns the full Vedic result', () => {
    const result = calculateVedic('1987-11-23');
    expect(result.moolank).toBe(5);
    expect(result.bhagyank).toBe(5);
    expect(result.moolankPlanet).toBe('Mercury');
    expect(result.bhagyankPlanet).toBe('Mercury');
    expect(result.driverConductor).toBe('mitra');
    expect(Object.keys(result.relationships)).toHaveLength(9);
  });
});
