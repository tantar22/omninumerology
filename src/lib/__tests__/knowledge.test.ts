import { describe, expect, it } from 'vitest';
import {
  KNOWLEDGE_BASE,
  composeLocalAnswer,
  retrieve,
  tokenize,
} from '../knowledge';

describe('tokenize', () => {
  it('splits on non-letter/number and lowercases', () => {
    expect(tokenize('What is the Life Path Number?')).toEqual([
      'what',
      'is',
      'the',
      'life',
      'path',
      'number',
    ]);
  });

  it('tokenizes Devanagari text', () => {
    const tokens = tokenize('मेरा जीवन पथ अंक क्या है');
    expect(tokens).toContain('जीवन');
    expect(tokens).toContain('पथ');
  });
});

describe('retrieve', () => {
  it('ranks Life Path question to the life-path entry', () => {
    const results = retrieve('what is my life path number', 'en');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].entry.id).toBe('num-life-path');
  });

  it('matches planets question across keywords', () => {
    const results = retrieve('which planet rules each number', 'en');
    expect(results.map((r) => r.entry.id)).toContain('vedic-planets');
  });

  it('matches Hindi question via localized body text', () => {
    const results = retrieve('पंचतत्त्व क्या है', 'hi');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].entry.id).toBe('panchatatva-basics');
  });

  it('matches Marathi Reiki question', () => {
    const results = retrieve('रेकी कसे कार्य करते', 'mr');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].entry.id).toBe('reiki-basics');
  });

  it('returns empty for stop-word-only queries', () => {
    expect(retrieve('what is the', 'en')).toEqual([]);
  });
});

describe('composeLocalAnswer', () => {
  it('produces localized text with a disclaimer', () => {
    const answer = composeLocalAnswer('what is my life path number', 'en');
    expect(answer.text).toContain('Life Path Number');
    expect(answer.text).toContain('not medical');
    expect(answer.sources).toContain('num-life-path');
  });

  it('produces a fallback with disclaimer for unmatched queries', () => {
    const answer = composeLocalAnswer('quantum banana', 'en');
    expect(answer.sources).toEqual([]);
    expect(answer.text).toContain('not medical');
  });
});

describe('knowledge base integrity', () => {
  it('has entries for every required subject', () => {
    const topics = new Set(KNOWLEDGE_BASE.map((e) => e.topic));
    for (const expected of ['app', 'numerology', 'vedic', 'chaldean', 'kabbalah', 'loshu', 'reiki', 'panchatatva', 'aura', 'synastry', 'wellness']) {
      expect(topics).toContain(expected);
    }
  });

  it('has no empty localized fields', () => {
    for (const entry of KNOWLEDGE_BASE) {
      expect(entry.title.en.trim()).not.toBe('');
      expect(entry.title.hi.trim()).not.toBe('');
      expect(entry.title.mr.trim()).not.toBe('');
      expect(entry.body.en.trim()).not.toBe('');
      expect(entry.body.hi.trim()).not.toBe('');
      expect(entry.body.mr.trim()).not.toBe('');
    }
  });
});
