import { Request, Response } from 'express';
import { z } from 'zod';
import {
  calculateChaldean,
  chaldeanNameValue,
  suggestPositiveAdjustment,
  CHALDEAN_TABLE,
} from '../../engine/chaldean';
import {
  expressionNumber,
  personalityNumber,
  pythagoreanNameValue,
  soulUrgeNumber,
  PYTHAGOREAN_TABLE,
} from '../../engine/pythagorean';
import { reduceNumber } from '../../engine/types';

const optimizeSchema = z.object({
  targetName: z.string().trim().min(1, 'targetName is required'),
});

interface LetterShift {
  index: number;
  letter: string;
  chaldean: number;
  pythagorean: number;
}

/**
 * POST /api/optimize/name
 * Returns letter-by-letter Chaldean/Pythagorean values plus suggestions that
 * resolve a negative compound number toward a positive one.
 */
export async function optimizeNameHandler(req: Request, res: Response): Promise<void> {
  const parsed = optimizeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors });
    return;
  }

  const { targetName } = parsed.data;
  const letters = targetName.toUpperCase().replace(/[^A-Z]/g, '').split('');

  const shifts: LetterShift[] = letters.map((letter, index) => ({
    index,
    letter,
    chaldean: CHALDEAN_TABLE[letter] ?? 0,
    pythagorean: PYTHAGOREAN_TABLE[letter] ?? 0,
  }));

  const chaldean = calculateChaldean(targetName);
  const adjustments = suggestPositiveAdjustment(targetName);

  res.json({
    targetName,
    letters: shifts,
    chaldeanTotal: chaldeanNameValue(targetName),
    pythagoreanTotal: pythagoreanNameValue(targetName),
    chaldean: { single: chaldean.single, compound: chaldean.compound, meaning: chaldean.meaning, negative: chaldean.negative },
    pythagorean: {
      expression: expressionNumber(targetName),
      soulUrge: soulUrgeNumber(targetName),
      personality: personalityNumber(targetName),
    },
    suggestions: adjustments.suggestions,
    summary: chaldean.negative
      ? `The compound number ${chaldean.compound} is cautionary; ${adjustments.suggestions.length} positive alternatives were found.`
      : `The compound number ${chaldean.compound} is favorable.`,
    reduced: reduceNumber(chaldeanNameValue(targetName)),
  });
}
