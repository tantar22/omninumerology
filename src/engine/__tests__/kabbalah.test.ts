import { describe, expect, it } from 'vitest';
import {
  KABBALAH_TABLE,
  SEPHIROT,
  kabbalahLetterValue,
  kabbalahNameValue,
  kabbalahNameNumber,
  sephiraFor,
  calculateKabbalah,
} from '../kabbalah';

describe('kabbalah letter values', () => {
  it('maps positional values', () => {
    expect(kabbalahLetterValue('A')).toBe(1);
    expect(kabbalahLetterValue('J')).toBe(10);
    expect(kabbalahLetterValue('S')).toBe(100);
    expect(kabbalahLetterValue('Z')).toBe(800);
    expect(kabbalahLetterValue('z')).toBe(800);
    expect(kabbalahLetterValue('!')).toBe(0);
  });

  it('has 26 entries', () => {
    expect(Object.keys(KABBALAH_TABLE)).toHaveLength(26);
  });
});

describe('kabbalah name numbers', () => {
  it('sums positional values', () => {
    expect(kabbalahNameValue('JOHN')).toBe(128);
  });

  it('reduces to a single digit', () => {
    expect(kabbalahNameNumber('JOHN')).toBe(2);
  });
});

describe('sephirot', () => {
  it('maps numbers to sephirah', () => {
    expect(sephiraFor(1).name).toBe('Kether');
    expect(sephiraFor(2).name).toBe('Chokhmah');
    expect(sephiraFor(9).name).toBe('Yesod');
    expect(sephiraFor(10).name).toBe('Kether');
  });

  it('has ten sephirot', () => {
    expect(Object.keys(SEPHIROT)).toHaveLength(10);
  });
});

describe('calculateKabbalah', () => {
  it('returns the full result', () => {
    const result = calculateKabbalah('JOHN');
    expect(result.nameValue).toBe(128);
    expect(result.number).toBe(2);
    expect(result.sephira.name).toBe('Chokhmah');
  });
});
