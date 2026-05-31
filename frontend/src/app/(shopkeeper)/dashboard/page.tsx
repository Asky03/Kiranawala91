/* ══════════════════════════════════════════════════════════════════════
 *  📁  DESTINATION:
 *      frontend/src/app/(shopkeeper)/dashboard/page.tsx
 *
 *  🆕 CREATE NEW    →    URL: /dashboard
 *
 *  📝  Shopkeeper dashboard home (says "Shopkeeper Dashboard" header, "Welcome back, {name}")
 *
 *  👉  Copy this entire file (including this header) to the destination above.
 *      You can delete this comment block after pasting — it's just a marker.
 * ══════════════════════════════════════════════════════════════════════ */

'use client';

import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

/**
 * Shopkeeper dashboard.
 * Reachable only by SHOPKEEPER (or ADMIN) — enforced by middleware.ts.
 * If a CUSTOMER somehow lands here, middleware sends them to /.
 */
export default function ShopkeeperDashboardPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="font-display text-xl font-semibold text-forest-700">
            Shopkeeper Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-600">Hi, {user?.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="font-display text-2xl font-semibold text-stone-900">
          Welcome back, {user?.name?.split(' ')[0]}
        </h2>
        <p className="mt-2 text-stone-600">
          Your shop, products, and orders will live here. We'll build them on Day 3.
        </p>
      </main>
    </div>
  );
}