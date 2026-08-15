import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
    './src/stores/**/*.{ts,tsx}',
    './src/hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0A0B10',
          soft: '#141721',
          raised: '#1C1F2E',
          border: '#2A2E40',
        },
        celestial: {
          gold: '#D4AF37',
          goldBright: '#F0D06B',
          violet: '#7C4DFF',
          violetBright: '#A78BFA',
          cyan: '#4DD0E1',
          ember: '#FF7043',
          rose: '#F06292',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      backgroundImage: {
        'radial-celestial':
          'radial-gradient(circle at 50% 0%, rgba(124,77,255,0.18) 0%, rgba(10,11,16,0) 55%)',
        'radial-gold':
          'radial-gradient(circle at 50% 100%, rgba(212,175,55,0.12) 0%, rgba(10,11,16,0) 60%)',
      },
      boxShadow: {
        glow: '0 0 24px 0 rgba(124,77,255,0.35)',
        'glow-gold': '0 0 20px 0 rgba(212,175,55,0.35)',
      },
      keyframes: {
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'spin-slow': 'spinSlow 60s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
