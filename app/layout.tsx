import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'STNumerology | Supriya Tambe',
  description:
    'Personalised numerology insights and aura cleansing guidance by Supriya Tambe. Explore your core numbers, life path, and energy balance.',
  icons: {
    icon: '/favicon.svg',
    apple: '/logo-48.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0B10',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
