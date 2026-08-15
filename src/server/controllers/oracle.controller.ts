import { Request, Response } from 'express';
import { z } from 'zod';
import { UnifiedMatrix } from '../../engine';
import { isLanguage, type Language } from '../../lib/i18n';
import { composeAnalysis, streamAnalysis } from '../services/oracle.service';

const oracleSchema = z.object({
  matrix: z.record(z.unknown()),
  prompt: z.string().trim().min(1, 'prompt is required'),
  stream: z.boolean().optional(),
  language: z.string().optional(),
});

/** POST /api/oracle/chat — bounded, zero-hallucination analysis. */
export async function oracleChatHandler(req: Request, res: Response): Promise<void> {
  const parsed = oracleSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors });
    return;
  }

  const matrix = parsed.data.matrix as unknown as UnifiedMatrix;
  const prompt = parsed.data.prompt;
  const language: Language = isLanguage(parsed.data.language) ? parsed.data.language : 'en';

  if (parsed.data.stream) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    try {
      for await (const chunk of streamAnalysis(matrix, prompt, language)) {
        res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      }
      res.write('data: [DONE]\n\n');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Oracle failed';
      res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
    } finally {
      res.end();
    }
    return;
  }

  try {
    const sections = composeAnalysis(matrix, prompt, language);
    res.json({ sections });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Oracle failed';
    res.status(400).json({ error: message });
  }
}
