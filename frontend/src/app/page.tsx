import { Suspense } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Store,
  ShoppingBasket,
  ShieldCheck,
  Sparkles,
  Activity,
} from 'lucide-react';
import { HealthStatus } from '@/components/shared/HealthStatus';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ──── Background atmosphere ──── */}
      <div
        className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full
                   bg-gradient-to-br from-saffron-200/40 via-cream-100/0 to-forest-100/30 blur-3xl
                   pointer-events-none"
        aria-hidden
      />

      {/* ──── Nav ──── */}
      <nav className="relative container-pad flex items-center justify-between py-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-9 w-9 rounded-xl bg-saffron-500 grid place-items-center shadow-soft group-hover:rotate-6 transition-transform">
            <ShoppingBasket className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-2xl font-semibold tracking-tight">
            Kiranawala
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link
            href="#how"
            className="px-4 py-2 text-sm text-ink-600 hover:text-ink-900 transition-colors"
          >
            How it works
          </Link>
          <Link
            href="#shopkeepers"
            className="px-4 py-2 text-sm text-ink-600 hover:text-ink-900 transition-colors"
          >
            For Shopkeepers
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            className="px-4 py-2 text-sm text-ink-600 hover:text-ink-900 transition-colors"
          >
            GitHub ↗
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login" className="btn-ghost text-sm hidden sm:inline-flex">
            Sign in
          </Link>
          <Link href="/signup" className="btn-primary text-sm">
            Get started
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* ──── Hero ──── */}
      <section className="relative container-pad pt-12 md:pt-24 pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-8 text-saffron-700">
            <Sparkles className="h-4 w-4" />
            <span className="font-mono text-xs uppercase tracking-[0.2em]">
              Day 1 · Foundation shipped
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] text-balance">
            Your neighbourhood,{' '}
            <span className="italic text-saffron-600 font-light">delivered</span>
            <span className="text-saffron-500">.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg md:text-xl text-ink-600 leading-relaxed text-pretty">
            The local Kirana shops that power Indian streets, finally online. Zero commission.
            Direct ordering. Pickup or local delivery from people you actually know.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/signup" className="btn-primary text-base px-6 py-4">
              Shop nearby
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/signup?role=shopkeeper" className="btn-ghost text-base px-6 py-4">
              List your shop
            </Link>
          </div>

          {/* Live status — proves end-to-end works */}
          <div className="mt-12">
            <Suspense
              fallback={
                <div className="inline-flex items-center gap-3 rounded-full px-4 py-2 border bg-ink-50 border-ink-200 text-ink-500">
                  <Activity className="h-4 w-4 animate-slow-pulse" />
                  <span className="text-sm">Checking system status…</span>
                </div>
              }
            >
              <HealthStatus />
            </Suspense>
          </div>
        </div>

        {/* Decorative side block */}
        <div
          className="hidden lg:block absolute right-12 top-32 w-72 h-72 pointer-events-none"
          aria-hidden
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-0 rounded-3xl bg-cream-100 border border-cream-200 rotate-6" />
            <div className="absolute inset-0 rounded-3xl bg-white border border-ink-100 shadow-soft-lg -rotate-3 p-8 flex flex-col justify-between">
              <div>
                <div className="font-mono text-2xs text-ink-400 uppercase tracking-widest">
                  Order #KW-0001
                </div>
                <div className="font-display text-3xl mt-1">₹247</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-600">Toor Dal · 1kg</span>
                  <span className="font-mono">₹148</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-600">Amul Butter · 100g</span>
                  <span className="font-mono">₹62</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-600">Parle-G · 1pc</span>
                  <span className="font-mono">₹37</span>
                </div>
              </div>
              <div className="badge bg-forest-50 text-forest-700 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-500" />
                Out for pickup
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Value pillars ──── */}
      <section id="how" className="relative container-pad py-20 border-t border-ink-100">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Store,
              eyebrow: 'For Shopkeepers',
              title: 'Own your customers.',
              body: 'No 25% commission. No platform fees. Direct relationship, direct payment, direct trust.',
            },
            {
              icon: ShoppingBasket,
              eyebrow: 'For Customers',
              title: 'Know who you buy from.',
              body: 'The bhaiya around the corner who saved you during the monsoon — now one tap away.',
            },
            {
              icon: ShieldCheck,
              eyebrow: 'For Communities',
              title: 'Keep wealth local.',
              body: 'Every rupee stays in your neighbourhood. Local commerce, dignified, digital.',
            },
          ].map(({ icon: Icon, eyebrow, title, body }, i) => (
            <article
              key={title}
              className="card p-8 hover:shadow-soft-lg transition-shadow group"
              style={{ animation: `fade-up 0.6s ease-out ${i * 0.1}s both` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-saffron-50 grid place-items-center group-hover:bg-saffron-500 transition-colors">
                  <Icon className="h-5 w-5 text-saffron-600 group-hover:text-white transition-colors" />
                </div>
                <span className="font-mono text-2xs text-ink-400 uppercase tracking-widest">
                  {eyebrow}
                </span>
              </div>
              <h3 className="font-display text-2xl font-medium mb-3">{title}</h3>
              <p className="text-ink-600 leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ──── Footer ──── */}
      <footer className="relative container-pad py-12 border-t border-ink-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-ink-500">
            <span className="font-mono">© 2026 Kiranawala</span>
            <span className="text-ink-300">·</span>
            <span>Built with care in India</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-ink-500">
            <Link href="/docs" className="hover:text-ink-900 transition-colors">
              Docs
            </Link>
            <Link href="https://github.com" className="hover:text-ink-900 transition-colors">
              GitHub
            </Link>
            <span className="font-mono text-2xs text-ink-400">v0.1.0</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
