/**
 * Synastry (relationship & team compatibility).
 *
 * Pair compatibility is computed from classical element affinities of the core
 * Pythagorean numbers. Team analysis aggregates the Lo Shu frequency grids of
 * every member to surface missing group competencies.
 */
import {
  birthdayNumber,
  expressionNumber,
  lifePathNumber,
  personalityNumber,
  soulUrgeNumber,
} from './pythagorean';
import {
  MISSING_NUMBER_REMEDIES,
  analyzeLoShuFrequency,
  combineFrequencies,
  digitFrequency,
} from './loshu';
import { clamp, mean, reduceNumber, round } from './types';

/** Elemental grouping of each single-digit number (classical numerology). */
export const ELEMENTS: Record<number, 'fire' | 'earth' | 'air' | 'water'> = {
  1: 'fire',
  2: 'water',
  3: 'air',
  4: 'earth',
  5: 'air',
  6: 'water',
  7: 'water',
  8: 'earth',
  9: 'fire',
};

/** Classical element compatibility matrix. */
const ELEMENT_PAIR_SCORE: Record<string, number> = {
  'fire+fire': 25,
  'water+water': 25,
  'air+air': 25,
  'earth+earth': 25,
  'fire+air': 18,
  'air+fire': 18,
  'earth+water': 18,
  'water+earth': 18,
  'air+water': 5,
  'water+air': 5,
  'fire+water': -15,
  'water+fire': -15,
  'fire+earth': -8,
  'earth+fire': -8,
  'air+earth': -8,
  'earth+air': -8,
};

/** Compatibility score 0-100 between two reduced numbers using element affinity. */
export function numberCompatibility(a: number, b: number): number {
  const ra = reduceNumber(a, { keepMasters: false });
  const rb = reduceNumber(b, { keepMasters: false });
  if (ra === rb) return 100;
  const ea = ELEMENTS[ra] ?? 'earth';
  const eb = ELEMENTS[rb] ?? 'earth';
  const key = `${ea}+${eb}`;
  const delta = ELEMENT_PAIR_SCORE[key] ?? 0;
  return clamp(55 + delta, 5, 100);
}

export interface SynastrySubject {
  fullName: string;
  birthDate: string;
}

export interface SynastryResult {
  score: number;
  lifePathCompatibility: number;
  expressionCompatibility: number;
  soulUrgeCompatibility: number;
  personalityCompatibility: number;
  birthdayCompatibility: number;
  breakdown: { factor: string; score: number; weight: number }[];
  strengths: string[];
  challenges: string[];
}

/** Compute the full synastry report between two subjects. */
export function computeSynastry(a: SynastrySubject, b: SynastrySubject): SynastryResult {
  const aLife = lifePathNumber(a.birthDate);
  const bLife = lifePathNumber(b.birthDate);
  const aExp = expressionNumber(a.fullName);
  const bExp = expressionNumber(b.fullName);
  const aSoul = soulUrgeNumber(a.fullName);
  const bSoul = soulUrgeNumber(b.fullName);
  const aPers = personalityNumber(a.fullName);
  const bPers = personalityNumber(b.fullName);
  const aBday = birthdayNumber(a.birthDate);
  const bBday = birthdayNumber(b.birthDate);

  const lifePathCompatibility = numberCompatibility(aLife, bLife);
  const expressionCompatibility = numberCompatibility(aExp, bExp);
  const soulUrgeCompatibility = numberCompatibility(aSoul, bSoul);
  const personalityCompatibility = numberCompatibility(aPers, bPers);
  const birthdayCompatibility = numberCompatibility(aBday, bBday);

  const breakdown = [
    { factor: 'Life Path', score: lifePathCompatibility, weight: 0.4 },
    { factor: 'Expression', score: expressionCompatibility, weight: 0.25 },
    { factor: 'Soul Urge', score: soulUrgeCompatibility, weight: 0.2 },
    { factor: 'Personality', score: personalityCompatibility, weight: 0.1 },
    { factor: 'Birthday', score: birthdayCompatibility, weight: 0.05 },
  ];

  const score = round(
    breakdown.reduce((acc, item) => acc + item.score * item.weight, 0),
  );

  const strengths = breakdown
    .filter((item) => item.score >= 80)
    .map((item) => `${item.factor} affinity is strong (${item.score}/100).`);
  const challenges = breakdown
    .filter((item) => item.score < 45)
    .map((item) => `${item.factor} vibration needs conscious effort (${item.score}/100).`);

  return {
    score,
    lifePathCompatibility,
    expressionCompatibility,
    soulUrgeCompatibility,
    personalityCompatibility,
    birthdayCompatibility,
    breakdown,
    strengths,
    challenges,
  };
}

export interface TeamResult {
  memberCount: number;
  combinedFrequency: Record<number, number>;
  missingNumbers: number[];
  presentNumbers: number[];
  activePlanes: string[];
  missingPlanes: string[];
  overallStrength: number;
  missingCompetencies: { number: number; remedy: string }[];
}

/** Aggregate 2-20 profiles into a team Lo Shu matrix and surface gaps. */
export function aggregateTeamLoShu(members: SynastrySubject[]): TeamResult {
  if (members.length < 2) {
    throw new Error('Team analysis requires at least 2 profiles');
  }
  if (members.length > 20) {
    throw new Error('Team analysis supports at most 20 profiles');
  }

  const frequencies = members.map((m) => digitFrequency(m.birthDate));
  const combinedFrequency = combineFrequencies(...frequencies);
  const analysis = analyzeLoShuFrequency(combinedFrequency);

  const missingCompetencies = analysis.missingNumbers.map((n) => ({
    number: n,
    remedy: MISSING_NUMBER_REMEDIES[n] ?? 'Balance this energy through mindful practice.',
  }));

  return {
    memberCount: members.length,
    combinedFrequency,
    missingNumbers: analysis.missingNumbers,
    presentNumbers: analysis.presentNumbers,
    activePlanes: analysis.activePlanes.map((p) => p.name),
    missingPlanes: analysis.missingPlanes.map((p) => p.name),
    overallStrength: analysis.overallStrength,
    missingCompetencies,
  };
}

/** Mean compatibility across all unique pairs in a team (2-20 members). */
export function teamCompatibility(members: SynastrySubject[]): number {
  if (members.length < 2) {
    throw new Error('Team compatibility requires at least 2 profiles');
  }
  const scores: number[] = [];
  for (let i = 0; i < members.length; i += 1) {
    for (let j = i + 1; j < members.length; j += 1) {
      scores.push(computeSynastry(members[i], members[j]).score);
    }
  }
  return round(mean(scores));
}
