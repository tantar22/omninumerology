import { EN_MEANINGS, type MeaningsBundle } from './meanings';
import { hiMeanings } from './translations/hi';
import { mrMeanings } from './translations/mr';

/** Supported interface languages. */
export type Language = 'en' | 'hi' | 'mr';

export interface LanguageOption {
  code: Language;
  native: string;
}

/** The three languages offered by the UI toggle, in display order. */
export const LANGUAGES: LanguageOption[] = [
  { code: 'en', native: 'English' },
  { code: 'hi', native: 'हिन्दी' },
  { code: 'mr', native: 'मराठी' },
];

const BUNDLES: Record<Language, MeaningsBundle> = {
  en: EN_MEANINGS,
  hi: hiMeanings,
  mr: mrMeanings,
};

/** Resolve the interpretive meanings bundle for a language (English as fallback). */
export function resolveMeanings(language: Language): MeaningsBundle {
  return BUNDLES[language] ?? EN_MEANINGS;
}

/** Type guard for validating language values that cross the API boundary. */
export function isLanguage(value: unknown): value is Language {
  return value === 'en' || value === 'hi' || value === 'mr';
}
