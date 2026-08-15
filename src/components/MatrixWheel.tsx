'use client';

import { useMemo, useState } from 'react';
import { useMatrixStore } from '@/stores/useMatrixStore';
import { numberColor } from '@/lib/utils';
import { MeaningCard } from '@/components/MeaningCard';
import { lookup, lookupSimple } from '@/lib/meanings';
import { useMeanings, useT } from '@/lib/i18n-client';

interface RingItem {
  id: string;
  label: string;
  value: number;
}

interface Selection {
  ring: 'core' | 'pinnacle';
  label: string;
  value: number;
  title: string;
  description: string;
  keywords?: string[];
  strengths?: string[];
  challenges?: string[];
  careers?: string[];
}

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const largeArc = a1 - a0 > 180 ? 1 : 0;
  const p0 = polar(cx, cy, r1, a0);
  const p1 = polar(cx, cy, r1, a1);
  const p2 = polar(cx, cy, r0, a1);
  const p3 = polar(cx, cy, r0, a0);
  return `M ${p0.x} ${p0.y} A ${r1} ${r1} 0 ${largeArc} 1 ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${r0} ${r0} 0 ${largeArc} 0 ${p3.x} ${p3.y} Z`;
}

export function MatrixWheel() {
  const matrix = useMatrixStore((s) => s.matrix);
  const m = useMeanings();
  const t = useT();
  const [selected, setSelected] = useState<Selection | null>(null);

  const core: RingItem[] = useMemo(() => {
    if (!matrix) return [];
    const p = matrix.pythagorean;
    return [
      { id: 'lifePath', label: t('core.lifePath'), value: p.lifePath },
      { id: 'expression', label: t('core.expression'), value: p.expression },
      { id: 'soulUrge', label: t('core.soulUrge'), value: p.soulUrge },
      { id: 'personality', label: t('core.personality'), value: p.personality },
      { id: 'birthday', label: t('core.birthday'), value: p.birthday },
    ];
  }, [matrix, t]);

  const pinnacles: RingItem[] = useMemo(() => {
    if (!matrix) return [];
    const p = matrix.pythagorean.pinnacles;
    return [
      { id: 'p1', label: `${t('core.pinnacle')} I`, value: p.first },
      { id: 'p2', label: `${t('core.pinnacle')} II`, value: p.second },
      { id: 'p3', label: `${t('core.pinnacle')} III`, value: p.third },
      { id: 'p4', label: `${t('core.pinnacle')} IV`, value: p.fourth },
    ];
  }, [matrix, t]);

  function select(item: RingItem, ring: 'core' | 'pinnacle') {
    if (!matrix) return;
    if (ring === 'pinnacle') {
      const meaning = lookupSimple(m.PINNACLE, item.value);
      setSelected({ ring, label: item.label, value: item.value, title: meaning.title, description: meaning.description });
      return;
    }
    let sel: Selection;
    if (item.id === 'lifePath') {
      const meaning = lookup(m.LIFE_PATH, item.value);
      sel = { ring, label: item.label, value: item.value, title: meaning.title, description: meaning.description, keywords: meaning.keywords, strengths: meaning.strengths, challenges: meaning.challenges, careers: meaning.careers };
    } else if (item.id === 'expression') {
      const meaning = lookup(m.EXPRESSION, item.value);
      sel = { ring, label: item.label, value: item.value, title: meaning.title, description: meaning.description, keywords: meaning.keywords, strengths: meaning.strengths, challenges: meaning.challenges, careers: meaning.careers };
    } else if (item.id === 'soulUrge') {
      const meaning = lookup(m.SOUL_URGE, item.value);
      sel = { ring, label: item.label, value: item.value, title: meaning.title, description: meaning.description, keywords: meaning.keywords, strengths: meaning.strengths, challenges: meaning.challenges, careers: meaning.careers };
    } else if (item.id === 'personality') {
      const meaning = lookupSimple(m.PERSONALITY, item.value);
      sel = { ring, label: item.label, value: item.value, title: meaning.title, description: meaning.description };
    } else {
      const meaning = lookupSimple(m.BIRTHDAY, item.value);
      sel = { ring, label: item.label, value: item.value, title: meaning.title, description: meaning.description };
    }
    setSelected(sel);
  }

  const cx = 200;
  const cy = 200;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
        <svg viewBox="0 0 400 400" className="w-full max-w-md shrink-0" role="img" aria-label="Matrix wheel">
          <circle cx={cx} cy={cy} r={195} fill="none" stroke="#2A2E40" strokeWidth={1} />

          {pinnacles.map((item, i) => {
            const a0 = (i * 360) / pinnacles.length;
            const a1 = a0 + 360 / pinnacles.length;
            const mid = polar(cx, cy, 170, (a0 + a1) / 2);
            const active = selected?.ring === 'pinnacle' && selected.label === item.label;
            return (
              <g key={item.label} onClick={() => select(item, 'pinnacle')} className="cursor-pointer">
                <path d={arcPath(cx, cy, 150, 192, a0, a1)} fill={numberColor(item.value)} fillOpacity={active ? 0.4 : 0.14} stroke={active ? '#D4AF37' : '#2A2E40'} strokeWidth={active ? 2 : 1} />
                <text x={mid.x} y={mid.y - 4} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={700} pointerEvents="none">
                  {item.value}
                </text>
                <text x={mid.x} y={mid.y + 12} textAnchor="middle" fill="#ffffff99" fontSize={9} pointerEvents="none">
                  {item.label}
                </text>
              </g>
            );
          })}

          {core.map((item, i) => {
            const a0 = (i * 360) / core.length;
            const a1 = a0 + 360 / core.length;
            const mid = polar(cx, cy, 117, (a0 + a1) / 2);
            const active = selected?.ring === 'core' && selected.label === item.label;
            return (
              <g key={item.id} onClick={() => select(item, 'core')} className="cursor-pointer">
                <path d={arcPath(cx, cy, 95, 142, a0, a1)} fill={numberColor(item.value)} fillOpacity={active ? 0.5 : 0.22} stroke={active ? '#D4AF37' : '#2A2E40'} strokeWidth={active ? 2 : 1} />
                <text x={mid.x} y={mid.y - 2} textAnchor="middle" fill="#fff" fontSize={14} fontWeight={700} pointerEvents="none">
                  {item.value}
                </text>
                <text x={mid.x} y={mid.y + 13} textAnchor="middle" fill="#ffffff99" fontSize={9} pointerEvents="none">
                  {item.label}
                </text>
              </g>
            );
          })}

          <circle cx={cx} cy={cy} r={86} fill="#141721" stroke="#D4AF37" strokeOpacity={0.4} strokeWidth={1.5} />
          {matrix && (
            <>
              <text x={cx} y={cy - 8} textAnchor="middle" fill="#D4AF37" fontSize={28} fontWeight={700}>
                {matrix.rootRulers.lifePath}
              </text>
              <text x={cx} y={cy + 16} textAnchor="middle" fill="#ffffff99" fontSize={10}>
                {t('badge.lifePath')} {matrix.rootRulers.lifePath}
              </text>
              <text x={cx} y={cy + 32} textAnchor="middle" fill="#ffffff80" fontSize={9}>
                {t('badge.driver')} {matrix.rootRulers.driver} · {t('badge.conductor')} {matrix.rootRulers.conductor}
              </text>
            </>
          )}
        </svg>

        <div className="flex w-full max-w-md flex-col gap-4">
          {selected ? (
            <MeaningCard
              number={selected.value}
              label={selected.label}
              title={selected.title}
              description={selected.description}
              keywords={selected.keywords}
              strengths={selected.strengths}
              challenges={selected.challenges}
              careers={selected.careers}
            />
          ) : (
            <div className="rounded-xl border border-obsidian-border bg-obsidian-soft/60 p-5 text-sm text-white/60">
              <p className="font-semibold text-white/90">{t('wheel.howTo')}</p>
              <p className="mt-2">{t('wheel.description')}</p>
              <p className="mt-2">{t('wheel.click')}</p>
            </div>
          )}
        </div>
      </div>

      {!matrix && <p className="mt-4 text-center text-sm text-white/40">{t('wheel.empty')}</p>}
    </div>
  );
}
