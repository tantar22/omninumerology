import { Request, Response } from 'express';
import { z } from 'zod';
import { calculateMatrix, getCachedMatrix } from '../services/calculation.service';

const matrixSchema = z.object({
  fullName: z.string().trim().min(1, 'fullName is required'),
  currentName: z.string().trim().optional(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'birthDate must be YYYY-MM-DD'),
  birthTime: z.string().trim().optional(),
  birthCity: z.string().trim().optional(),
  targetDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'targetDate must be YYYY-MM-DD').optional(),
  userId: z.string().trim().optional(),
  bypassCache: z.boolean().optional(),
});

/**
 * POST /api/matrix/calculate
 * Validates input, runs all five traditions, caches/persists, returns unified JSON.
 */
export async function calculateMatrixHandler(req: Request, res: Response): Promise<void> {
  const parsed = matrixSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors });
    return;
  }

  const { targetDate, userId, bypassCache, ...input } = parsed.data;

  try {
    if (!bypassCache) {
      const cached = await getCachedMatrix(input, targetDate);
      if (cached) {
        res.json({ source: 'cache', ...cached });
        return;
      }
    }
    const matrix = await calculateMatrix(input, targetDate, userId);
    res.json({ source: 'computed', ...matrix });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Calculation failed';
    res.status(400).json({ error: message });
  }
}
