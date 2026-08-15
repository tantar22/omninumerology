'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'gold' | 'violet' | 'cyan' | 'rose' | 'muted';
}

const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
  gold: 'bg-celestial-gold/15 text-celestial-gold border-celestial-gold/30',
  violet: 'bg-celestial-violet/15 text-celestial-violetBright border-celestial-violet/30',
  cyan: 'bg-celestial-cyan/15 text-celestial-cyan border-celestial-cyan/30',
  rose: 'bg-celestial-rose/15 text-celestial-rose border-celestial-rose/30',
  muted: 'bg-white/5 text-white/60 border-white/10',
};

export function Badge({ className, tone = 'muted', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
