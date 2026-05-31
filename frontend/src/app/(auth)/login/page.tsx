/* ══════════════════════════════════════════════════════════════════════
 *  📁  DESTINATION:
 *      frontend/src/app/(auth)/login/page.tsx
 *
 *  🆕 CREATE NEW    →    URL: /login
 *
 *  📝  Login page for CUSTOMERS and SHOPKEEPERS (says "Welcome back" at top)
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
import { ROLE_HOME } from '@/types/user';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function LoginPage() {
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

    const result = await authApi.login({ email, password });
    setLoading(false);

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    const { user } = result.data;
    setUser(user);

    // If somehow an admin used this page, send them to admin home anyway.
    router.replace(ROLE_HOME[user.role]);
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-semibold text-stone-900">Welcome back</h1>
        <p className="mt-2 text-stone-600">Sign in to your Kiranawala account</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <Label htmlFor="password">Password</Label>
            {/* Day 11 will wire this up */}
            <span className="text-xs text-stone-400">Forgot? (coming soon)</span>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            disabled={loading}
          />
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" loading={loading}>
          Sign in
        </Button>

        <p className="text-center text-sm text-stone-600">
          New to Kiranawala?{' '}
          <Link href="/signup" className="font-medium text-saffron-700 hover:text-saffron-800">
            Create an account
          </Link>
        </p>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/admin/login"
          className="text-xs text-stone-400 hover:text-stone-600"
        >
          Platform administrator? Sign in here →
        </Link>
      </div>
    </div>
  );
}