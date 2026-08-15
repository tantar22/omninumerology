/**
 * Oracle service — bounded, zero-hallucination analysis.
 *
 * The oracle NEVER invents content: every sentence is derived from the
 * pre-computed matrix numbers plus the shared knowledge base. The input prompt
 * only selects WHICH grounded sections to emit, and the language selects the
 * localized knowledge base and connecting phrases.
 */
import { UnifiedMatrix } from '../../engine';
import { COMPOUND_MEANINGS } from '../../engine/chaldean';
import { NUMBER_TATTVA, reduceDigit, type TattvaKey } from '../../lib/meanings';
import { isLanguage, resolveMeanings, type Language } from '../../lib/i18n';
import { translate, type UiKey } from '../../lib/i18n-strings';

export interface AnalysisSection {
  heading: string;
  body: string[];
}

/** Pick the description for a number, falling back for out-of-range masters. */
function meaningFor(map: Record<number, { description: string }>, n: number): string {
  return map[n]?.description ?? map[((n - 1) % 9) + 1]?.description ?? 'No interpretation available.';
}

/**
 * Compose a deterministic analysis from a matrix and a free-text prompt.
 * The prompt's topic keywords gate which grounded sections are included.
 */
export function composeAnalysis(matrix: UnifiedMatrix, prompt: string, language: Language = 'en'): AnalysisSection[] {
  const lang = isLanguage(language) ? language : 'en';
  const b = resolveMeanings(lang);
  const tx = (key: UiKey, vars?: Record<string, string | number>) => translate(lang, key, vars);

  const p = matrix.pythagorean;
  const v = matrix.vedic;
  const c = matrix.chaldean;
  const mt = matrix.microtiming;
  const q = prompt.toLowerCase();

  const sections: AnalysisSection[] = [];

  sections.push({
    heading: tx('oracle.coreHeading'),
    body: [
      tx('oracle.coreLifePath', { n: p.lifePath, meaning: meaningFor(b.LIFE_PATH, p.lifePath) }),
      tx('oracle.coreExpression', { n: p.expression, meaning: meaningFor(b.EXPRESSION, p.expression) }),
      tx('oracle.coreSoulUrge', { n: p.soulUrge, meaning: meaningFor(b.SOUL_URGE, p.soulUrge) }),
      tx('oracle.coreVedic', {
        moolank: v.moolank,
        moolankPlanet: v.moolankPlanet,
        bhagyank: v.bhagyank,
        bhagyankPlanet: v.bhagyankPlanet,
      }),
    ],
  });

  if (/career|work|business|job|money|finance|wealth/.test(q)) {
    sections.push({
      heading: tx('oracle.vocationHeading'),
      body: [
        tx('oracle.vocationExpression', {
          n: p.expression,
          meaning: meaningFor(b.EXPRESSION, p.expression),
        }),
        tx('oracle.vocationYear', { n: mt.personalYear, meaning: meaningFor(b.PERSONAL_CYCLE, mt.personalYear) }),
      ],
    });
  }

  if (/love|relationship|partner|marriage|romance/.test(q)) {
    sections.push({
      heading: tx('oracle.relationsHeading'),
      body: [
        tx('oracle.relationsSoulUrge', {
          n: p.soulUrge,
          meaning: meaningFor(b.SOUL_URGE, p.soulUrge),
        }),
        tx('oracle.relationsVedic', {
          moolank: v.moolank,
          bhagyank: v.bhagyank,
          relation: v.driverConductor,
        }),
      ],
    });
  }

  if (/today|day|now|hour|timing|schedule|when/.test(q)) {
    sections.push({
      heading: tx('oracle.timingHeading'),
      body: [
        tx('oracle.timingYear', { n: mt.personalYear, meaning: meaningFor(b.PERSONAL_CYCLE, mt.personalYear) }),
        tx('oracle.timingMonthDay', { month: mt.personalMonth, day: mt.personalDay }),
      ],
    });
  }

  if (/name|spelling|chaldean|compound/.test(q)) {
    const compound = c.compound;
    const meaning = COMPOUND_MEANINGS[compound];
    sections.push({
      heading: tx('oracle.nameHeading'),
      body: [
        tx('oracle.nameCurrent', {
          single: c.single,
          compound,
          meaning: meaning ? ` — ${meaning.name} (${meaning.summary})` : '',
        }),
        meaning && !meaning.positive ? tx('oracle.nameCautionary') : tx('oracle.nameFavorable'),
      ],
    });
  }

  if (/missing|remedy|loshu|lo shu|balance|weakness|improve/.test(q)) {
    const remedies = matrix.loshu.missingNumbers.map((n) => `${n} — ${matrix.loshu.remedies[n]}`);
    sections.push({
      heading: tx('oracle.loshuHeading'),
      body: remedies.length
        ? [tx('oracle.loshuMissing', { list: matrix.loshu.missingNumbers.join(', ') }), ...remedies]
        : [tx('oracle.loshuNone')],
    });
  }

  if (/reiki|chakra|aura|cleanse|energy|element|tattva|panchatatva|heal/.test(q)) {
    const numbers = [p.lifePath, p.expression, p.soulUrge, p.personality, p.birthday, v.moolank, v.bhagyank];
    const tally: Record<TattvaKey, number> = { fire: 0, earth: 0, air: 0, water: 0, ether: 0 };
    for (const n of numbers) {
      const key = NUMBER_TATTVA[reduceDigit(n)] ?? 'ether';
      tally[key] += 1;
    }
    const weak = (Object.keys(tally) as TattvaKey[]).filter((k) => tally[k] === 0);
    const reiki = b.REIKI_NUMBER[reduceDigit(p.lifePath)] ?? b.REIKI_NUMBER[1];
    const aura = b.AURA_CLEANING[reduceDigit(p.lifePath)] ?? b.AURA_CLEANING[1];
    const balance = (Object.keys(tally) as TattvaKey[])
      .map((k) => `${b.PANCHATATVA[k].title} ${tally[k]}`)
      .join(', ');

    const body: string[] = [
      tx('oracle.energyBalance', { balance }),
      weak.length
        ? tx('oracle.energyAbsent', {
            elements: weak.map((k) => b.PANCHATATVA[k].title).join(', '),
            practices: b.PANCHATATVA[weak[0]].balance.join(' '),
          })
        : tx('oracle.energyBalanced'),
      tx('oracle.energyReiki', {
        n: p.lifePath,
        chakra: reiki.chakra,
        symbol: reiki.symbol,
        focus: reiki.focus,
      }),
      tx('oracle.energyAura', { color: aura.color, practice: aura.practice }),
      tx('oracle.energyDaily', { ritual: b.DAILY_AURA_RITUAL.join(' ') }),
    ];
    sections.push({ heading: tx('oracle.energyHeading'), body });
  }

  if (sections.length === 1) {
    sections.push({
      heading: tx('oracle.generalHeading'),
      body: [
        tx('oracle.generalYear', { n: mt.personalYear, meaning: meaningFor(b.PERSONAL_CYCLE, mt.personalYear) }),
        tx('oracle.generalDay', { day: mt.personalDay }),
      ],
    });
  }

  return sections;
}

/** Stream the composed analysis as text chunks (for SSE delivery). */
export async function* streamAnalysis(
  matrix: UnifiedMatrix,
  prompt: string,
  language: Language = 'en',
): AsyncGenerator<string> {
  const sections = composeAnalysis(matrix, prompt, language);
  for (const section of sections) {
    yield `## ${section.heading}\n`;
    for (const line of section.body) {
      yield `${line}\n`;
    }
    yield '\n';
  }
}
