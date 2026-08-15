import { Request, Response } from 'express';
import { z } from 'zod';
import { aggregateTeamLoShu, computeSynastry, teamCompatibility } from '../../engine/synastry';

const subjectSchema = z.object({
  fullName: z.string().trim().min(1),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

const pairSchema = z.object({
  profileA: subjectSchema,
  profileB: subjectSchema,
});

const teamSchema = z.object({
  profiles: z.array(subjectSchema).min(2, 'at least 2 profiles').max(20, 'at most 20 profiles'),
});

/** POST /api/synastry/pair */
export async function synastryPairHandler(req: Request, res: Response): Promise<void> {
  const parsed = pairSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors });
    return;
  }
  try {
    const result = computeSynastry(parsed.data.profileA, parsed.data.profileB);
    res.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Synastry failed';
    res.status(400).json({ error: message });
  }
}

/**
 * POST /api/synastry/team
 * Aggregates 2-20 profiles into a team Lo Shu matrix and identifies gaps.
 */
export async function synastryTeamHandler(req: Request, res: Response): Promise<void> {
  const parsed = teamSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors });
    return;
  }
  try {
    const { profiles } = parsed.data;
    const loShu = aggregateTeamLoShu(profiles);
    const compatibility = teamCompatibility(profiles);
    res.json({ team: loShu, meanCompatibility: compatibility });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Team analysis failed';
    res.status(400).json({ error: message });
  }
}
