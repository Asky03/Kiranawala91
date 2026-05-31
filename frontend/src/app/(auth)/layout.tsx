/* ══════════════════════════════════════════════════════════════════════
 *  📁  DESTINATION:
 *      frontend/src/app/(auth)/layout.tsx  ← parens are literal in folder name
 *
 *  🆕 CREATE NEW
 *
 *  📝  Shared layout for /login and /signup — centered card on cream background with brand wordmark
 *
 *  👉  Copy this entire file (including this header) to the destination above.
 *      You can delete this comment block after pasting — it's just a marker.
 * ══════════════════════════════════════════════════════════════════════ */

import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <header className="px-6 py-5">
        <Link
          href="/"
          className="font-display text-2xl font-semibold text-forest-700 hover:text-forest-800"
        >
          Kiranawala
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="px-6 py-4 text-center text-xs text-stone-500">
        Your neighborhood kirana, online.
      </footer>
    </div>
  );
}