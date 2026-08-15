import { describe, expect, it } from 'vitest';
import {
  universalYear,
  personalYear,
  personalMonth,
  personalDay,
  personalHour,
  hourPlanet,
  NUMBER_ACTIVITY,
  NUMBER_FAVORABILITY,
  personalHourClock,
  calculateMicroTiming,
  formatTodayISO,
} from '../microtiming';

const BIRTH = '1987-11-23';
const TARGET = '2024-07-15';

describe('personal cycles', () => {
  it('computes the universal year', () => {
    expect(universalYear('2024-07-15')).toBe(8);
    expect(universalYear('2000-01-01')).toBe(2);
  });

  it('computes personal year', () => {
    expect(personalYear(BIRTH, TARGET)).toBe(6);
  });

  it('computes personal month', () => {
    expect(personalMonth(BIRTH, TARGET)).toBe(4);
  });

  it('computes personal day', () => {
    expect(personalDay(BIRTH, TARGET)).toBe(1);
  });

  it('computes personal hour vibrations', () => {
    expect(personalHour(BIRTH, TARGET, 3)).toBe(4);
    expect(personalHour(BIRTH, TARGET, 0)).toBe(1);
  });
});

describe('hour planet and activity', () => {
  it('maps numbers to planets', () => {
    expect(hourPlanet(1)).toBe('Sun');
    expect(hourPlanet(9)).toBe('Mars');
  });

  it('has activity data for 1-9', () => {
    expect(Object.keys(NUMBER_ACTIVITY)).toHaveLength(9);
    expect(NUMBER_ACTIVITY[1].title).toBe('Initiation');
    expect(Object.keys(NUMBER_FAVORABILITY)).toHaveLength(9);
  });
});

describe('personal hour clock', () => {
  const clock = personalHourClock(BIRTH, TARGET);

  it('generates 24 windows', () => {
    expect(clock).toHaveLength(24);
  });

  it('labels hours and attaches a vibration', () => {
    expect(clock[0]).toMatchObject({ hour: 0, label: '00:00', number: 1, planet: 'Sun' });
    expect(clock[23].label).toBe('23:00');
  });

  it('assigns scores within 5-100', () => {
    for (const w of clock) {
      expect(w.score).toBeGreaterThanOrEqual(5);
      expect(w.score).toBeLessThanOrEqual(100);
      expect(w.title).toBeTruthy();
      expect(w.keywords.length).toBeGreaterThan(0);
    }
  });

  it('cycles numbers 1-9 across windows', () => {
    const numbers = clock.map((w) => w.number);
    expect(new Set(numbers).size).toBe(9);
  });
});

describe('calculateMicroTiming', () => {
  it('aggregates the full cycle summary', () => {
    const result = calculateMicroTiming(BIRTH, TARGET);
    expect(result.universalYear).toBe(8);
    expect(result.personalYear).toBe(6);
    expect(result.personalMonth).toBe(4);
    expect(result.personalDay).toBe(1);
    expect(result.hourClock).toHaveLength(24);
  });
});

describe('formatTodayISO', () => {
  it('returns a valid ISO date', () => {
    const iso = formatTodayISO();
    expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
