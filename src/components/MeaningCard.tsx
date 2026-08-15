'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn, numberColor } from '@/lib/utils';
import { useT } from '@/lib/i18n-client';

interface MeaningCardProps {
  number: number | string;
  label: string;
  title: string;
  description: string;
  keywords?: string[];
  strengths?: string[];
  challenges?: string[];
  careers?: string[];
  accent?: string;
}

export function MeaningCard({
  number,
  label,
  title,
  description,
  keywords,
  strengths,
  challenges,
  careers,
  accent,
}: MeaningCardProps) {
  const accentColor = accent ?? (typeof number === 'number' ? numberColor(number) : '#D4AF37');
  const t = useT();

  return (
    <Card className="overflow-hidden">
      <div className="h-1 w-full" style={{ background: accentColor }} />
      <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <span className="text-xs uppercase tracking-wide text-white/50">{label}</span>
          <h4 className="mt-1 font-serif text-xl font-semibold text-white">{title}</h4>
        </div>
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-serif text-2xl font-bold"
          style={{ background: `${accentColor}1f`, color: accentColor, border: `1px solid ${accentColor}55` }}
        >
          {number}
        </span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-white/80">{description}</p>

        {keywords && keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((k) => (
              <Badge key={k} tone="muted">
                {k}
              </Badge>
            ))}
          </div>
        )}

        {(strengths || challenges) && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {strengths && strengths.length > 0 && (
              <div className="rounded-md border border-celestial-cyan/20 bg-celestial-cyan/5 p-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-celestial-cyan">{t('card.strengths')}</span>
                <ul className="mt-2 flex flex-col gap-1">
                  {strengths.map((s) => (
                    <li key={s} className="text-sm text-white/80">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {challenges && challenges.length > 0 && (
              <div className="rounded-md border border-celestial-rose/20 bg-celestial-rose/5 p-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-celestial-rose">{t('card.challenges')}</span>
                <ul className="mt-2 flex flex-col gap-1">
                  {challenges.map((c) => (
                    <li key={c} className="text-sm text-white/80">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {careers && careers.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs text-white/40">{t('card.careers')}</span>
            {careers.map((c) => (
              <Badge key={c} tone="violet">
                {c}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
