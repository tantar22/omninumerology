import { createRequire } from 'node:module';
import type Redis from 'ioredis';

const nodeRequire = createRequire(__filename);

let client: Redis | null = null;

/**
 * Lazily create a Redis client if REDIS_URL is configured. Returns null otherwise.
 * ioredis is required on-demand so serverless deployments without a cache never load it.
 */
export function getRedis(): Redis | null {
  if (client) return client;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  try {
    const { default: RedisCtor } = nodeRequire('ioredis') as { default: typeof Redis };
    client = new RedisCtor(url, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
    });
  } catch {
    return null;
  }
  return client;
}

/** Read and JSON-parse a cached value. Returns null on any miss/failure. */
export async function cacheGet<T>(key: string): Promise<T | null> {
  const redis = getRedis();
  if (!redis) return null;
  try {
    const raw = await redis.get(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** Write a JSON value to the cache with a TTL. Failures are silently ignored. */
export async function cacheSet(key: string, value: unknown, ttlSeconds: number): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  } catch {
    // Caching is best-effort; ignore failures.
  }
}
