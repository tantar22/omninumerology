/**
 * Chaldean Numerology (Ancient Babylon).
 *
 * Chaldean assigns each letter a fixed value (the number 9 is never used) and
 * reads both the reduced "single" number and the unreduced "compound" number
 * (10-52) which carries its own positive/negative vibration.
 */
import { isLetter, normalizeName, reduceNumber } from './types';

/** Chaldean letter-to-number table (note: no letter maps to 9). */
export const CHALDEAN_TABLE: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
  S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7,
};

export interface CompoundMeaning {
  number: number;
  name: string;
  positive: boolean;
  summary: string;
}

/** Numeric value of a single uppercase letter in the Chaldean system. */
export function chaldeanLetterValue(ch: string): number {
  const upper = ch.toUpperCase();
  if (!isLetter(upper)) return 0;
  return CHALDEAN_TABLE[upper];
}

/** Sum of all letter values in a name (unreduced). */
export function chaldeanNameValue(name: string): number {
  return normalizeName(name)
    .split('')
    .reduce((acc, ch) => acc + chaldeanLetterValue(ch), 0);
}

/** The single (reduced) Chaldean name number: 1-9, no master preservation. */
export function chaldeanSingleNumber(name: string): number {
  return reduceNumber(chaldeanNameValue(name), { keepMasters: false });
}

/** The unreduced compound number, clamped to the meaningful 10-52 window. */
export function compoundNumber(name: string): number {
  const value = chaldeanNameValue(name);
  if (value <= 9) return value;
  if (value > 52) return reduceNumber(value, { keepMasters: false }) + 9; // fold back into band
  return value;
}

/**
 * Traditional Chaldean compound-number interpretations (10-52). Entries beyond
 * the widely-documented core are folded to their reduced essence.
 */
export const COMPOUND_MEANINGS: Record<number, CompoundMeaning> = {
  10: { number: 10, name: 'Wheel of Fortune', positive: true, summary: 'Favorable rise and fall; honor, faith and self-confidence.' },
  11: { number: 11, name: 'The Lion Muzzled', positive: false, summary: 'A warning number: hidden dangers, betrayal and trials requiring caution.' },
  12: { number: 12, name: 'The Sacrifice', positive: false, summary: 'Anxiety and sacrifice; risk of being misled by others.' },
  13: { number: 13, name: 'Change / Regeneration', positive: false, summary: 'Upheaval and change; power misused brings ruin, wisely used brings rebirth.' },
  14: { number: 14, name: 'Movement / Challenge', positive: false, summary: 'Temptation and instability; gains and losses through changeable fortune.' },
  15: { number: 15, name: 'The Magician', positive: true, summary: 'Magnetism and eloquence; material success if vanity is avoided.' },
  16: { number: 16, name: 'The Shattered Citadel', positive: false, summary: 'The fall: sudden collapse of plans through pride; great caution required.' },
  17: { number: 17, name: 'The Star of the Magi', positive: true, summary: 'Immortality of name; spiritual strength and lasting success.' },
  18: { number: 18, name: 'Materialism / Strife', positive: false, summary: 'Quarrels and deception; material striving brings spiritual loss.' },
  19: { number: 19, name: 'The Prince of Heaven', positive: true, summary: 'Fortune and happiness; a most fortunate number.' },
  20: { number: 20, name: 'The Awakening', positive: false, summary: 'Awakening to a higher purpose; delays and judgment before fulfillment.' },
  21: { number: 21, name: 'The Crown of the Magi', positive: true, summary: 'Victory and honor; advancement after struggle.' },
  22: { number: 22, name: 'Submission / The Good', positive: false, summary: 'Passivity and misplaced trust; wisdom comes through discipline.' },
  23: { number: 23, name: 'The Royal Star of the Lion', positive: true, summary: 'Success and protection; help from superiors.' },
  24: { number: 24, name: 'Love / Gain', positive: true, summary: 'Gains through love and cooperation; harmony in relationships.' },
  25: { number: 25, name: 'Strength through Trial', positive: false, summary: 'Success only after struggle; inner strength through experience.' },
  26: { number: 26, name: 'Warning of Disaster', positive: false, summary: 'Partnerships bring calamity; guard against betrayal.' },
  27: { number: 27, name: 'The Sceptre', positive: true, summary: 'Command and leadership; intellect crowned with authority.' },
  28: { number: 28, name: 'The Trusting Lamb', positive: false, summary: 'Contradictions and loss through misplaced trust.' },
  29: { number: 29, name: 'Grace under Pressure', positive: false, summary: 'Uncertainty and treachery; resilience is required.' },
  30: { number: 30, name: 'The Retiring Scholar', positive: false, summary: 'Mental detachment; success through solitude and thought.' },
  31: { number: 31, name: 'The Recluse', positive: false, summary: 'Isolation and loneliness; not a favorable number.' },
  32: { number: 32, name: 'Magnetic Harmony', positive: true, summary: 'Magnetic charm attracts allies; success through cooperation.' },
  33: { number: 33, name: 'The Master Teacher', positive: true, summary: 'Master number of compassion and service; great benefit to many.' },
  34: { number: 34, name: 'Reward of Effort', positive: true, summary: 'Strength and reward through patience and method.' },
  35: { number: 35, name: 'Fortune through Business', positive: true, summary: 'Success in trade and enterprise; expansion of wealth.' },
  36: { number: 36, name: 'Balance', positive: true, summary: 'Material and spiritual balance; leadership with integrity.' },
  37: { number: 37, name: 'The Sincere Friendship', positive: true, summary: 'Faithful friends and happy love unions.' },
  38: { number: 38, name: 'Servitude', positive: false, summary: 'Cooperation with little reward; risk of oppression.' },
  39: { number: 39, name: 'The Orator', positive: true, summary: 'Eloquence and public influence; intellectual achievement.' },
  40: { number: 40, name: 'Repose', positive: false, summary: 'Isolation and obscurity; a number of retreat.' },
  41: { number: 41, name: 'Self-Reliance', positive: false, summary: 'Independence at a cost; solitary effort and responsibility.' },
  42: { number: 42, name: 'The Wanderer', positive: false, summary: 'Restlessness and unfulfilled ambition; travel and change.' },
  43: { number: 43, name: 'The Revolutionary', positive: false, summary: 'Upheaval and conflict; risk of discord in groups.' },
  44: { number: 44, name: 'The Master Builder', positive: true, summary: 'Material mastery and solid foundations; great but tested.' },
  45: { number: 45, name: 'The Broken Vow', positive: false, summary: 'Loss through broken promises and reversals.' },
  46: { number: 46, name: 'The Perseverer', positive: true, summary: 'Strength and steady progress through hard work.' },
  47: { number: 47, name: 'The Peacemaker', positive: true, summary: 'Harmony and order; a tranquil and fortunate number.' },
  48: { number: 48, name: 'The Strategist', positive: true, summary: 'Cunning and material success through planning.' },
  49: { number: 49, name: 'The Dreamer', positive: false, summary: 'Illusion and unfulfilled promise; danger of fantasy.' },
  50: { number: 50, name: 'The Healer', positive: true, summary: 'Wisdom and restoration; power to heal and teach.' },
  51: { number: 51, name: 'The Warrior', positive: true, summary: 'Strength and courage; victory through bold action.' },
  52: { number: 52, name: 'The Reformer', positive: true, summary: 'Renewal and transformation; progress through reform.' },
};

