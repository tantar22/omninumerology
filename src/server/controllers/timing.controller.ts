import { Request, Response } from 'express';
import { z } from 'zod';
import { calculateMicroTiming } from '../../engine/microtiming';

const timingSchema = z.object({
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'birthDate must be YYYY-MM-DD'),
  targetDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'targetDate must be YYYY-MM-DD').optional(),
});

/**
 * POST /api/timing/hour-clock
 * Generates a dynamic 24-hour hourly schedule for a target date.
 */
export async function hourClockHandler(req: Request, res: Response): Promise<void> {
  const parsed = timingSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors });
    return;
  }

  try {
    const { birthDate, targetDate } = parsed.data;
    const result = calculateMicroTiming(birthDate, targetDate ?? new Date().toISOString().slice(0, 10));
    res.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Timing calculation failed';
    res.status(400).json({ error: message });
  }
}
