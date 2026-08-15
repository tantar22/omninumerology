/**
 * Assistant service — hybrid answer pipeline.
 *
 * Every request is answered first by deterministic local retrieval over the
 * knowledge base. When the operator has configured a private LLM via
 * USER_LLM_API_KEY / USER_LLM_BASE_URL / USER_LLM_MODEL, the retrieved entries
 * are used as grounding context for an optional streaming completion; on any
 * error (or missing key) the service falls back to the local answer.
 */
import { UnifiedMatrix } from '../../engine';
import { isLanguage, type Language } from '../../lib/i18n';
import { composeLocalAnswer, retrieve, WELLNESS_DISCLAIMER, type LocalAnswer } from '../../lib/knowledge';

export interface AssistantResult extends LocalAnswer {
  engine: 'local' | 'llm';
}

export function isLLMConfigured(): boolean {
  return Boolean(process.env.USER_LLM_API_KEY && process.env.USER_LLM_BASE_URL);
}

function llmBaseUrl(): string {
  const raw = (process.env.USER_LLM_BASE_URL ?? '').replace(/\/+$/, '');
  return raw.endsWith('/chat/completions') ? raw : `${raw}/chat/completions`;
}

function llmModel(): string {
  return process.env.USER_LLM_MODEL ?? 'gpt-4o-mini';
}

/** Build a system prompt that grounds the LLM in the retrieved knowledge. */
function buildSystemPrompt(query: string, language: Language): string {
  const results = retrieve(query, language, 4);
  const context = results
    .map((r) => `- ${r.entry.title.en}: ${r.entry.body.en}`)
    .join('\n');
  return [
    'You are OmniNumerology, a helpful guide on numerology, Vedic numerology and planets, Chaldean and Kabbalah systems, the Lo Shu grid, Reiki, Panchatatva (five elements), and aura. You are wellness-toned and never give medical, legal, or financial advice.',
    'Answer using only the provided context where possible, and keep answers concise and friendly.',
    `The user asked in language: ${language}.`,
    'Relevant context:',
    context || '(no specific context found — answer generally from your training, then add a short disclaimer.)',
    'Always end with this disclaimer: ' + WELLNESS_DISCLAIMER.en,
  ].join('\n');
}

/** Stream an OpenAI-compatible chat completion, yielding content deltas. */
async function* streamLLM(query: string, language: Language): AsyncGenerator<string> {
  const res = await fetch(llmBaseUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.USER_LLM_API_KEY}`,
    },
    body: JSON.stringify({
      model: llmModel(),
      stream: true,
      messages: [
        { role: 'system', content: buildSystemPrompt(query, language) },
        { role: 'user', content: query },
      ],
    }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`LLM request failed (${res.status})`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const data = trimmed.slice(5).trim();
      if (data === '[DONE]') return;
      try {
        const parsed = JSON.parse(data) as { choices?: { delta?: { content?: string } }[] };
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) yield content;
      } catch {
        // Ignore keep-alive frames.
      }
    }
  }
}

/**
 * Resolve a non-streaming answer. Uses the LLM when configured (best-effort),
 * otherwise returns the deterministic local answer.
 */
export async function answer(
  message: string,
  language: Language = 'en',
  _matrix?: UnifiedMatrix,
): Promise<AssistantResult> {
  const lang = isLanguage(language) ? language : 'en';
  if (isLLMConfigured()) {
    try {
      let text = '';
      for await (const chunk of streamLLM(message, lang)) text += chunk;
      if (text.trim()) return { text: text.trim(), sources: [], engine: 'llm' };
    } catch {
      // Fall through to local answer.
    }
  }
  const local = composeLocalAnswer(message, lang);
  return { ...local, engine: 'local' };
}

/** Stream an answer as text chunks (for SSE delivery). */
export async function* streamAssistant(
  message: string,
  language: Language = 'en',
  matrix?: UnifiedMatrix,
): AsyncGenerator<string> {
  const lang = isLanguage(language) ? language : 'en';
  if (isLLMConfigured()) {
    try {
      for await (const chunk of streamLLM(message, lang)) yield chunk;
      return;
    } catch {
      // Fall through to local answer.
    }
  }
  const local = composeLocalAnswer(message, lang);
  yield local.text;
  void matrix;
}