/** Look up the compound-number meaning (undefined if outside 10-52). */
export function compoundMeaning(n: number): CompoundMeaning | undefined {
  return COMPOUND_MEANINGS[n];
}

/** Break a name into its compound-number components: single + compound + meaning. */
export interface ChaldeanResult {
  nameValue: number;
  single: number;
  compound: number;
  meaning: CompoundMeaning | undefined;
  negative: boolean;
}

export function calculateChaldean(name: string): ChaldeanResult {
  const nameValue = chaldeanNameValue(name);
  const single = chaldeanSingleNumber(name);
  const compound = compoundNumber(name);
  const meaning = compoundMeaning(compound);
  const negative = meaning ? !meaning.positive : false;
  return { nameValue, single, compound, meaning, negative };
}

/**
 * Suggest re-spellings / adjustments that shift a negative compound number toward
 * a positive one by changing the total name value by a delta of one letter.
 */
export function suggestPositiveAdjustment(name: string): {
  current: ChaldeanResult;
  suggestions: { delta: number; targetValue: number; targetCompound: number; meaning: CompoundMeaning }[];
} {
  const current = calculateChaldean(name);
  const suggestions: { delta: number; targetValue: number; targetCompound: number; meaning: CompoundMeaning }[] = [];

  if (!current.negative) {
    return { current, suggestions };
  }

  // Search nearby totals (within +/- 12) that resolve to a positive compound.
  const base = current.nameValue;
  for (let delta = -12; delta <= 12; delta += 1) {
    if (delta === 0) continue;
    const targetValue = base + delta;
    if (targetValue < 10 || targetValue > 52) continue;
    const meaning = compoundMeaning(targetValue);
    if (meaning && meaning.positive) {
      suggestions.push({ delta, targetValue, targetCompound: targetValue, meaning });
      if (suggestions.length >= 6) break;
    }
  }
  return { current, suggestions };
}
