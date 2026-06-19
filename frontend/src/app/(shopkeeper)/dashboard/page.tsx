'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { shopApi } from '@/lib/shop';
import { useAuthStore } from '@/store/auth.store';
import type { Shop } from '@/types/shop';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { ShopStatusBadge } from '@/components/shared/ShopStatusBadge';

/**
 * Shopkeeper dashboard.
 * Four states: loading, no shop, shop (any status), rejected with reason.
 */
export default function ShopkeeperDashboardPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    shopApi.getMyShop().then((result) => {
      if (result.success) {
        setShop(result.data.shop);
      }
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-600">Hi, {user?.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="font-display text-3xl font-semibold text-stone-900">
          Shopkeeper dashboard
        </h1>
        <p className="mt-1 text-stone-600">Manage your shop and orders.</p>

        <div className="mt-8">
          {loading ? (
            <DashboardLoading />
          ) : shop ? (
            <ShopCard shop={shop} />
          ) : (
            <NoShopCTA />
          )}
        </div>
      </main>
    </div>
  );
}

function DashboardLoading() {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center text-stone-500">
      Loading your shop…
    </div>
  );
}

function NoShopCTA() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-saffron-300 bg-white p-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron-100">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#E55934"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l2-5h14l2 5" />
          <path d="M3 9v11a1 1 0 001 1h16a1 1 0 001-1V9" />
          <path d="M9 21V12h6v9" />
        </svg>
      </div>
      <h2 className="mt-4 font-display text-xl font-semibold text-stone-900">
        Let's set up your shop
      </h2>
      <p className="mt-2 max-w-sm mx-auto text-sm text-stone-600">
        Tell us about your kirana — name, address, opening hours. We'll review
        it and notify you when it's live.
      </p>
      <Link
        href="/dashboard/setup"
        className="mt-6 inline-flex items-center rounded-lg bg-saffron-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-saffron-700"
      >
        Create your shop
      </Link>
    </div>
  );
}

function ShopCard({ shop }: { shop: Shop }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-stone-900">
            {shop.name}
          </h2>
          {shop.description && (
            <p className="mt-1 text-sm text-stone-600">{shop.description}</p>
          )}
        </div>
        <ShopStatusBadge status={shop.status} />
      </div>

      {shop.status === 'REJECTED' && shop.rejectionReason && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="text-sm font-medium text-red-900">Rejection reason</div>
          <div className="mt-1 text-sm text-red-700">{shop.rejectionReason}</div>
          <div className="mt-2 text-xs text-red-600">
            Edit your shop to address this — it will go back to pending review.
          </div>
        </div>
      )}

      {shop.status === 'APPROVED' && (
        <div className="mt-4 rounded-lg border border-forest-200 bg-forest-50 p-4 text-sm text-forest-800">
          Your shop is live. Customers in {shop.city} can now find you.
        </div>
      )}

      {shop.status === 'PENDING' && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          We're reviewing your shop. This usually takes 1-2 business days.
        </div>
      )}

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <DetailItem label="Address">
          {shop.addressLine}
          <br />
          {shop.city}, {shop.pincode}
        </DetailItem>
        <DetailItem label="Contact">
          {shop.phone ?? 'No shop phone set'}
        </DetailItem>
        <DetailItem label="Hours">
          {shop.openingTime && shop.closingTime
            ? `${shop.openingTime} – ${shop.closingTime}`
            : 'Not set'}
        </DetailItem>
        <DetailItem label="Status">
          {shop.isOpen ? 'Open' : 'Closed'}
        </DetailItem>
      </dl>

      <div className="mt-6 flex gap-3">
        <Link
          href="/dashboard/setup"
          className="inline-flex items-center rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          Edit shop details
        </Link>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-stone-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-stone-900">{children}</dd>
    </div>
  );
}
