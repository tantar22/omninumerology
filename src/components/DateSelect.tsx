'use client';

import { useMemo } from 'react';

interface DateSelectProps {
  value: string;
  onChange: (iso: string) => void;
  labels: { day: string; month: string; year: string };
}

interface Parts {
  y: string;
  m: string;
  d: string;
}

function parseISO(value: string): Parts {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return { y: '', m: '', d: '' };
  return { y: match[1], m: String(Number(match[2])), d: String(Number(match[3])) };
}

const selectClass =
  'mt-1 h-10 w-full rounded-md border border-obsidian-border bg-obsidian-raised px-3 text-sm text-white focus:border-celestial-violet focus:outline-none focus:ring-1 focus:ring-celestial-violet';

export function DateSelect({ value, onChange, labels }: DateSelectProps) {
  const current = useMemo(() => parseISO(value), [value]);
  const nowYear = new Date().getFullYear();

  const years = useMemo(() => {
    const list: number[] = [];
    for (let y = nowYear; y >= 1900; y -= 1) list.push(y);
    return list;
  }, [nowYear]);

  function emit(part: keyof Parts, next: string) {
    const y = part === 'y' ? next : current.y || String(nowYear);
    const m = part === 'm' ? next : current.m || '1';
    const d = part === 'd' ? next : current.d || '1';
    if (y && m && d) {
      onChange(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
    }
  }

  return (
    <div className="grid grid-cols-[1.4fr_1.6fr_2fr] gap-2">
      <div>
        <span className="text-xs font-medium uppercase tracking-wide text-white/60">{labels.day}</span>
        <select value={current.d} onChange={(e) => emit('d', e.target.value)} className={selectClass}>
          <option value="" disabled>
            {labels.day}
          </option>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
            <option key={d} value={String(d)}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span className="text-xs font-medium uppercase tracking-wide text-white/60">{labels.month}</span>
        <select value={current.m} onChange={(e) => emit('m', e.target.value)} className={selectClass}>
          <option value="" disabled>
            {labels.month}
          </option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={String(m)}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span className="text-xs font-medium uppercase tracking-wide text-white/60">{labels.year}</span>
        <select value={current.y} onChange={(e) => emit('y', e.target.value)} className={selectClass}>
          <option value="" disabled>
            {labels.year}
          </option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
