/* ══════════════════════════════════════════════════════════════════════
 *  📁  DESTINATION:
 *      frontend/src/app/admin/login/page.tsx  ← admin/ has NO parens
 *
 *  🆕 CREATE NEW    →    URL: /admin/login
 *
 *  📝  Dedicated admin login with DARK theme (says "Administrator sign-in" / "Restricted access")
 *
 *  👉  Copy this entire file (including this header) to the destination above.
 *      You can delete this comment block after pasting — it's just a marker.
 * ══════════════════════════════════════════════════════════════════════ */

'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/lib/auth';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

/**
 * Dedicated admin login.
 * - NOT in the (auth) route group → different layout, different vibe
 * - Calls /api/auth/login?as=admin → backend rejects non-admin credentials
 * - Dark/austere visual to make it clear this is an internal tool
 *
 * This URL is not linked from the public navbar.
 * Only the tiny link at the bottom of /login mentions it.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await authApi.login({ email, password }, { adminOnly: true });
    setLoading(false);

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    setUser(result.data.user);
    router.replace('/admin');
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col text-stone-100">
      <header className="px-6 py-5">
        <Link
          href="/"
          className="font-display text-xl font-semibold text-stone-300 hover:text-stone-100"
        >
          Kiranawala <span className="text-stone-500">/ admin</span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 pb-12">
        <div className="w-full max-w-sm">
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-semibold">Administrator sign-in</h1>
            <p className="mt-1 text-sm text-stone-400">
              Restricted access. Authorized personnel only.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-stone-800 bg-stone-900 p-6"
          >
            <div>
              <Label htmlFor="admin-email" className="text-stone-300">
                Email
              </Label>
              <Input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-stone-950 border-stone-700 text-stone-100 placeholder:text-stone-500 focus:border-stone-500 focus:ring-stone-600"
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="admin-password" className="text-stone-300">
                Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-stone-950 border-stone-700 text-stone-100 placeholder:text-stone-500 focus:border-stone-500 focus:ring-stone-600"
                disabled={loading}
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-md border border-red-900 bg-red-950/50 px-3 py-2 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            <Button type="submit" variant="admin" className="w-full" loading={loading}>
              Authenticate
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-stone-500">
            Not an admin?{' '}
            <Link href="/login" className="underline hover:text-stone-300">
              Customer / shopkeeper sign-in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}