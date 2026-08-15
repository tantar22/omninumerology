'use client';

import { useMemo } from 'react';
import { useMatrixStore } from '@/stores/useMatrixStore';
import { cn, numberColor } from '@/lib/utils';
import { NUMBER_TATTVA, type TattvaKey } from '@/lib/meanings';
import { useMeanings, useT } from '@/lib/i18n-client';

const TATTVA_ORDER: TattvaKey[] = ['fire', 'earth', 'air', 'water', 'ether'];

export function LoShuGrid() {
  const matrix = useMatrixStore((s) => s.matrix);
  const m = useMeanings();
  const t = useT();

  const { grid, planes, missingNumbers, presentNumbers, overallStrength, remedies, frequency } = useMemo(() => {
    if (!matrix) {
      return {
        grid: null,
        planes: [],
        missingNumbers: [] as number[],
        presentNumbers: [] as number[],
        overallStrength: 0,
        remedies: {} as Record<number, string>,
        frequency: {} as Record<number, number>,
      };
    }
    return {
      grid: matrix.loshu.grid,
      planes: matrix.loshu.planes,
      missingNumbers: matrix.loshu.missingNumbers,
      presentNumbers: matrix.loshu.presentNumbers,
      overallStrength: matrix.loshu.overallStrength,
      remedies: matrix.loshu.remedies,
      frequency: matrix.loshu.frequency,
    };
  }, [matrix]);

  if (!grid) {
    return <p className="text-sm text-white/40">Calculate your matrix to view the Lo Shu grid.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/60">{t('loshu.title')}</span>
        <span className="text-sm font-semibold text-celestial-gold">
          {t('loshu.overall')} {overallStrength.toFixed(0)}%
        </span>
      </div>

      <p className="text-sm leading-relaxed text-white/70">
        The 3×3 Lo Shu square places the digits 1-9 into a fixed magic grid (every row, column and diagonal sums to 15).
        Your birth date is tallied into the grid, and the frequency of each digit reveals which of the eight{' '}
        <em>planes</em> (arrows) are active and which numbers are missing from your chart.
      </p>

      <div className="mx-auto grid w-full max-w-sm grid-cols-3 gap-2" role="grid" aria-label="Lo Shu grid">
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const active = cell.count > 0;
            const color = numberColor(cell.number);
            return (
              <div
                key={`${r}-${c}`}
                role="gridcell"
                className={cn(
                  'flex aspect-square flex-col items-center justify-center rounded-lg border transition-colors',
                  active ? 'border-white/20' : 'border-obsidian-border opacity-40',
                )}
                style={{ background: active ? `${color}1f` : '#141721' }}
                title={`${t('loshu.numberTitle', { n: cell.number })} (${m.PANCHATATVA[NUMBER_TATTVA[cell.number]].title}): ${cell.count}`}
              >
                <span className="text-2xl font-bold" style={{ color: active ? color : '#ffffff44' }}>
                  {cell.number}
                </span>
                <span className="text-xs text-white/60">{cell.count > 0 ? `×${cell.count}` : '—'}</span>
              </div>
            );
          }),
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {planes.map((plane) => {
          const meaning = m.LO_SHU_PLANE_MEANING[plane.id];
          return (
            <div
              key={plane.id}
              className={cn(
                'rounded-md border px-3 py-3',
                plane.active ? 'border-celestial-gold/40 bg-celestial-gold/10' : 'border-obsidian-border bg-obsidian-raised/50',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white/90">{meaning?.title ?? plane.name}</span>
                <span className={cn('text-xs font-semibold', plane.active ? 'text-celestial-gold' : 'text-white/40')}>
                  {plane.active ? t('loshu.active') : `${plane.strength.toFixed(0)}%`}
                </span>
              </div>
              {meaning && <p className="mt-1.5 text-xs leading-relaxed text-white/60">{meaning.description}</p>}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="rounded-md border border-obsidian-border bg-obsidian-raised/50 p-3">
          <span className="text-xs uppercase tracking-wide text-white/50">{t('loshu.present')}</span>
          <p className="mt-1 text-sm text-celestial-cyan">
            {presentNumbers.map((n) => `${n} (×${frequency[n]})`).join(' · ') || 'None'}
          </p>
        </div>
        <div className="rounded-md border border-obsidian-border bg-obsidian-raised/50 p-3">
          <span className="text-xs uppercase tracking-wide text-white/50">{t('loshu.missing')}</span>
          <p className="mt-1 text-sm text-celestial-rose">{missingNumbers.join(' · ') || 'None'}</p>
        </div>
      </div>

      {missingNumbers.length > 0 && (
        <div className="flex flex-col gap-2">
          <h4 className="font-serif text-lg font-semibold text-white">{t('loshu.missingTitle')}</h4>
          <p className="text-sm text-white/60">{t('loshu.missingSubtitle')}</p>
          {missingNumbers.map((n) => {
            const numberMeaning = m.CHALDEAN_SINGLE[n];
            return (
              <div key={n} className="rounded-lg border border-obsidian-border bg-obsidian-raised/50 p-4">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full font-serif text-lg font-bold"
                    style={{ background: `${numberColor(n)}1f`, color: numberColor(n), border: `1px solid ${numberColor(n)}55` }}
                  >
                    {n}
                  </span>
                  <span className="text-sm font-semibold text-white/90">
                    {numberMeaning?.title ?? t('loshu.numberTitle', { n })}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/70">{remedies[n]}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h4 className="font-serif text-lg font-semibold text-white">{t('loshu.tattvaTitle')}</h4>
        <p className="text-sm text-white/60">{t('loshu.tattvaSubtitle')}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
          {TATTVA_ORDER.map((key) => {
            const info = m.PANCHATATVA[key];
            return (
              <div key={key} className="rounded-md border border-obsidian-border bg-obsidian-raised/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/90">{info.title}</span>
                  <span className="text-xs text-white/40">{info.sanskrit}</span>
                </div>
                <p className="mt-1 text-xs text-white/60">{info.numbers.join(', ')}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/50">{info.qualities}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
