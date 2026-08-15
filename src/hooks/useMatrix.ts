'use client';

import { useMutation } from '@tanstack/react-query';
import type { UnifiedMatrix } from '@/engine';
import { apiUrl } from '@/lib/api';

interface CalculateParams {
  fullName: string;
  currentName?: string;
  birthDate: string;
  birthTime?: string;
  birthCity?: string;
  targetDate?: string;
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const payload = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((payload as { error?: string }).error ?? `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

/** Mutation that calls POST /api/matrix/calculate and stores the unified matrix. */
export function useMatrix() {
  return useMutation<UnifiedMatrix, Error, CalculateParams>({
    mutationFn: async (params) => {
      const { targetDate, ...input } = params;
      const payload: Record<string, unknown> = { ...input };
      if (targetDate) payload.targetDate = targetDate;
      const result = await postJson<UnifiedMatrix & { source?: string }>(apiUrl('/api/matrix/calculate'), payload);
      return result;
    },
  });
}

export { postJson };
