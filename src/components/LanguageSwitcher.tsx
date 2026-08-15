'use client';

import { LANGUAGES } from '@/lib/i18n';
import { useLanguage } from '@/lib/i18n-client';
import { cn } from '@/lib/utils';

/** Compact three-way language toggle: English / हिन्दी / मराठी. */
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-obsidian-soft/60 p-1">
      {LANGUAGES.map((option) => {
        const active = option.code === language;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLanguage(option.code)}
            aria-pressed={active}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium transition-colors',
              active
                ? 'bg-celestial-gold text-obsidian'
                : 'text-white/60 hover:bg-white/5 hover:text-white',
            )}
          >
            {option.native}
          </button>
        );
      })}
    </div>
  );
}
