import { createRequire } from 'node:module';

const nodeRequire = createRequire(__filename);

/** True if a DATABASE_URL is configured (database persistence is optional). */
export function isDbAvailable(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Minimal surface of the Prisma client we actually use. Declared locally so the
 * build never depends on `@prisma/client` types (which only exist after
 * `prisma generate` runs).
 */
export interface PrismaProfileClient {
  profile: { create(args: unknown): Promise<unknown> };
}

let client: PrismaProfileClient | null = null;

/**
 * Lazily create the Prisma client. Returns null when no DATABASE_URL is set so
 * the API can run entirely in-memory. Prisma is required on-demand, so
 * deployments without a database (e.g. Firebase Cloud Functions) never load it
 * and never need `prisma generate` to have run.
 */
export function getPrisma(): PrismaProfileClient | null {
  if (!isDbAvailable()) return null;
  if (!client) {
    const { PrismaClient } = nodeRequire('@prisma/client') as { PrismaClient: new () => PrismaProfileClient };
    client = new PrismaClient();
  }
  return client;
}
