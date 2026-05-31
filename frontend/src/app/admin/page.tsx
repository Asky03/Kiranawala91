/* ══════════════════════════════════════════════════════════════════════
 *  📁  DESTINATION:
 *      frontend/src/app/admin/page.tsx
 *
 *  🆕 CREATE NEW    →    URL: /admin
 *
 *  📝  Admin dashboard home — DARK console (says "Admin console", shows stat cards)
 *
 *  👉  Copy this entire file (including this header) to the destination above.
 *      You can delete this comment block after pasting — it's just a marker.
 * ══════════════════════════════════════════════════════════════════════ */

'use client';

import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

/**
 * Admin home page at /admin.
 * Protected by middleware.ts (ADMIN role only).
 * The /admin/login page is the public exception inside this prefix.
 */
export default function AdminHomePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    await logout();
    router.replace('/admin/login');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <header className="border-b border-stone-800 bg-stone-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="font-display text-xl font-semibold">
            Kiranawala <span className="text-stone-500">/ admin</span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-400">{user?.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-stone-300 hover:bg-stone-800"
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="font-display text-2xl font-semibold">Admin console</h2>
        <p className="mt-2 text-stone-400">
          Shop approvals, user management, and platform health will live here.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: 'Pending shop approvals', value: '—' },
            { label: 'Total users', value: '—' },
            { label: 'Orders today', value: '—' },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-stone-800 bg-stone-900 p-5"
            >
              <div className="text-xs uppercase tracking-wider text-stone-500">
                {card.label}
              </div>
              <div className="mt-2 font-mono text-3xl font-semibold">{card.value}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}