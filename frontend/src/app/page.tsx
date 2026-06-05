import Link from 'next/link';

/**
 * Landing page — no external dependencies.
 * Renders even when the backend is down.
 * You can add the HealthStatus component back later once Postgres is running.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream-50">
      {/* Top nav */}
      <nav className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-xl font-semibold text-forest-700">
            Kiranawala
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-stone-700 hover:text-stone-900"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-saffron-600 px-4 py-2 text-sm font-medium text-white hover:bg-saffron-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="font-display text-5xl font-bold leading-tight text-stone-900 sm:text-6xl">
          Your <span className="text-saffron-600">neighborhood kirana</span>,
          <br />
          now online.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-stone-600">
          A direct channel between local Kirana stores and the people who live
          around them. Zero commission. Full ownership of your customer
          relationships.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/signup"
            className="rounded-lg bg-saffron-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-saffron-700"
          >
            Create your account
          </Link>
          <Link
            href="/login"
            className="rounded-lg border-2 border-forest-600 px-6 py-3 font-medium text-forest-700 transition hover:bg-forest-50"
          >
            Sign in
          </Link>
        </div>
      </section>

      {/* Three role cards */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              title: 'For customers',
              body: 'Discover kirana shops in your neighborhood. Order for pickup or delivery.',
            },
            {
              title: 'For shopkeepers',
              body: 'List your shop, manage inventory, accept orders. Keep 100% of your margins.',
            },
            {
              title: 'For everyone',
              body: 'Built for the way Indian neighborhoods already shop — relationships first, scale second.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold text-stone-900">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-stone-600">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-stone-500">
          Built with care for local commerce.
        </div>
      </footer>
    </main>
  );
}