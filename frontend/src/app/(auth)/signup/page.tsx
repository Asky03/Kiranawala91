/* ══════════════════════════════════════════════════════════════════════
 *  📁  DESTINATION:
 *      frontend/src/app/(auth)/signup/page.tsx
 *
 *  🆕 CREATE NEW    →    URL: /signup
 *
 *  📝  Signup page with Customer/Shopkeeper toggle (says "Create your account" at top, has role cards)
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
import { cn } from '@/lib/utils';

type SignupRole = 'CUSTOMER' | 'SHOPKEEPER';

export default function SignupPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const [role, setRole] = useState<SignupRole>('CUSTOMER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);

    const result = await authApi.register({
      name,
      email,
      password,
      phone: phone.trim() || undefined,
      role,
    });
    setLoading(false);

    if (!result.success) {
      setError(result.error.message);
      if (result.error.details) setFieldErrors(result.error.details);
      return;
    }

    const { user } = result.data;
    setUser(user);
    router.replace(ROLE_HOME[user.role]);
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-semibold text-stone-900">Create your account</h1>
        <p className="mt-2 text-stone-600">Join Kiranawala in 30 seconds</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
      >
        {/* Role selector */}
        <div>
          <Label>I am a…</Label>
          <div className="grid grid-cols-2 gap-2">
            <RoleCard
              active={role === 'CUSTOMER'}
              onClick={() => setRole('CUSTOMER')}
              title="Customer"
              subtitle="Order from local shops"
            />
            <RoleCard
              active={role === 'SHOPKEEPER'}
              onClick={() => setRole('SHOPKEEPER')}
              title="Shopkeeper"
              subtitle="List my kirana online"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            error={!!fieldErrors.name}
            disabled={loading}
          />
        </div>

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
            error={!!fieldErrors.email}
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="9876543210"
            maxLength={10}
            error={!!fieldErrors.phone}
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 chars, with a number"
            error={!!fieldErrors.password}
            disabled={loading}
          />
          {fieldErrors.password && (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.password[0]}</p>
          )}
        </div>

        {error && !fieldErrors.password && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" loading={loading}>
          Create account
        </Button>

        <p className="text-center text-sm text-stone-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-saffron-700 hover:text-saffron-800">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

interface RoleCardProps {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
}

function RoleCard({ active, onClick, title, subtitle }: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-lg border-2 p-3 text-left transition-colors',
        active
          ? 'border-saffron-500 bg-saffron-50'
          : 'border-stone-200 bg-white hover:border-stone-300',
      )}
      aria-pressed={active}
    >
      <div
        className={cn(
          'text-sm font-semibold',
          active ? 'text-saffron-800' : 'text-stone-900',
        )}
      >
        {title}
      </div>
      <div className="mt-0.5 text-xs text-stone-600">{subtitle}</div>
    </button>
  );
}