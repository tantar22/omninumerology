'use client';

import Link from 'next/link';
import { ArrowRight, Compass, Gem, Heart, Moon, Sparkles, Stars } from 'lucide-react';
import { CosmicBackground } from '@/components/CosmicBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useT } from '@/lib/i18n-client';

const serviceIcons = [Stars, Compass, Gem, Sparkles] as const;
const serviceKeys = [
  'about.services.reading',
  'about.services.name',
  'about.services.vedic',
  'about.services.aura',
] as const;

const stepNumbers = ['01', '02', '03'] as const;
const stepKeys = [
  'about.process.step1',
  'about.process.step2',
  'about.process.step3',
] as const;

export default function HomePage() {
  const t = useT();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <CosmicBackground segment="landing" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <nav aria-label="Primary navigation" className="mb-12 flex items-center justify-between gap-4">
          <Link href="/" className="font-serif text-xl font-bold text-white transition-colors hover:text-celestial-gold">
            ST<span className="text-celestial-gold">Numerology</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/tool"
              className="inline-flex items-center gap-2 rounded-md border border-celestial-gold/40 px-3 py-2 text-sm font-medium text-celestial-gold transition-colors hover:border-celestial-gold hover:bg-celestial-gold/10"
            >
              {t('about.hero.useTool')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>

        <section className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-celestial-gold/30 bg-celestial-gold/10 px-3 py-1 text-sm font-medium text-celestial-goldBright">
              <Moon className="h-4 w-4" /> {t('about.hero.badge')}
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t('about.hero.title')}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              {t('about.hero.welcome')} <span className="font-semibold text-white">{t('about.hero.name')}</span>.{' '}
              {t('about.hero.desc')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-md bg-celestial-gold px-5 py-3 text-sm font-semibold text-obsidian transition-colors hover:bg-celestial-goldBright"
              >
                {t('about.hero.exploreServices')} <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/tool"
                className="inline-flex items-center gap-2 rounded-md border border-obsidian-border px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-celestial-violet/60 hover:text-white"
              >
                {t('about.hero.useTool')}
              </Link>
            </div>
          </div>

          <Card className="border-celestial-gold/25 bg-gradient-to-b from-celestial-gold/10 to-obsidian-soft/80 shadow-glow-gold">
            <CardHeader className="pb-2">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-celestial-gold/15 text-celestial-goldBright">
                <Heart className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">{t('about.card.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-white/70">
              <p>{t('about.card.p1')}</p>
              <p>{t('about.card.p2')}</p>
              <p className="border-t border-white/10 pt-4 text-xs text-white/50">
                {t('about.card.disclaimer')}
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="services" className="scroll-mt-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-celestial-gold">{t('about.services.label')}</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">{t('about.services.title')}</h2>
            <p className="mt-4 leading-relaxed text-white/65">{t('about.services.desc')}</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {serviceKeys.map((key, i) => {
              const Icon = serviceIcons[i];
              return (
                <Card key={key} className="group transition-colors hover:border-celestial-violet/50">
                  <CardHeader>
                    <Icon className="h-6 w-6 text-celestial-gold" />
                    <CardTitle>{t(`${key}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-white/65">{t(`${key}.desc`)}</CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-obsidian-border bg-obsidian-soft/60 p-6 sm:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-celestial-violetBright">{t('about.process.label')}</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white">{t('about.process.title')}</h2>
          </div>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {stepKeys.map((key, i) => (
              <li key={key} className="border-t border-white/10 pt-4">
                <span className="font-serif text-2xl font-bold text-celestial-gold">{stepNumbers[i]}</span>
                <h3 className="mt-3 font-semibold text-white">{t(`${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{t(`${key}.desc`)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="py-20 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-celestial-gold" />
          <h2 className="mt-4 font-serif text-3xl font-bold text-white">{t('about.cta.title')}</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/65">
            {t('about.cta.desc')}
          </p>
          <Link
            href="/tool"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-celestial-violet px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-celestial-violetBright"
          >
            {t('about.cta.button')} <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}
