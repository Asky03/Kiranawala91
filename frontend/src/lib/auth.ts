/* ══════════════════════════════════════════════════════════════════════
 *  📁  DESTINATION:
 *      frontend/src/lib/auth.ts
 *
 *  🆕 CREATE NEW
 *
 *  📝  Auth API helpers — authApi.register / authApi.login / authApi.logout / authApi.me
 *
 *  👉  Copy this entire file (including this header) to the destination above.
 *      You can delete this comment block after pasting — it's just a marker.
 * ══════════════════════════════════════════════════════════════════════ */

import { api } from './api';
import type { User, Role } from '@/types/user';

/**
 * Auth API helpers.
 *
 * IMPORTANT: We do NOT store the JWT in localStorage.
 * The backend sets an httpOnly cookie that the browser sends automatically.
 * JS can't read it → XSS attacks can't steal the token.
 *
 * "Storing the token safely" = letting the browser manage it via httpOnly cookie.
 */

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'CUSTOMER' | 'SHOPKEEPER';
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string; // returned in body too, for non-browser clients; browsers ignore
}

export const authApi = {
  register: (payload: RegisterPayload) =>
    api.post<AuthResponse>('/api/auth/register', payload),

  /**
   * Regular login (customers, shopkeepers, admins all use this).
   * Pass `adminOnly: true` to make backend reject non-admin credentials —
   * used by the dedicated /admin/login page.
   */
  login: (payload: LoginPayload, options: { adminOnly?: boolean } = {}) =>
    api.post<AuthResponse>(
      options.adminOnly ? '/api/auth/login?as=admin' : '/api/auth/login',
      payload,
    ),

  logout: () => api.post<null>('/api/auth/logout'),

  me: () => api.get<{ user: User }>('/api/auth/me'),
};

export type { Role };