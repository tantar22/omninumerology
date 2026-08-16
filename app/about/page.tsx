import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, Gem, Heart, Moon, Sparkles, Stars } from 'lucide-react';
import { CosmicBackground } from '@/components/CosmicBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About Supriya Tambe | OmniNumerology',
  description:
    'Learn about Supriya Tambe’s numerology and aura cleansing guidance, and explore her wellness-focused services.',
};

const services = [
  {
    icon: Stars,
    title: 'Personal Numerology Reading',
    description:
      'A thoughtful reading of your core numbers, life path, personal cycles, and the themes that may support reflection and clarity.',
  },
  {
    icon: Compass,
    title: 'Name & Business Numerology',
    description:
      'Explore the energetic patterns in a name, with practical guidance for personal, professional, or business identity choices.',
  },
  {
    icon: Gem,
    title: 'Lo Shu & Vedic Insights',
    description:
      'Discover patterns through the Lo Shu grid and Vedic number traditions, including strengths, missing numbers, and balancing practices.',
  },
  {
    icon: Sparkles,
    title: 'Aura Cleansing & Energy Balancing',
    description:
      'Gentle, wellness-oriented practices intended to support calm, grounding, and a renewed sense of personal space.',
  },
];

const steps = [
  ['01', 'Share your details', 'Bring your name and birth details so the session can be personal to you.'],
  ['02', 'Receive your reading', 'Explore your numbers and questions in a calm, supportive conversation.'],
  ['03', 'Take aligned next steps', 'Leave with reflections and simple practices to carry into everyday life.'],
];

export default function AboutSupriyaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <CosmicBackground segment="landing" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <nav aria-label="Primary navigation" className="mb-12 flex items-center justify-between gap-4">
          <Link href="/" className="font-serif text-xl font-bold text-white transition-colors hover:text-celestial-gold">
            Omni<span className="text-celestial-gold">Numerology</span>
          </Link>
          <Link
            href="/#numerology-tool"
            className="inline-flex items-center gap-2 rounded-md border border-celestial-gold/40 px-3 py-2 text-sm font-medium text-celestial-gold transition-colors hover:border-celestial-gold hover:bg-celestial-gold/10"
          >
            Try the tool <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>

        <section className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-celestial-gold/30 bg-celestial-gold/10 px-3 py-1 text-sm font-medium text-celestial-goldBright">
              <Moon className="h-4 w-4" /> Numerology &amp; Aura Cleansing
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
              Guidance that helps you reconnect with your inner direction.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Welcome — I’m <span className="font-semibold text-white">Supriya Tambe</span>. Through numerology and aura
              cleansing, I offer a gentle space for reflection, self-understanding, and intentional next steps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-md bg-celestial-gold px-5 py-3 text-sm font-semibold text-obsidian transition-colors hover:bg-celestial-goldBright"
              >
                Explore services <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-md border border-obsidian-border px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-celestial-violet/60 hover:text-white"
              >
                Use the numerology tool
              </Link>
            </div>
          </div>

          <Card className="border-celestial-gold/25 bg-gradient-to-b from-celestial-gold/10 to-obsidian-soft/80 shadow-glow-gold">
            <CardHeader className="pb-2">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-celestial-gold/15 text-celestial-goldBright">
                <Heart className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">A thoughtful, grounded approach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-white/70">
              <p>
                Supriya has completed training in numerology and aura cleansing. Her practice brings these traditions
                together with attentive listening and practical, everyday reflection.
              </p>
              <p>
                Each session is personal, confidential, and focused on the questions that matter most to you.
              </p>
              <p className="border-t border-white/10 pt-4 text-xs text-white/50">
                These services are intended for spiritual reflection and personal wellbeing. They do not replace medical,
                mental-health, legal, or financial advice.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="services" className="scroll-mt-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-celestial-gold">Services</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">Support for your unique journey</h2>
            <p className="mt-4 leading-relaxed text-white/65">
              Choose a focused reading or combine areas in a session that is shaped around your current intention.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="group transition-colors hover:border-celestial-violet/50">
                  <CardHeader>
                    <Icon className="h-6 w-6 text-celestial-gold" />
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-white/65">{service.description}</CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-obsidian-border bg-obsidian-soft/60 p-6 sm:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-celestial-violetBright">What to expect</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white">A clear, personal process</h2>
          </div>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map(([number, title, description]) => (
              <li key={number} className="border-t border-white/10 pt-4">
                <span className="font-serif text-2xl font-bold text-celestial-gold">{number}</span>
                <h3 className="mt-3 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="py-20 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-celestial-gold" />
          <h2 className="mt-4 font-serif text-3xl font-bold text-white">Start with your numbers</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/65">
            Use the OmniNumerology tool to explore your core number patterns, then bring your questions to a personal
            session with Supriya.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-celestial-violet px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-celestial-violetBright"
          >
            Explore my numerology <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}
