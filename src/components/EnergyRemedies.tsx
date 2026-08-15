'use client';

import { useMemo } from 'react';
import { useMatrixStore } from '@/stores/useMatrixStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { numberColor } from '@/lib/utils';
import { NUMBER_TATTVA, reduceDigit, type TattvaKey } from '@/lib/meanings';
import { useMeanings, useT } from '@/lib/i18n-client';
import type { MeaningsBundle } from '@/lib/meanings';

interface CoreRef {
  label: string;
  number: number;
}

const TATTVA_ORDER: TattvaKey[] = ['fire', 'earth', 'air', 'water', 'ether'];

function tallyTattvas(numbers: number[], m: MeaningsBundle): Record<TattvaKey, number> {
  const tally: Record<TattvaKey, number> = { fire: 0, earth: 0, air: 0, water: 0, ether: 0 };
  for (const n of numbers) {
    const key = NUMBER_TATTVA[reduceDigit(n)] ?? 'ether';
    tally[key] += 1;
  }
  return tally;
}

export function EnergyRemedies() {
  const matrix = useMatrixStore((s) => s.matrix);
  const m = useMeanings();
  const t = useT();

  const { cores, tally, dominant, weak } = useMemo(() => {
    if (!matrix) return { cores: [] as CoreRef[], tally: null, dominant: [] as TattvaKey[], weak: [] as TattvaKey[] };
    const p = matrix.pythagorean;
    const v = matrix.vedic;
    const cores: CoreRef[] = [
      { label: t('core.lifePath'), number: p.lifePath },
      { label: t('core.expression'), number: p.expression },
      { label: t('core.soulUrge'), number: p.soulUrge },
      { label: t('core.personality'), number: p.personality },
      { label: t('core.birthday'), number: p.birthday },
      { label: t('core.moolank'), number: v.moolank },
      { label: t('core.bhagyank'), number: v.bhagyank },
    ];
    const numbers = cores.map((c) => c.number);
    const tally = tallyTattvas(numbers, m);
    const max = Math.max(...TATTVA_ORDER.map((k) => tally[k]));
    const dominant = TATTVA_ORDER.filter((k) => tally[k] === max);
    const weak = TATTVA_ORDER.filter((k) => tally[k] === 0);
    return { cores, tally, dominant, weak };
  }, [matrix, m, t]);

  if (!matrix) {
    return <p className="text-sm text-white/40">{t('energy.empty')}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm leading-relaxed text-white/70">{t('energy.intro')}</p>

      {tally && (
        <Card>
          <CardHeader>
            <CardTitle>{t('energy.panchaTitle')}</CardTitle>
            <p className="text-sm text-white/50">{t('energy.panchaSubtitle')}</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
              {TATTVA_ORDER.map((key) => {
                const info = m.PANCHATATVA[key];
                const count = tally[key];
                const isDominant = dominant.includes(key);
                const isWeak = weak.includes(key);
                return (
                  <div
                    key={key}
                    className={
                      isDominant
                        ? 'rounded-md border border-celestial-gold/40 bg-celestial-gold/10 p-3'
                        : isWeak
                          ? 'rounded-md border border-white/10 bg-obsidian-raised/40 p-3 opacity-70'
                          : 'rounded-md border border-obsidian-border bg-obsidian-raised/50 p-3'
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white/90">{info.title}</span>
                      <span className="text-xs text-white/40">{info.sanskrit}</span>
                    </div>
                    <p className="mt-1 text-xs text-white/60">
                      {t('energy.numbersLabel')}: {info.numbers.join(', ')}
                    </p>
                    <p className="mt-1 text-lg font-serif font-semibold text-celestial-gold">{count}×</p>
                    {isDominant && <span className="text-xs text-celestial-gold">{t('energy.dominant')}</span>}
                    {isWeak && <span className="text-xs text-celestial-rose">{t('energy.absent')}</span>}
                  </div>
                );
              })}
            </div>

            <p className="text-sm text-white/70">
              <span className="font-semibold text-white/90">
                {dominant.length === 1
                  ? t('energy.dominantElement', { element: m.PANCHATATVA[dominant[0]].title })
                  : t('energy.dominantElements', { elements: dominant.map((k) => m.PANCHATATVA[k].title).join(' & ') })}
              </span>{' '}
              {weak.length > 0
                ? t('energy.absentElement', { elements: weak.map((k) => m.PANCHATATVA[k].title).join(' and ') })
                : t('energy.balanced')}
            </p>

            {weak.length > 0 && (
              <div className="grid grid-cols-1 gap-2">
                {weak.map((key) => {
                  const info = m.PANCHATATVA[key];
                  return (
                    <div key={key} className="rounded-md border border-obsidian-border bg-obsidian-raised/50 p-4">
                      <span className="text-sm font-semibold text-celestial-violetBright">
                        {info.title} ({info.sanskrit}) — {t('energy.balancing')}
                      </span>
                      <ul className="mt-2 flex flex-col gap-1">
                        {info.balance.map((b) => (
                          <li key={b} className="text-sm text-white/70">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t('energy.reikiTitle')}</CardTitle>
          <p className="text-sm text-white/50">{t('energy.reikiSubtitle')}</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cores.map((c) => {
            const reiki = m.REIKI_NUMBER[reduceDigit(c.number)] ?? m.REIKI_NUMBER[1];
            return (
              <div key={c.label} className="rounded-md border border-obsidian-border bg-obsidian-raised/50 p-3">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-lg font-bold"
                    style={{
                      background: `${numberColor(c.number)}1f`,
                      color: numberColor(c.number),
                      border: `1px solid ${numberColor(c.number)}55`,
                    }}
                  >
                    {c.number}
                  </span>
                  <div>
                    <span className="block text-xs uppercase tracking-wide text-white/50">{c.label}</span>
                    <span className="text-sm font-semibold text-white/90">{reiki.chakra}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-celestial-cyan">
                  {t('energy.symbol')}: <span className="font-medium text-white/80">{reiki.symbol}</span>
                </p>
                <p className="mt-1 text-sm text-white/70">{reiki.focus}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('energy.auraTitle')}</CardTitle>
          <p className="text-sm text-white/50">{t('energy.auraSubtitle')}</p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cores.map((c) => {
              const aura = m.AURA_CLEANING[reduceDigit(c.number)] ?? m.AURA_CLEANING[1];
              return (
                <div key={c.label} className="rounded-md border border-obsidian-border bg-obsidian-raised/50 p-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ background: aura.hex }} />
                    <span className="text-sm font-semibold text-white/90">{aura.color}</span>
                    <span className="text-xs text-white/40">— {c.label}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/70">{aura.practice}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-md border border-celestial-violet/30 bg-celestial-violet/10 p-4">
            <span className="text-sm font-semibold text-celestial-violetBright">{t('energy.dailyRitual')}</span>
            <ol className="mt-2 flex list-decimal flex-col gap-1 pl-5">
              {m.DAILY_AURA_RITUAL.map((step) => (
                <li key={step} className="text-sm text-white/70">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <Badge tone="muted">{t('energy.wellness')}</Badge>
            <Badge tone="muted">{t('energy.notMedical')}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
