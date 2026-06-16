'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { shopApi } from '@/lib/shop';
import { useAuthStore } from '@/store/auth.store';
import type { ShopWithOwner } from '@/types/shop';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

/**
 * Admin approval queue.
 * Lists all PENDING shops, shows full details + owner contact,
 * and lets the admin approve or reject (with a reason).
 */
export default function AdminShopsPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const [shops, setShops] = useState<ShopWithOwner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShops = async () => {
    setLoading(true);
    const result = await shopApi.listPending();
    if (result.success) {
      setShops(result.data.shops);
      setError(null);
    } else {
      setError(result.error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace('/admin/login');
  };

  const handleApprove = async (shopId: string) => {
    const result = await shopApi.approve(shopId);
    if (result.success) {
      // Remove from list (it's no longer pending)
      setShops((prev) => prev.filter((s) => s.id !== shopId));
    } else {
      alert(`Approve failed: ${result.error.message}`);
    }
  };

  const handleReject = async (shopId: string, reason: string) => {
    const result = await shopApi.reject(shopId, reason);
    if (result.success) {
      setShops((prev) => prev.filter((s) => s.id !== shopId));
    } else {
      alert(`Reject failed: ${result.error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <header className="border-b border-stone-800 bg-stone-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo size="md" variant="light" />
            <span className="text-stone-500">/ shops</span>
          </Link>
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

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold">
              Shop approval queue
            </h1>
            <p className="mt-1 text-sm text-stone-400">
              {shops.length} {shops.length === 1 ? 'shop' : 'shops'} pending review
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchShops}
            className="text-stone-300 hover:bg-stone-800"
          >
            Refresh
          </Button>
        </div>

        <div className="mt-8 space-y-4">
          {loading ? (
            <div className="rounded-xl border border-stone-800 bg-stone-900 p-8 text-center text-stone-500">
              Loading…
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-900 bg-red-950/30 p-4 text-red-300">
              {error}
            </div>
          ) : shops.length === 0 ? (
            <div className="rounded-xl border border-stone-800 bg-stone-900 p-10 text-center text-stone-400">
              No shops pending approval.
            </div>
          ) : (
            shops.map((shop) => (
              <PendingShopCard
                key={shop.id}
                shop={shop}
                onApprove={() => handleApprove(shop.id)}
                onReject={(reason) => handleReject(shop.id, reason)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────

interface PendingShopCardProps {
  shop: ShopWithOwner;
  onApprove: () => void;
  onReject: (reason: string) => void;
}

function PendingShopCard({ shop, onApprove, onReject }: PendingShopCardProps) {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);

  const handleApprove = async () => {
    setBusy(true);
    await onApprove();
    setBusy(false);
  };

  const handleReject = async () => {
    if (reason.trim().length < 10) {
      alert('Please provide a meaningful reason (at least 10 characters).');
      return;
    }
    setBusy(true);
    await onReject(reason.trim());
    setBusy(false);
  };

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-900 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-stone-100">
            {shop.name}
          </h3>
          {shop.description && (
            <p className="mt-1 text-sm text-stone-400">{shop.description}</p>
          )}
        </div>
        <span className="text-xs text-stone-500 whitespace-nowrap">
          Submitted {new Date(shop.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <div className="text-xs uppercase tracking-wider text-stone-500">
            Owner
          </div>
          <div className="mt-1 text-sm text-stone-200">{shop.owner.name}</div>
          <div className="text-xs text-stone-400">{shop.owner.email}</div>
          {shop.owner.phone && (
            <div className="text-xs text-stone-400">{shop.owner.phone}</div>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-stone-500">
            Location
          </div>
          <div className="mt-1 text-sm text-stone-200">{shop.addressLine}</div>
          <div className="text-xs text-stone-400">
            {shop.city}, {shop.pincode}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-stone-500">
            Shop phone
          </div>
          <div className="mt-1 text-sm text-stone-200">
            {shop.phone ?? '—'}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-stone-500">
            Hours
          </div>
          <div className="mt-1 text-sm text-stone-200">
            {shop.openingTime && shop.closingTime
              ? `${shop.openingTime} – ${shop.closingTime}`
              : '—'}
          </div>
        </div>
      </div>

      {!showRejectForm && (
        <div className="mt-6 flex gap-3">
          <Button onClick={handleApprove} loading={busy} variant="secondary">
            Approve
          </Button>
          <Button
            variant="ghost"
            onClick={() => setShowRejectForm(true)}
            className="text-stone-300 hover:bg-stone-800"
          >
            Reject
          </Button>
        </div>
      )}

      {showRejectForm && (
        <div className="mt-6 rounded-lg border border-stone-800 bg-stone-950 p-4">
          <div className="text-sm font-medium text-stone-200">
            Reason for rejection
          </div>
          <p className="mt-1 text-xs text-stone-500">
            This message is shown to the shopkeeper. Be specific so they can fix
            it.
          </p>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="mt-2 bg-stone-950 border-stone-700 text-stone-100 placeholder:text-stone-500 focus:border-stone-500 focus:ring-stone-600"
            placeholder="e.g. The pincode doesn't match the city. Please verify and resubmit."
            maxLength={500}
          />
          <div className="mt-3 flex gap-2">
            <Button onClick={handleReject} loading={busy} variant="danger">
              Confirm reject
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setShowRejectForm(false);
                setReason('');
              }}
              className="text-stone-300 hover:bg-stone-800"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
