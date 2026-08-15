'use client';

import { useCallback, useRef, useState } from 'react';
import type { UnifiedMatrix } from '@/engine';
import type { Language } from '@/lib/i18n';
import { apiUrl } from '@/lib/api';

interface AssistantState {
  text: string;
  streaming: boolean;
  error: string | null;
}

/**
 * Streaming assistant hook. Sends a message (plus optional chart context) to
 * POST /api/assistant/chat and consumes the Server-Sent Events response.
 */
export function useAssistant() {
  const [state, setState] = useState<AssistantState>({ text: '', streaming: false, error: null });
  const controllerRef = useRef<AbortController | null>(null);

  const send = useCallback(async (message: string, language: Language = 'en', matrix?: UnifiedMatrix | null) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setState({ text: '', streaming: true, error: null });

    try {
      const res = await fetch(apiUrl('/api/assistant/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, language, matrix, stream: true }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(`Assistant request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const processChunk = (raw: string) => {
        buffer += raw;
        const lines = buffer.split('\n\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const data = trimmed.slice(5).trim();
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data) as { text?: string; error?: string };
            if (parsed.error) {
              setState((s) => ({ ...s, error: parsed.error ?? null, streaming: false }));
              return;
            }
            if (parsed.text) {
              setState((s) => ({ ...s, text: s.text + parsed.text }));
            }
          } catch {
            // Ignore malformed keep-alive frames.
          }
        }
      };

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        processChunk(decoder.decode(value, { stream: true }));
      }
      processChunk(decoder.decode());
      setState((s) => ({ ...s, streaming: false }));
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setState({ text: '', streaming: false, error: (err as Error).message });
    }
  }, []);

  const stop = useCallback(() => {
    controllerRef.current?.abort();
    setState((s) => ({ ...s, streaming: false }));
  }, []);

  return { ...state, send, stop };
}
