'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { shopApi } from '@/lib/shop';
import type { Shop } from '@/types/shop';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';

/**
 * Shop setup / edit page.
 * Loads existing shop on mount (if any) and pre-fills the form.
 * Same component handles both "create" and "edit" — server decides based on
 * whether shop exists.
 */
export default function ShopSetupPage() {
  const router = useRouter();

  const [existingShop, setExistingShop] = useState<Shop | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  // Form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    shopApi.getMyShop().then((result) => {
      if (result.success && result.data.shop) {
        const s = result.data.shop;
        setExistingShop(s);
        setName(s.name);
        setDescription(s.description ?? '');
        setAddressLine(s.addressLine);
        setCity(s.city);
        setPincode(s.pincode);
        setPhone(s.phone ?? '');
        setOpeningTime(s.openingTime ?? '');
        setClosingTime(s.closingTime ?? '');
      }
      setPageLoading(false);
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setSubmitting(true);

    const payload = {
      name: name.trim(),
      description: description.trim() || undefined,
      addressLine: addressLine.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      phone: phone.trim() || undefined,
      openingTime: openingTime.trim() || undefined,
      closingTime: closingTime.trim() || undefined,
    };

    const result = existingShop
      ? await shopApi.updateMyShop(payload)
      : await shopApi.createMyShop(payload);

    setSubmitting(false);

    if (!result.success) {
      setError(result.error.message);
      if (result.error.details) setFieldErrors(result.error.details);
      return;
    }

    router.replace('/dashboard');
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50 text-stone-500">
        Loading…
      </div>
    );
  }

  const isEdit = !!existingShop;

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo size="md" />
          <Link
            href="/dashboard"
            className="text-sm font-medium text-stone-600 hover:text-stone-900"
          >
            ← Back to dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="font-display text-3xl font-semibold text-stone-900">
          {isEdit ? 'Edit your shop' : 'Create your shop'}
        </h1>
        <p className="mt-1 text-stone-600">
          {isEdit
            ? 'Update the details below. If your shop was rejected, edits go back to pending review.'
            : "Tell us about your kirana. We'll review and approve it within 1-2 business days."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
        >
          {/* Name */}
          <div>
            <Label htmlFor="name">Shop name *</Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sharma Provisions"
              maxLength={100}
              error={!!fieldErrors.name}
              disabled={submitting}
            />
            {fieldErrors.name && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.name[0]}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A few lines about what you sell, since when, what makes your shop special."
              maxLength={500}
              rows={3}
              error={!!fieldErrors.description}
              disabled={submitting}
            />
            <p className="mt-1 text-xs text-stone-500">
              {description.length}/500
            </p>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="addressLine">Street address *</Label>
            <Input
              id="addressLine"
              required
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              placeholder="Shop 12, Gandhi Road, Sector 4"
              maxLength={200}
              error={!!fieldErrors.addressLine}
              disabled={submitting}
            />
            {fieldErrors.addressLine && (
              <p className="mt-1 text-xs text-red-600">
                {fieldErrors.addressLine[0]}
              </p>
            )}
          </div>

          {/* City + Pincode */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Bengaluru"
                error={!!fieldErrors.city}
                disabled={submitting}
              />
              {fieldErrors.city && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.city[0]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                required
                value={pincode}
                onChange={(e) =>
                  setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))
                }
                placeholder="560001"
                maxLength={6}
                inputMode="numeric"
                error={!!fieldErrors.pincode}
                disabled={submitting}
              />
              {fieldErrors.pincode && (
                <p className="mt-1 text-xs text-red-600">
                  {fieldErrors.pincode[0]}
                </p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Shop phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
              }
              placeholder="9876543210"
              maxLength={10}
              inputMode="numeric"
              error={!!fieldErrors.phone}
              disabled={submitting}
            />
            <p className="mt-1 text-xs text-stone-500">
              Leave blank to use your account phone.
            </p>
          </div>

          {/* Opening / closing time */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="openingTime">Opening time</Label>
              <Input
                id="openingTime"
                type="time"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                error={!!fieldErrors.openingTime}
                disabled={submitting}
              />
            </div>
            <div>
              <Label htmlFor="closingTime">Closing time</Label>
              <Input
                id="closingTime"
                type="time"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                error={!!fieldErrors.closingTime}
                disabled={submitting}
              />
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <Button type="submit" loading={submitting} className="flex-1">
              {isEdit ? 'Save changes' : 'Submit for approval'}
            </Button>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
