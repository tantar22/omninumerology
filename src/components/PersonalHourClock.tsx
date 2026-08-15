'use client';

import { useEffect, useMemo, useState } from 'react';
import { useMatrixStore } from '@/stores/useMatrixStore';
import { cn, numberColor } from '@/lib/utils';
import { lookupSimple, reduceDigit } from '@/lib/meanings';
import { useMeanings, useT } from '@/lib/i18n-client';

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function PersonalHourClock() {
  const matrix = useMatrixStore((s) => s.matrix);
  const m = useMeanings();
  const t = useT();
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const clock = useMemo(() => matrix?.microtiming.hourClock ?? [], [matrix]);
  const currentHour = now.getHours();

  if (!matrix) {
    return <p className="text-sm text-white/40">{t('clock.empty')}</p>;
  }

  const current = clock[currentHour];
  const cx = 200;
  const cy = 200;

  const cycles = [
    { label: t('core.personalYear'), value: matrix.microtiming.personalYear },
    { label: t('core.personalMonth'), value: matrix.microtiming.personalMonth },
    { label: t('core.personalDay'), value: matrix.microtiming.personalDay },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {cycles.map((item) => {
          const meaning = lookupSimple(m.PERSONAL_CYCLE, item.value);
          return (
            <div key={item.label} className="rounded-lg border border-obsidian-border bg-obsidian-raised/50 p-4">
              <span className="text-xs uppercase tracking-wide text-white/50">{item.label}</span>
              <p className="mt-1 font-serif text-3xl font-semibold text-celestial-cyan">{item.value}</p>
              <p className="mt-1 text-sm text-white/80">
                <span className="font-semibold text-white/90">{meaning.title}.</span> {meaning.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-center">
        <svg viewBox="0 0 400 400" className="w-full max-w-sm shrink-0" role="img" aria-label="Personal hour clock">
          <circle cx={cx} cy={cy} r={195} fill="none" stroke="#2A2E40" strokeWidth={1} />

          {clock.map((w) => {
            const a = (w.hour / 24) * 360;
            const outer = polar(cx, cy, 185, a);
            const inner = polar(cx, cy, 150, a);
            const isCurrent = w.hour === currentHour;
            return (
              <line
                key={w.hour}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke={isCurrent ? '#D4AF37' : '#2A2E40'}
                strokeWidth={isCurrent ? 2 : 1}
              />
            );
          })}

          {clock.map((w) => {
            const a = (w.hour / 24) * 360;
            const labelPos = polar(cx, cy, 168, a);
            return (
              <text
                key={w.hour}
                x={labelPos.x}
                y={labelPos.y + 3}
                textAnchor="middle"
                fontSize={8}
                fill={w.hour === currentHour ? '#D4AF37' : '#ffffff66'}
                fontWeight={w.hour === currentHour ? 700 : 400}
              >
                {w.number}
              </text>
            );
          })}

          <circle cx={cx} cy={cy} r={140} fill="#0A0B10" stroke="#7C4DFF" strokeOpacity={0.4} />
          {current && (
            <>
              <text x={cx} y={cy - 24} textAnchor="middle" fill="#D4AF37" fontSize={44} fontWeight={700}>
                {current.number}
              </text>
              <text x={cx} y={cy} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={600}>
                {current.title}
              </text>
              <text x={cx} y={cy + 20} textAnchor="middle" fill="#ffffff80" fontSize={10}>
                {current.planet} · {current.label}
              </text>
              <text x={cx} y={cy + 40} textAnchor="middle" fill="#ffffff60" fontSize={9}>
                Calendar score {current.score}
              </text>
            </>
          )}
        </svg>

        <div className="flex w-full max-w-md flex-col gap-2">
          {current && (
            <div className="rounded-lg border border-celestial-gold/30 bg-celestial-gold/10 p-4">
              <span className="text-xs uppercase tracking-wide text-celestial-gold">
                {t('clock.now')} — {current.label}
              </span>
              <p className="mt-1 text-sm text-white/80">{current.affinity}</p>
            </div>
          )}

          {current && (() => {
            const reiki = m.REIKI_NUMBER[reduceDigit(current.number)] ?? m.REIKI_NUMBER[1];
            const aura = m.AURA_CLEANING[reduceDigit(current.number)] ?? m.AURA_CLEANING[1];
            return (
              <div className="rounded-lg border border-celestial-violet/30 bg-celestial-violet/10 p-4">
                <span className="text-xs uppercase tracking-wide text-celestial-violetBright">{t('clock.energyTip')}</span>
                <p className="mt-1 text-sm text-white/80">
                  For aura cleansing or Reiki, prefer the quiet windows just after sunrise or before sleep. Hour number{' '}
                  {current.number} resonates with the <span className="font-medium text-white/90">{reiki.chakra}</span>;
                  use{' '}
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: aura.hex }} />
                    {aura.color.toLowerCase()}
                  </span>{' '}
                  light while practising {reiki.symbol}.
                </p>
              </div>
            );
          })()}

          <div className="max-h-96 overflow-auto rounded-lg border border-obsidian-border bg-obsidian-raised/40">
            <table className="w-full min-w-[16rem] text-left text-xs">
              <thead className="sticky top-0 bg-obsidian-raised text-white/50">
                <tr>
                  <th className="px-3 py-2 font-medium">{t('clock.hour')}</th>
                  <th className="px-3 py-2 font-medium">{t('clock.number')}</th>
                  <th className="px-3 py-2 font-medium">{t('clock.theme')}</th>
                  <th className="px-3 py-2 font-medium">{t('clock.score')}</th>
                </tr>
              </thead>
              <tbody>
                {clock.map((w) => (
                  <tr
                    key={w.hour}
                    className={cn(
                      'border-t border-obsidian-border text-white/80',
                      w.hour === currentHour && 'bg-celestial-violet/20',
                    )}
                  >
                    <td className="px-3 py-1.5 font-medium">{w.label}</td>
                    <td className="px-3 py-1.5 font-bold" style={{ color: numberColor(w.number) }}>
                      {w.number}
                    </td>
                    <td className="px-3 py-1.5">
                      {w.title} <span className="text-white/40">· {w.planet}</span>
                    </td>
                    <td className="px-3 py-1.5">{w.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
