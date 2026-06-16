'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { shopApi } from '@/lib/shop';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/Logo';

/**
 * Admin home — shows quick stats and links to admin tools.
 * Day 3: pending shop approvals + shortcut to the queue.
 */
export default function AdminHomePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [pendingCount, setPendingCount] = useState<number | null>(null);

  useEffect(() => {
    shopApi.listPending().then((result) => {
      if (result.success) {
        setPendingCount(result.data.count);
      }
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace('/admin/login');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <header className="border-b border-stone-800 bg-stone-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Logo size="md" variant="light" />
            <span className="text-stone-500">/ admin</span>
          </div>
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
        <h1 className="font-display text-2xl font-semibold">Admin console</h1>
        <p className="mt-1 text-sm text-stone-400">
          Approvals, user management, and platform health.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Pending shop approvals — clickable */}
          <Link
            href="/admin/shops"
            className="group rounded-xl border border-stone-800 bg-stone-900 p-5 transition hover:border-saffron-700 hover:bg-stone-900/50"
          >
            <div className="text-xs uppercase tracking-wider text-stone-500">
              Pending shop approvals
            </div>
            <div className="mt-2 font-mono text-3xl font-semibold">
              {pendingCount ?? '—'}
            </div>
            <div className="mt-2 text-xs text-saffron-400 group-hover:text-saffron-300">
              Review queue →
            </div>
          </Link>

          <div className="rounded-xl border border-stone-800 bg-stone-900 p-5">
            <div className="text-xs uppercase tracking-wider text-stone-500">
              Total users
            </div>
            <div className="mt-2 font-mono text-3xl font-semibold">—</div>
            <div className="mt-2 text-xs text-stone-600">Coming in Day 7</div>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-900 p-5">
            <div className="text-xs uppercase tracking-wider text-stone-500">
              Orders today
            </div>
            <div className="mt-2 font-mono text-3xl font-semibold">—</div>
            <div className="mt-2 text-xs text-stone-600">Coming in Day 6</div>
          </div>
        </div>
      </main>
    </div>
  );
}
