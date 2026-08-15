import {
  calculateUnifiedMatrix,
  NumerologicalInput,
  UnifiedMatrix,
} from '../../engine';
import { cacheGet, cacheSet } from '../lib/cache';
import { getPrisma } from '../lib/db';

const CACHE_TTL_SECONDS = 300;

function buildCacheKey(input: NumerologicalInput, targetDate: string): string {
  const name = input.fullName.trim().toLowerCase();
  return `matrix:${name}:${input.birthDate}:${targetDate}`;
}

/** Optionally persist a computed profile when a userId is supplied and a DB is present. */
async function persistProfile(
  userId: string | undefined,
  input: NumerologicalInput,
  matrix: UnifiedMatrix,
): Promise<void> {
  if (!userId) return;
  const db = getPrisma();
  if (!db) return;
  try {
    await db.profile.create({
      data: {
        userId,
        fullBirthName: input.fullName,
        currentName: input.currentName ?? null,
        birthDate: new Date(`${input.birthDate}T00:00:00.000Z`),
        birthTime: input.birthTime ?? null,
        birthCity: input.birthCity ?? null,
        computedMatrix: matrix as unknown as object,
      },
    });
  } catch {
    // Persistence is best-effort; computation must never fail because of the DB.
  }
}

/**
 * Compute the unified matrix across all five traditions, cache it, and (optionally)
 * persist the profile. Returns the full result object.
 */
export async function calculateMatrix(
  input: NumerologicalInput,
  targetDate?: string,
  userId?: string,
): Promise<UnifiedMatrix> {
  const matrix = calculateUnifiedMatrix(input, targetDate);
  await cacheSet(buildCacheKey(input, matrix.targetDate), matrix, CACHE_TTL_SECONDS);
  await persistProfile(userId, input, matrix);
  return matrix;
}

/** Try to serve a previously cached matrix before recomputing. */
export async function getCachedMatrix(
  input: NumerologicalInput,
  targetDate?: string,
): Promise<UnifiedMatrix | null> {
  const matrix = calculateUnifiedMatrix(input, targetDate);
  return cacheGet<UnifiedMatrix>(buildCacheKey(input, matrix.targetDate));
}
