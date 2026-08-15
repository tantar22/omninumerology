'use client';

import { useMemo, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export type CosmicSegment =
  | 'landing'
  | 'overview'
  | 'wheel'
  | 'loshu'
  | 'clock'
  | 'optimizer'
  | 'energy'
  | 'synastry'
  | 'oracle';

interface Palette {
  primary: string;
  secondary: string;
  tertiary: string;
}

const PALETTES: Record<CosmicSegment, Palette> = {
  landing: { primary: 'rgba(124,77,255,0.32)', secondary: 'rgba(212,175,55,0.18)', tertiary: 'rgba(77,208,225,0.12)' },
  overview: { primary: 'rgba(212,175,55,0.32)', secondary: 'rgba(240,208,107,0.16)', tertiary: 'rgba(124,77,255,0.14)' },
  wheel: { primary: 'rgba(124,77,255,0.36)', secondary: 'rgba(167,139,250,0.18)', tertiary: 'rgba(212,175,55,0.12)' },
  loshu: { primary: 'rgba(77,208,225,0.30)', secondary: 'rgba(124,77,255,0.18)', tertiary: 'rgba(212,175,55,0.10)' },
  clock: { primary: 'rgba(255,112,67,0.28)', secondary: 'rgba(212,175,55,0.16)', tertiary: 'rgba(124,77,255,0.12)' },
  optimizer: { primary: 'rgba(212,175,55,0.30)', secondary: 'rgba(240,208,107,0.16)', tertiary: 'rgba(77,208,225,0.12)' },
  energy: { primary: 'rgba(240,98,146,0.28)', secondary: 'rgba(124,77,255,0.22)', tertiary: 'rgba(77,208,225,0.12)' },
  synastry: { primary: 'rgba(240,98,146,0.32)', secondary: 'rgba(124,77,255,0.18)', tertiary: 'rgba(212,175,55,0.12)' },
  oracle: { primary: 'rgba(124,77,255,0.32)', secondary: 'rgba(77,208,225,0.18)', tertiary: 'rgba(212,175,55,0.12)' },
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Star {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function CosmicBackground({ segment }: { segment: CosmicSegment }) {
  const stars = useMemo<Star[]>(() => {
    const rand = mulberry32(20260815);
    return Array.from({ length: 140 }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      size: 1 + rand() * 1.7,
      duration: 2.5 + rand() * 5,
      delay: rand() * 6,
      opacity: 0.25 + rand() * 0.65,
    }));
  }, []);

  const p = PALETTES[segment] ?? PALETTES.landing;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #05060a 0%, #0a0b10 55%, #0d0f18 100%)' }}
      />

      <div className="absolute inset-0">
        {stars.map((s, i) => {
          const style = {
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            boxShadow: s.size > 2.1 ? '0 0 8px rgba(255,255,255,0.55)' : undefined,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            '--twinkle-o': s.opacity,
          } as CSSProperties;
          return <span key={i} className="absolute rounded-full bg-white" style={style} />;
        })}
      </div>

      <AnimatePresence mode="sync">
        <motion.div
          key={segment}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div className="absolute -top-[20%] left-1/2 h-[70vh] w-[80vw] -translate-x-1/2">
            <div
              className="h-full w-full rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${p.primary} 0%, transparent 70%)`,
                animation: 'nebulaDrift 18s ease-in-out infinite',
              }}
            />
          </div>
          <div className="absolute top-[28%] -left-[18%] h-[62vh] w-[55vw]">
            <div
              className="h-full w-full rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${p.secondary} 0%, transparent 70%)`,
                animation: 'nebulaDrift 22s ease-in-out 2s infinite',
              }}
            />
          </div>
          <div className="absolute -right-[18%] bottom-[-8%] h-[58vh] w-[58vw]">
            <div
              className="h-full w-full rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${p.tertiary} 0%, transparent 70%)`,
                animation: 'nebulaDrift 26s ease-in-out 4s infinite',
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.5) 100%)' }}
      />
    </div>
  );
}
