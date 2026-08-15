import { describe, expect, it } from 'vitest';
import {
  ELEMENTS,
  numberCompatibility,
  computeSynastry,
  aggregateTeamLoShu,
  teamCompatibility,
} from '../synastry';

describe('numberCompatibility', () => {
  it('returns 100 for identical numbers', () => {
    expect(numberCompatibility(1, 1)).toBe(100);
    expect(numberCompatibility(5, 5)).toBe(100);
  });

  it('scores fire+air and earth+water favorably', () => {
    expect(numberCompatibility(1, 5)).toBe(73);
    expect(numberCompatibility(4, 6)).toBe(73);
  });

  it('scores fire+water unfavorably', () => {
    expect(numberCompatibility(1, 2)).toBe(40);
  });

  it('reduces master numbers before scoring', () => {
    expect(numberCompatibility(11, 2)).toBe(100);
  });

  it('always stays within 5-100', () => {
    for (let a = 1; a <= 9; a += 1) {
      for (let b = 1; b <= 9; b += 1) {
        const score = numberCompatibility(a, b);
        expect(score).toBeGreaterThanOrEqual(5);
        expect(score).toBeLessThanOrEqual(100);
      }
    }
  });

  it('covers all nine elements', () => {
    expect(Object.keys(ELEMENTS)).toHaveLength(9);
  });
});

describe('computeSynastry', () => {
  const a = { fullName: 'JOHN SMITH', birthDate: '1987-11-23' };
  const b = { fullName: 'JANE DOE', birthDate: '1990-05-14' };

  const result = computeSynastry(a, b);

  it('computes a weighted overall score', () => {
    expect(result.score).toBe(59.35);
  });

  it('reports per-factor compatibility', () => {
    expect(result.lifePathCompatibility).toBe(60);
    expect(result.expressionCompatibility).toBe(47);
    expect(result.soulUrgeCompatibility).toBe(73);
    expect(result.personalityCompatibility).toBe(40);
    expect(result.birthdayCompatibility).toBe(100);
  });

  it('surfaces strengths and challenges', () => {
    expect(result.strengths.length).toBeGreaterThan(0);
    expect(result.challenges.length).toBeGreaterThan(0);
  });

  it('produces a breakdown summing to the score', () => {
    const sum = result.breakdown.reduce((acc, item) => acc + item.score * item.weight, 0);
    expect(Number(sum.toFixed(2))).toBe(result.score);
  });
});

describe('team aggregation', () => {
  const members = [
    { fullName: 'JOHN SMITH', birthDate: '1987-11-23' },
    { fullName: 'JANE DOE', birthDate: '1990-05-14' },
    { fullName: 'ALEX RAY', birthDate: '2001-09-08' },
  ];

  it('aggregates Lo Shu frequencies across members', () => {
    const result = aggregateTeamLoShu(members);
    expect(result.memberCount).toBe(3);
    expect(result.combinedFrequency[1]).toBeGreaterThan(0);
    expect(result.missingCompetencies.length).toBeGreaterThanOrEqual(0);
  });

  it('rejects teams outside 2-20 members', () => {
    expect(() => aggregateTeamLoShu([members[0]])).toThrow();
    const tooMany = Array.from({ length: 21 }, () => members[0]);
    expect(() => aggregateTeamLoShu(tooMany)).toThrow();
  });

  it('computes mean team compatibility', () => {
    const score = teamCompatibility(members);
    expect(score).toBeGreaterThanOrEqual(5);
    expect(score).toBeLessThanOrEqual(100);
  });
});
