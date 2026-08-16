'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { postJson } from '@/hooks/useMatrix';
import { useMatrixStore } from '@/stores/useMatrixStore';
import type { UnifiedMatrix } from '@/engine';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MatrixWheel } from '@/components/MatrixWheel';
import { LoShuGrid } from '@/components/LoShuGrid';
import { PersonalHourClock } from '@/components/PersonalHourClock';
import { NameOptimizer } from '@/components/NameOptimizer';
import { SynastryMatrix } from '@/components/SynastryMatrix';
import { OracleChat } from '@/components/OracleChat';
import { CoreNumbers } from '@/components/CoreNumbers';
import { EnergyRemedies } from '@/components/EnergyRemedies';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { PdfReportButton } from '@/components/PdfReport';
import { CosmicBackground, type CosmicSegment } from '@/components/CosmicBackground';
import { DateSelect } from '@/components/DateSelect';
import { AssistantWidget } from '@/components/AssistantWidget';
import { useT } from '@/lib/i18n-client';

export default function Home() {
  const { input, targetDate, matrix, setInput, setTargetDate, setMatrix, setError, loading, setLoading, error } =
    useMatrixStore();
  const t = useT();
  const [activeTab, setActiveTab] = useState('overview');
  const segment: CosmicSegment = matrix ? (activeTab as CosmicSegment) : 'landing';

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.fullName.trim() || !input.birthDate) return;
    setLoading(true);
    setError(null);
    try {
      const result = await postJson<UnifiedMatrix>('/api/matrix/calculate', {
        ...input,
        targetDate,
      });
      setMatrix(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen">
      <CosmicBackground segment={segment} />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8 text-center">
          <nav aria-label="Primary navigation" className="mb-8 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/about"
              className="rounded-md border border-celestial-gold/40 px-3 py-2 text-sm font-medium text-celestial-gold transition-colors hover:border-celestial-gold hover:bg-celestial-gold/10"
            >
              About Supriya &amp; Services
            </Link>
            <a
              href="#numerology-tool"
              className="rounded-md px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              Numerology Tool
            </a>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Omni<span className="text-celestial-gold">Numerology</span>
          </motion.h1>
          <p className="mt-2 text-sm font-medium tracking-wide text-celestial-gold/90">Guidance by Supriya Tambe</p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">{t('app.subtitle')}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <LanguageSwitcher />
            <PdfReportButton disabled={!matrix} />
          </div>
        </header>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <Card id="numerology-tool" className="mb-8 scroll-mt-6">
            <CardHeader>
              <CardTitle>{t('form.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Label htmlFor="fullName">{t('form.fullName')}</Label>
                  <Input
                    id="fullName"
                    value={input.fullName}
                    onChange={(e) => setInput({ fullName: e.target.value })}
                    placeholder="e.g. John Alexander Smith"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="currentName">{t('form.currentName')}</Label>
                  <Input
                    id="currentName"
                    value={input.currentName ?? ''}
                    onChange={(e) => setInput({ currentName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate">{t('form.birthDate')}</Label>
                  <DateSelect
                    value={input.birthDate}
                    onChange={(iso) => setInput({ birthDate: iso })}
                    labels={{ day: t('form.day'), month: t('form.month'), year: t('form.year') }}
                  />
                </div>
                <div>
                  <Label htmlFor="birthTime">{t('form.birthTime')}</Label>
                  <Input
                    id="birthTime"
                    type="time"
                    value={input.birthTime ?? ''}
                    onChange={(e) => setInput({ birthTime: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="birthCity">{t('form.birthCity')}</Label>
                  <Input
                    id="birthCity"
                    value={input.birthCity ?? ''}
                    onChange={(e) => setInput({ birthCity: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="targetDate">{t('form.targetDate')}</Label>
                  <DateSelect
                    value={targetDate}
                    onChange={setTargetDate}
                    labels={{ day: t('form.day'), month: t('form.month'), year: t('form.year') }}
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" variant="gold" className="w-full" disabled={loading}>
                    {loading ? t('form.calculating') : t('form.calculate')}
                  </Button>
                </div>
              </form>
              {error && <p className="mt-3 text-sm text-celestial-rose">{error}</p>}
            </CardContent>
          </Card>
        </motion.div>

        {matrix && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex-wrap">
                <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
                <TabsTrigger value="wheel">{t('tabs.wheel')}</TabsTrigger>
                <TabsTrigger value="loshu">{t('tabs.loshu')}</TabsTrigger>
                <TabsTrigger value="clock">{t('tabs.clock')}</TabsTrigger>
                <TabsTrigger value="optimizer">{t('tabs.optimizer')}</TabsTrigger>
                <TabsTrigger value="energy">{t('tabs.energy')}</TabsTrigger>
                <TabsTrigger value="synastry">{t('tabs.synastry')}</TabsTrigger>
                <TabsTrigger value="oracle">{t('tabs.oracle')}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="mb-6 flex flex-wrap gap-2">
                  <Badge tone="gold">
                    {t('badge.lifePath')} {matrix.rootRulers.lifePath}
                  </Badge>
                  <Badge tone="violet">
                    {t('badge.expression')} {matrix.rootRulers.expression}
                  </Badge>
                  <Badge tone="cyan">
                    {t('badge.driver')} {matrix.rootRulers.driver}
                  </Badge>
                  <Badge tone="muted">
                    {t('badge.conductor')} {matrix.rootRulers.conductor}
                  </Badge>
                </div>
                <CoreNumbers />
              </TabsContent>

              <TabsContent value="wheel">
                <Card>
                  <CardContent className="pt-5">
                    <MatrixWheel />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="loshu">
                <Card>
                  <CardContent className="pt-5">
                    <LoShuGrid />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clock">
                <Card>
                  <CardContent className="pt-5">
                    <PersonalHourClock />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="optimizer">
                <Card>
                  <CardContent className="pt-5">
                    <NameOptimizer />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="energy">
                <Card>
                  <CardContent className="pt-5">
                    <EnergyRemedies />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="synastry">
                <Card>
                  <CardContent className="pt-5">
                    <SynastryMatrix />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="oracle">
                <OracleChat />
              </TabsContent>
            </Tabs>
          </motion.div>
        )}

        {matrix && (
          <div
            id="omni-report"
            aria-hidden
            className="pointer-events-none absolute left-[-10000px] top-0 w-[900px] bg-[#0A0B10] p-8 text-white"
          >
            <div className="mb-8 border-b border-white/10 pb-6">
              <h1 className="font-serif text-3xl font-bold">{t('report.title')}</h1>
              <p className="mt-1 text-sm text-white/60">{t('report.generated')}</p>
              <p className="mt-3 text-sm text-white/80">
                {input.fullName}
                {input.birthDate ? ` · ${input.birthDate}` : ''}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="gold">
                  {t('badge.lifePath')} {matrix.rootRulers.lifePath}
                </Badge>
                <Badge tone="violet">
                  {t('badge.expression')} {matrix.rootRulers.expression}
                </Badge>
                <Badge tone="cyan">
                  {t('badge.driver')} {matrix.rootRulers.driver}
                </Badge>
                <Badge tone="muted">
                  {t('badge.conductor')} {matrix.rootRulers.conductor}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <CoreNumbers />
              <LoShuGrid />
              <EnergyRemedies />
            </div>
          </div>
        )}
      </div>

      <AssistantWidget matrix={matrix} />
    </main>
  );
}
