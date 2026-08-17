import { Request, Response } from 'express';
import { z } from 'zod';
import { UnifiedMatrix } from '../../engine';
import { isLanguage, type Language } from '../../lib/i18n';
import { answer, streamAssistant } from '../services/assistant.service';

const assistantSchema = z.object({
  message: z.string().trim().min(1, 'message is required'),
  stream: z.boolean().optional(),
  language: z.string().optional(),
  matrix: z.record(z.unknown()).nullable().optional(),
});

/** POST /api/assistant/chat — hybrid local-knowledge + optional-LLM guide. */
export async function assistantChatHandler(req: Request, res: Response): Promise<void> {
  const parsed = assistantSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors });
    return;
  }

  const message = parsed.data.message;
  const language: Language = isLanguage(parsed.data.language) ? parsed.data.language : 'en';
  const matrix = parsed.data.matrix as unknown as UnifiedMatrix | undefined;

  if (parsed.data.stream) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    try {
      for await (const chunk of streamAssistant(message, language, matrix)) {
        res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      }
      res.write('data: [DONE]\n\n');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Assistant failed';
      res.write(`data: ${JSON.stringify({ error: msg })}\n\n`);
    } finally {
      res.end();
    }
    return;
  }

  try {
    const result = await answer(message, language, matrix);
    res.json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Assistant failed';
    res.status(400).json({ error: msg });
  }
}
