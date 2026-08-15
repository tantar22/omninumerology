'use client';

import { useMatrixStore } from '@/stores/useMatrixStore';
import { MeaningCard } from '@/components/MeaningCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { numberColor } from '@/lib/utils';
import { NUMBER_TATTVA, lookup, lookupSimple, reduceDigit } from '@/lib/meanings';
import { useMeanings, useT } from '@/lib/i18n-client';
import { COMPOUND_MEANINGS } from '@/engine/chaldean';

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <h3 className="font-serif text-xl font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-white/50">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export function CoreNumbers() {
  const matrix = useMatrixStore((s) => s.matrix);
  const m = useMeanings();
  const t = useT();
  if (!matrix) return null;

  const p = matrix.pythagorean;
  const v = matrix.vedic;
  const c = matrix.chaldean;
  const k = matrix.kabbalah;
  const mt = matrix.microtiming;

  const lifePath = lookup(m.LIFE_PATH, p.lifePath);
  const expression = lookup(m.EXPRESSION, p.expression);
  const soulUrge = lookup(m.SOUL_URGE, p.soulUrge);
  const personality = lookupSimple(m.PERSONALITY, p.personality);
  const birthday = lookupSimple(m.BIRTHDAY, p.birthday);
  const maturity = lookupSimple(m.MATURITY, p.maturity);

  const moolank = m.VEDIC_NUMBER[v.moolank] ?? m.VEDIC_NUMBER[1];
  const bhagyank = m.VEDIC_NUMBER[v.bhagyank] ?? m.VEDIC_NUMBER[1];
  const chaldeanSingle = m.CHALDEAN_SINGLE[c.single] ?? m.CHALDEAN_SINGLE[1];
  const compound = COMPOUND_MEANINGS[c.compound];

  const pinnacleItems = [
    { label: `${t('core.pinnacle')} I`, value: p.pinnacles.first, until: p.pinnacleAges.firstEnd },
    { label: `${t('core.pinnacle')} II`, value: p.pinnacles.second, until: p.pinnacleAges.secondEnd },
    { label: `${t('core.pinnacle')} III`, value: p.pinnacles.third, until: p.pinnacleAges.thirdEnd },
    { label: `${t('core.pinnacle')} IV`, value: p.pinnacles.fourth, until: null },
  ];

  const challengeItems = [
    { label: `${t('core.challenge')} I`, value: p.challenges.first },
    { label: `${t('core.challenge')} II`, value: p.challenges.second },
    { label: `${t('core.challenge')} III`, value: p.challenges.third },
    { label: `${t('core.challenge')} IV`, value: p.challenges.fourth },
  ];

  return (
    <div className="flex flex-col gap-8">
      <Section title={t('core.title')} subtitle={t('core.subtitle')}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <MeaningCard
            number={p.lifePath}
            label={t('core.lifePath')}
            title={lifePath.title}
            description={lifePath.description}
            keywords={lifePath.keywords}
            strengths={lifePath.strengths}
            challenges={lifePath.challenges}
            careers={lifePath.careers}
          />
          <MeaningCard
            number={p.expression}
            label={t('core.expression')}
            title={expression.title}
            description={expression.description}
            keywords={expression.keywords}
            strengths={expression.strengths}
            challenges={expression.challenges}
            careers={expression.careers}
          />
          <MeaningCard
            number={p.soulUrge}
            label={t('core.soulUrge')}
            title={soulUrge.title}
            description={soulUrge.description}
            keywords={soulUrge.keywords}
            strengths={soulUrge.strengths}
            challenges={soulUrge.challenges}
            careers={soulUrge.careers}
          />
          <MeaningCard number={p.personality} label={t('core.personality')} title={personality.title} description={personality.description} />
          <MeaningCard number={p.birthday} label={t('core.birthday')} title={birthday.title} description={birthday.description} />
          <MeaningCard number={p.maturity} label={t('core.maturity')} title={maturity.title} description={maturity.description} />
        </div>
      </Section>

      <Section title={t('core.pinnaclesTitle')} subtitle={t('core.pinnaclesSubtitle')}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pinnacleItems.map((item) => {
            const meaning = lookupSimple(m.PINNACLE, item.value);
            return (
              <Card key={item.label} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide text-white/50">{item.label}</span>
                  <span className="font-serif text-2xl font-semibold text-celestial-gold">{item.value}</span>
                </div>
                {item.until !== null && (
                  <span className="text-xs text-white/40">{t('core.untilAge', { age: item.until })}</span>
                )}
                <p className="mt-2 text-sm text-white/80">
                  <span className="font-semibold text-white/90">{meaning.title}.</span> {meaning.description}
                </p>
              </Card>
            );
          })}
          {challengeItems.map((item) => {
            const meaning = lookupSimple(m.CHALLENGE, item.value);
            return (
              <Card key={item.label} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide text-white/50">{item.label}</span>
                  <span className="font-serif text-2xl font-semibold text-celestial-violetBright">{item.value}</span>
                </div>
                <p className="mt-2 text-sm text-white/80">
                  <span className="font-semibold text-white/90">{meaning.title}.</span> {meaning.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section title={t('core.vedicTitle')} subtitle={t('core.vedicSubtitle')}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <MeaningCard
            number={v.moolank}
            label={`${t('core.moolank')} — ${moolank.planet}`}
            title={moolank.title}
            description={moolank.description}
            keywords={[t('badge.driver'), moolank.planet]}
          />
          <MeaningCard
            number={v.bhagyank}
            label={`${t('core.bhagyank')} — ${bhagyank.planet}`}
            title={bhagyank.title}
            description={bhagyank.description}
            keywords={[t('badge.conductor'), bhagyank.planet]}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone={v.driverConductor === 'mitra' ? 'gold' : v.driverConductor === 'shatru' ? 'rose' : 'muted'}>
            {t('core.driverConductor')}: {v.driverConductor}
          </Badge>
        </div>
      </Section>

      <Section title={t('core.chaldeanTitle')} subtitle={t('core.chaldeanSubtitle')}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <MeaningCard
            number={c.single}
            label={t('core.chaldeanSingle', { compound: c.compound })}
            title={chaldeanSingle.title}
            description={chaldeanSingle.description}
            keywords={compound ? [compound.name, compound.positive ? t('core.favorable') : t('core.cautionary')] : []}
          />
          <MeaningCard
            number={k.number}
            label={`${t('core.kabbalah')} — ${k.sephira.hebrew}`}
            title={k.sephira.name}
            description={k.sephira.meaning}
            keywords={['Tree of Life']}
          />
        </div>
        {compound && (
          <p className="text-sm text-white/70">
            <span className="font-semibold text-white/90">
              {t('core.compoundLabel', { compound: c.compound })} — {compound.name}:
            </span>{' '}
            {compound.summary}
          </p>
        )}
      </Section>

      <Section title={t('core.cyclesTitle')} subtitle={t('core.cyclesSubtitle')}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: t('core.personalYear'), value: mt.personalYear },
            { label: t('core.personalMonth'), value: mt.personalMonth },
            { label: t('core.personalDay'), value: mt.personalDay },
          ].map((item) => {
            const meaning = lookupSimple(m.PERSONAL_CYCLE, item.value);
            return (
              <Card key={item.label} className="p-4">
                <span className="text-xs uppercase tracking-wide text-white/50">{item.label}</span>
                <p className="mt-1 font-serif text-3xl font-semibold text-celestial-cyan">{item.value}</p>
                <p className="mt-2 text-sm text-white/80">
                  <span className="font-semibold text-white/90">{meaning.title}.</span> {meaning.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section title={t('core.energyTitle')} subtitle={t('core.energySubtitle')}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: t('core.lifePath'), number: p.lifePath },
            { label: t('core.expression'), number: p.expression },
            { label: t('core.soulUrge'), number: p.soulUrge },
            { label: t('core.personality'), number: p.personality },
            { label: t('core.birthday'), number: p.birthday },
            { label: t('core.maturity'), number: p.maturity },
          ].map((item) => {
            const reduced = reduceDigit(item.number);
            const reiki = m.REIKI_NUMBER[reduced] ?? m.REIKI_NUMBER[1];
            const aura = m.AURA_CLEANING[reduced] ?? m.AURA_CLEANING[1];
            const tattva = m.PANCHATATVA[NUMBER_TATTVA[reduced] ?? 'ether'];
            return (
              <div key={item.label} className="rounded-md border border-obsidian-border bg-obsidian-raised/50 p-3">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-serif text-base font-bold"
                    style={{
                      background: `${numberColor(item.number)}1f`,
                      color: numberColor(item.number),
                      border: `1px solid ${numberColor(item.number)}55`,
                    }}
                  >
                    {item.number}
                  </span>
                  <span className="text-sm font-semibold text-white/90">{item.label}</span>
                </div>
                <p className="mt-2 text-xs text-white/60">
                  <span className="text-celestial-violetBright">{tattva.title}</span> · {reiki.chakra} · {reiki.symbol}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/60">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: aura.hex }} />
                  {aura.color}
                </p>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
