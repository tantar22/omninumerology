'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, Sparkles, X } from 'lucide-react';
import type { UnifiedMatrix } from '@/engine';
import { useAssistant } from '@/hooks/useAssistant';
import { useLanguage, useT } from '@/lib/i18n-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const SUGGESTIONS: { key: 'tabs' | 'numerology' | 'reiki' | 'panchatatva' | 'planets'; text: string }[] = [
  { key: 'tabs', text: '' },
  { key: 'numerology', text: '' },
  { key: 'reiki', text: '' },
  { key: 'panchatatva', text: '' },
  { key: 'planets', text: '' },
];

/** Minimal markdown-ish renderer for the local answer text. */
function renderText(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('### ')) {
      return (
        <p key={i} className="mt-2 font-semibold text-celestial-gold first:mt-0">
          {line.slice(4)}
        </p>
      );
    }
    if (line.trim() === '---') {
      return <hr key={i} className="my-2 border-white/10" />;
    }
    if (line.trim() === '') return <div key={i} className="h-2" />;
    return (
      <p key={i} className="leading-relaxed">
        {line}
      </p>
    );
  });
}

export function AssistantWidget({ matrix }: { matrix?: UnifiedMatrix | null }) {
  const { language } = useLanguage();
  const t = useT();
  const { text, streaming, error, send, stop } = useAssistant();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!streaming && !text) return;
    setMessages((m) => {
      const copy = [...m];
      const last = copy[copy.length - 1];
      if (last && last.role === 'assistant') {
        copy[copy.length - 1] = { ...last, text };
      }
      return copy;
    });
  }, [text, streaming]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const message = input.trim();
    if (!message || streaming) return;
    setMessages((m) => [...m, { role: 'user', text: message }, { role: 'assistant', text: '' }]);
    setInput('');
    void send(message, language, matrix);
  }

  function ask(text: string) {
    if (streaming) return;
    setMessages((m) => [...m, { role: 'user', text }, { role: 'assistant', text: '' }]);
    void send(text, language, matrix);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="flex h-[min(32rem,75dvh)] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-xl border border-obsidian-border bg-obsidian-soft/95 shadow-glow backdrop-blur-md sm:w-96"
          >
            <header className="flex items-center justify-between border-b border-obsidian-border px-4 py-3">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Sparkles className="h-4 w-4 text-celestial-gold" />
                  {t('assistant.title')}
                </h2>
                <p className="mt-0.5 text-xs text-white/50">{t('assistant.subtitle')}</p>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setMessages([])}
                    aria-label={t('assistant.clear')}
                    className="rounded-md p-1.5 text-white/50 transition-colors hover:text-white"
                  >
                    {t('assistant.clear')}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t('assistant.close')}
                  className="rounded-md p-1.5 text-white/50 transition-colors hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-white/50">{t('assistant.suggestTitle')}</p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => ask(t(`assistant.suggest.${s.key}` as never))}
                      className="block w-full rounded-lg border border-white/10 px-3 py-2 text-left text-xs text-white/70 transition-colors hover:border-celestial-gold/40 hover:text-white"
                    >
                      {t(`assistant.suggest.${s.key}` as never)}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={
                      m.role === 'user'
                        ? 'max-w-[85%] rounded-lg bg-celestial-violet/25 px-3 py-2 text-sm text-white'
                        : 'max-w-[85%] rounded-lg border border-obsidian-border bg-obsidian-raised px-3 py-2 text-sm text-white/85'
                    }
                  >
                    {m.role === 'assistant' ? (
                      <div className="whitespace-pre-wrap">
                        {renderText(m.text || (streaming ? '…' : ''))}
                      </div>
                    ) : (
                      <span className="whitespace-pre-wrap">{m.text}</span>
                    )}
                  </div>
                </div>
              ))}
              {error && <p className="text-xs text-celestial-rose">{error}</p>}
            </div>

            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-obsidian-border p-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('assistant.placeholder')}
                disabled={streaming}
              />
              {streaming ? (
                <Button type="button" variant="outline" onClick={stop}>
                  {t('assistant.stop')}
                </Button>
              ) : (
                <Button type="submit" variant="gold" disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">{t('assistant.send')}</span>
                </Button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t('assistant.close') : t('assistant.open')}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-celestial-gold text-obsidian shadow-glow-gold transition-colors hover:bg-celestial-goldBright"
      >
        {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}
