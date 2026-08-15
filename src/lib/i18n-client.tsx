'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { resolveMeanings, type Language } from './i18n';
import { translate, type UiKey } from './i18n-strings';
import type { MeaningsBundle } from './meanings';

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  meanings: MeaningsBundle;
  t: (key: UiKey, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = useCallback((next: Language) => setLanguageState(next), []);

  const meanings = useMemo(() => resolveMeanings(language), [language]);

  const t = useCallback(
    (key: UiKey, vars?: Record<string, string | number>) => translate(language, key, vars),
    [language],
  );

  const value = useMemo(() => ({ language, setLanguage, meanings, t }), [language, meanings, setLanguage, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within a LanguageProvider');
  }
  return ctx;
}

/** The active language and its setter. */
export function useLanguage(): { language: Language; setLanguage: (language: Language) => void } {
  const { language, setLanguage } = useI18n();
  return { language, setLanguage };
}

/** The localized meanings bundle for the active language. */
export function useMeanings(): MeaningsBundle {
  return useI18n().meanings;
}

/** A UI-string translator bound to the active language. */
export function useT(): (key: UiKey, vars?: Record<string, string | number>) => string {
  return useI18n().t;
}
