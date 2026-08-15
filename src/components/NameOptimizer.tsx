'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn, numberColor } from '@/lib/utils';
import { lookupSimple } from '@/lib/meanings';
import { useMeanings, useT } from '@/lib/i18n-client';
import { apiUrl } from '@/lib/api';

interface LetterShift {
  index: number;
  letter: string;
  chaldean: number;
  pythagorean: number;
}

interface Suggestion {
  delta: number;
  targetValue: number;
  targetCompound: number;
  meaning: { name: string; summary: string; positive: boolean };
}

interface OptimizeResult {
  targetName: string;
  letters: LetterShift[];
  chaldeanTotal: number;
  pythagoreanTotal: number;
  chaldean: { single: number; compound: number; meaning: { name: string; summary: string } | undefined; negative: boolean };
  pythagorean: { expression: number; soulUrge: number; personality: number };
  suggestions: Suggestion[];
  summary: string;
}

export function NameOptimizer() {
  const m = useMeanings();
  const t = useT();
  const [name, setName] = useState('');
  const [result, setResult] = useState<OptimizeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl('/api/optimize/name'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetName: name.trim() }),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error((payload as { error?: string }).error ?? 'Optimization failed');
      }
      setResult((await res.json()) as OptimizeResult);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm leading-relaxed text-white/70">
        The <span className="text-celestial-gold">Chaldean</span> system (the oldest) assigns fixed letter values and
        reads both a <em>single</em> number (1-9) and a <em>compound</em> number (10-52). The{' '}
        <span className="text-celestial-violetBright">Pythagorean</span> system cycles 1-9 and reduces to a single
        number. Optimizing a name shifts its Chaldean compound toward a traditionally favorable vibration.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Label htmlFor="name-input">{t('name.targetLabel')}</Label>
          <Input
            id="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Johnathan Smith"
            className="mt-1"
          />
        </div>
        <Button type="submit" variant="gold" disabled={loading || !name.trim()}>
          {loading ? t('name.optimizing') : t('name.optimize')}
        </Button>
      </form>

      {error && <p className="text-sm text-celestial-rose">{error}</p>}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>{result.targetName}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge tone={result.chaldean.negative ? 'rose' : 'gold'}>
                {t('name.chaldeanBadge', { single: result.chaldean.single, compound: result.chaldean.compound })}
              </Badge>
              <Badge tone="violet">{t('name.pythagoreanBadge', { n: result.pythagorean.expression })}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {result.letters.map((l) => (
                <div
                  key={l.index}
                  className="flex w-12 flex-col items-center rounded-md border border-obsidian-border bg-obsidian-raised py-1.5"
                >
                  <span className="text-lg font-bold" style={{ color: numberColor(l.chaldean) }}>
                    {l.letter}
                  </span>
                  <span className="text-[10px] text-white/50">
                    C{l.chaldean} · P{l.pythagorean}
                  </span>
                </div>
              ))}
            </div>

            <p className={cn('text-sm', result.chaldean.negative ? 'text-celestial-rose' : 'text-celestial-cyan')}>
              {result.summary}
            </p>

            {(() => {
              const single = lookupSimple(m.CHALDEAN_SINGLE, result.chaldean.single);
              const meaning = result.chaldean.meaning;
              return (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="rounded-md border border-obsidian-border bg-obsidian-raised/50 p-3">
                    <span className="text-xs uppercase tracking-wide text-white/50">
                      {t('name.chaldeanSingleLabel', { n: result.chaldean.single })}
                    </span>
                    <p className="mt-1 text-sm text-white/80">
                      <span className="font-semibold text-white/90">{single.title}.</span> {single.description}
                    </p>
                  </div>
                  {meaning && (
                    <div className="rounded-md border border-obsidian-border bg-obsidian-raised/50 p-3">
                      <span className="text-xs uppercase tracking-wide text-white/50">
                        {t('name.compoundLabel', { n: result.chaldean.compound })}
                      </span>
                      <p className="mt-1 text-sm text-white/80">
                        <span className="font-semibold text-white/90">{meaning.name}.</span> {meaning.summary}
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}

            {result.suggestions.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-white/50">{t('name.alternatives')}</span>
                {result.suggestions.map((s) => (
                  <div key={s.targetValue} className="flex items-center justify-between rounded-md border border-obsidian-border bg-obsidian-raised/50 px-3 py-2">
                    <span className="text-sm text-white/80">
                      {s.meaning.name} <span className="text-white/40">({t('name.compoundLabel', { n: s.targetCompound })})</span>
                    </span>
                    <span className="text-xs text-celestial-gold">Δ {s.delta > 0 ? `+${s.delta}` : s.delta}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
