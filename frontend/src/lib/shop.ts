import { api } from './api';
import type { Shop, ShopWithOwner } from '@/types/shop';

interface CreateShopPayload {
  name: string;
  description?: string;
  addressLine: string;
  city: string;
  pincode: string;
  phone?: string;
  openingTime?: string;
  closingTime?: string;
}

/**
 * Shop API helpers.
 * Browser sends cookies automatically via `credentials: 'include'` (set in lib/api.ts).
 * Backend reads the JWT from the cookie and identifies the user from there —
 * we never send user IDs in the URL for `/me` routes.
 */
export const shopApi = {
  // ─── Shopkeeper (operates on own shop) ──────────────────
  createMyShop: (payload: CreateShopPayload) =>
    api.post<{ shop: Shop }>('/api/shops/me', payload),

  getMyShop: () => api.get<{ shop: Shop | null }>('/api/shops/me'),

  updateMyShop: (payload: Partial<CreateShopPayload>) =>
    api.patch<{ shop: Shop }>('/api/shops/me', payload),

  // ─── Admin ──────────────────────────────────────────────
  listPending: () =>
    api.get<{ shops: ShopWithOwner[]; count: number }>('/api/shops/pending'),

  approve: (shopId: string) =>
    api.post<{ shop: Shop }>(`/api/shops/${shopId}/approve`),

  reject: (shopId: string, reason: string) =>
    api.post<{ shop: Shop }>(`/api/shops/${shopId}/reject`, { reason }),
};