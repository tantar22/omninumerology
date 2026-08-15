/**
 * Micro-Timing & Personal Cycles.
 *
 * Computes the Personal Year / Month / Day and a 24-hour Personal Hour Clock
 * mapping each hour to a numeric vibration, ruling planet and activity affinity.
 */
import { clamp, parseISODate, reduceNumber } from './types';
import { VEDIC_PLANETS } from './vedic';

/** Ruling planet for a number 1-9 (delegates to the Vedic mapping). */
export function hourPlanet(n: number): string {
  return VEDIC_PLANETS[reduceNumber(n, { keepMasters: false })] ?? 'Unknown';
}

/** Activity affinity for each vibration 1-9. */
export const NUMBER_ACTIVITY: Record<number, { title: string; affinity: string; keywords: string[] }> = {
  1: { title: 'Initiation', affinity: 'Start projects, assert leadership, act independently.', keywords: ['begin', 'lead', 'initiate'] },
  2: { title: 'Cooperation', affinity: 'Partner, negotiate, nurture relationships.', keywords: ['partner', 'listen', 'diplomacy'] },
  3: { title: 'Expression', affinity: 'Communicate, create, socialize, present.', keywords: ['speak', 'write', 'create'] },
  4: { title: 'Structure', affinity: 'Plan, organize, complete routine work.', keywords: ['organize', 'build', 'routine'] },
  5: { title: 'Change', affinity: 'Travel, adapt, network, seize opportunity.', keywords: ['travel', 'adapt', 'connect'] },
  6: { title: 'Harmony', affinity: 'Serve, care for home, resolve conflict.', keywords: ['care', 'heal', 'harmonize'] },
  7: { title: 'Introspection', affinity: 'Study, reflect, rest, analyze deeply.', keywords: ['reflect', 'study', 'rest'] },
  8: { title: 'Power', affinity: 'Make decisions, manage money, advance career.', keywords: ['decide', 'manage', 'advance'] },
  9: { title: 'Completion', affinity: 'Finish, forgive, release, give back.', keywords: ['finish', 'release', 'give'] },
};

/** Deterministic favorability weighting used for the hourly calendar score. */
export const NUMBER_FAVORABILITY: Record<number, number> = {
  1: 0.92, 2: 0.82, 3: 0.96, 4: 0.74, 5: 0.88, 6: 0.9, 7: 0.68, 8: 0.84, 9: 0.9,
};

/** The current Universal Year: the current year reduced to 1-9. */
export function universalYear(targetDate: string): number {
  const { year } = parseISODate(targetDate);
  return reduceNumber(year, { keepMasters: false });
}

/** Personal Year = birth month + birth day + current universal year (reduced 1-9). */
export function personalYear(birthDate: string, targetDate: string): number {
  const b = parseISODate(birthDate);
  const u = universalYear(targetDate);
  return reduceNumber(b.month + b.day + u, { keepMasters: false });
}

/** Personal Month = personal year + current calendar month (reduced 1-9). */
export function personalMonth(birthDate: string, targetDate: string): number {
  const t = parseISODate(targetDate);
  const py = personalYear(birthDate, targetDate);
  return reduceNumber(py + t.month, { keepMasters: false });
}

/** Personal Day = personal month + current calendar day (reduced 1-9). */
export function personalDay(birthDate: string, targetDate: string): number {
  const t = parseISODate(targetDate);
  const pm = personalMonth(birthDate, targetDate);
  return reduceNumber(pm + t.day, { keepMasters: false });
}

/** Personal Hour vibration = personal day + hour index (0-23) reduced 1-9. */
export function personalHour(birthDate: string, targetDate: string, hour: number): number {
  const pd = personalDay(birthDate, targetDate);
  return reduceNumber(pd + hour, { keepMasters: false });
}

export interface HourWindow {
  hour: number;
  label: string;
  number: number;
  planet: string;
  title: string;
  affinity: string;
  keywords: string[];
  score: number;
}

/** Format today's date as YYYY-MM-DD in local time. */
export function formatTodayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Compute the full 24-hour personal hour clock for a target date. */
export function personalHourClock(birthDate: string, targetDate: string): HourWindow[] {
  const py = personalYear(birthDate, targetDate);
  const pm = personalMonth(birthDate, targetDate);
  const pd = personalDay(birthDate, targetDate);
  const windows: HourWindow[] = [];

  for (let h = 0; h < 24; h += 1) {
    const num = personalHour(birthDate, targetDate, h);
    const activity = NUMBER_ACTIVITY[num];
    const fav =
      NUMBER_FAVORABILITY[py] *
      NUMBER_FAVORABILITY[pm] *
      NUMBER_FAVORABILITY[pd] *
      NUMBER_FAVORABILITY[num];
    const score = clamp(Math.round(fav * 100), 5, 100);
    windows.push({
      hour: h,
      label: `${String(h).padStart(2, '0')}:00`,
      number: num,
      planet: hourPlanet(num),
      title: activity.title,
      affinity: activity.affinity,
      keywords: activity.keywords,
      score,
    });
  }
  return windows;
}

export interface PersonalCycleResult {
  universalYear: number;
  personalYear: number;
  personalMonth: number;
  personalDay: number;
  hourClock: HourWindow[];
}

/** Aggregate the personal cycle summary plus the hourly schedule. */
export function calculateMicroTiming(birthDate: string, targetDate: string): PersonalCycleResult {
  return {
    universalYear: universalYear(targetDate),
    personalYear: personalYear(birthDate, targetDate),
    personalMonth: personalMonth(birthDate, targetDate),
    personalDay: personalDay(birthDate, targetDate),
    hourClock: personalHourClock(birthDate, targetDate),
  };
}
