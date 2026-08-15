'use client';

import { FormEvent, useRef, useState } from 'react';
import { useMatrixStore } from '@/stores/useMatrixStore';
import { useOracle } from '@/hooks/useOracle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage, useT } from '@/lib/i18n-client';

const SUGGESTED_PROMPTS = [
  'What is my career direction?',
  'How do I approach love?',
  'What is today\'s timing?',
  'What does my name mean?',
  'What numbers am I missing?',
  'What is my element balance?',
  'How do I cleanse my aura?',
];

export function OracleChat() {
  const matrix = useMatrixStore((s) => s.matrix);
  const { language } = useLanguage();
  const t = useT();
  const { text, streaming, error, send, stop } = useOracle();
  const [prompt, setPrompt] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!matrix || !prompt.trim() || streaming) return;
    void send(matrix, prompt.trim(), language);
    setPrompt('');
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{t('oracle.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {!matrix ? (
          <p className="text-sm text-white/40">{t('oracle.empty')}</p>
        ) : (
          <>
            <div
              ref={scrollRef}
              className="max-h-96 flex-1 overflow-y-auto whitespace-pre-wrap rounded-md border border-obsidian-border bg-obsidian-raised/50 p-4 text-sm text-white/80"
            >
              {text || t('oracle.placeholder')}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrompt(p)}
                  className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/60 transition-colors hover:border-celestial-gold/40 hover:text-white"
                >
                  {p}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t('oracle.inputPlaceholder')}
                disabled={streaming}
              />
              {streaming ? (
                <Button type="button" variant="outline" onClick={stop}>
                  {t('oracle.stop')}
                </Button>
              ) : (
                <Button type="submit" variant="gold" disabled={!prompt.trim()}>
                  {t('oracle.ask')}
                </Button>
              )}
            </form>

            {error && <p className="text-sm text-celestial-rose">{error}</p>}
          </>
        )}
      </CardContent>
    </Card>
  );
}
