'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useMeanings, useT } from '@/lib/i18n-client';
import { apiUrl } from '@/lib/api';
import { DateSelect } from '@/components/DateSelect';

interface Member {
  fullName: string;
  birthDate: string;
}

interface TeamResult {
  team: {
    memberCount: number;
    missingNumbers: number[];
    presentNumbers: number[];
    activePlanes: string[];
    missingPlanes: string[];
    overallStrength: number;
    missingCompetencies: { number: number; remedy: string }[];
  };
  meanCompatibility: number;
}

export function SynastryMatrix() {
  const m = useMeanings();
  const t = useT();
  const [members, setMembers] = useState<Member[]>([
    { fullName: '', birthDate: '1990-01-01' },
    { fullName: '', birthDate: '1990-01-01' },
  ]);
  const [result, setResult] = useState<TeamResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateMember(index: number, patch: Partial<Member>) {
    setMembers((prev) => prev.map((m2, i) => (i === index ? { ...m2, ...patch } : m2)));
  }

  function addMember() {
    if (members.length >= 20) return;
    setMembers((prev) => [...prev, { fullName: '', birthDate: '1990-01-01' }]);
  }

  async function onSubmit() {
    const profiles = members.filter((m2) => m2.fullName.trim());
    if (profiles.length < 2) {
      setError(t('syn.enterTwo'));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl('/api/synastry/team'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profiles }),
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error((payload as { error?: string }).error ?? 'Team analysis failed');
      }
      setResult((await res.json()) as TeamResult);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm leading-relaxed text-white/70">
        Team synastry merges every member&apos;s Lo Shu frequency grid into a single team matrix to reveal collective
        strengths and gaps. The compatibility score averages all pair-wise relationships, which are computed from the
        classical <em>elements</em> (Fire, Earth, Air, Water) of each person&apos;s core numbers.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {Object.entries(m.ELEMENTS_INFO).map(([key, info]) => (
          <div key={key} className="rounded-md border border-obsidian-border bg-obsidian-raised/50 p-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-white/70">{info.title}</span>
            <p className="mt-1 text-xs leading-relaxed text-white/50">{info.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {members.map((m2, i) => (
          <div key={i} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label>{t('syn.memberName', { i: i + 1 })}</Label>
              <Input
                value={m2.fullName}
                onChange={(e) => updateMember(i, { fullName: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label>{t('form.birthDate')}</Label>
              <DateSelect
                value={m2.birthDate}
                onChange={(iso) => updateMember(i, { birthDate: iso })}
                labels={{ day: t('form.day'), month: t('form.month'), year: t('form.year') }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="gold" onClick={onSubmit} disabled={loading}>
          {loading ? t('syn.analyzing') : t('syn.analyze')}
        </Button>
        <Button type="button" variant="outline" onClick={addMember} disabled={members.length >= 20}>
          {t('syn.addMember')}
        </Button>
      </div>

      {error && <p className="text-sm text-celestial-rose">{error}</p>}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>{t('syn.teamTitle', { n: result.team.memberCount })}</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge tone="gold">{t('syn.compatibility', { n: result.meanCompatibility })}</Badge>
              <Badge tone="violet">{t('syn.strength', { n: result.team.overallStrength.toFixed(0) })}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white/90">How compatibility is scored:</span> each pair&apos;s core
              numbers are compared by element — Life Path (40%), Expression (25%), Soul Urge (20%), Personality (10%)
              and Birthday (5%). Same or complementary elements score higher; clashing elements score lower. The team
              value is the mean of all pairs.
            </p>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="rounded-md border border-obsidian-border bg-obsidian-raised/50 p-3">
                <span className="text-xs uppercase tracking-wide text-white/50">{t('syn.activePlanes')}</span>
                <p className="mt-1 text-sm text-celestial-cyan">
                  {result.team.activePlanes.join(', ') || 'None'}
                </p>
              </div>
              <div className="rounded-md border border-obsidian-border bg-obsidian-raised/50 p-3">
                <span className="text-xs uppercase tracking-wide text-white/50">{t('syn.missingPlanes')}</span>
                <p className="mt-1 text-sm text-celestial-rose">
                  {result.team.missingPlanes.join(', ') || 'None'}
                </p>
              </div>
            </div>

            {result.team.missingCompetencies.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-white/50">{t('syn.missingCompetencies')}</span>
                {result.team.missingCompetencies.map((c) => (
                  <div key={c.number} className="rounded-md border border-obsidian-border bg-obsidian-raised/50 px-3 py-2">
                    <span className="text-sm font-semibold text-celestial-gold">
                      {t('loshu.numberTitle', { n: c.number })} — {m.CHALDEAN_SINGLE[c.number]?.title ?? 'Energy'}
                    </span>
                    <p className="text-sm text-white/70">{c.remedy}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
