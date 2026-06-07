/* ══════════════════════════════════════════════════════════════════════
 *  📁  DESTINATION:
 *      frontend/src/store/auth.store.ts  ← create the store/ folder first
 *
 *  🆕 CREATE NEW
 *
 *  📝  Zustand store for current user. Persists user object only (NOT token — token is in httpOnly cookie)
 *
 *  👉  Copy this entire file (including this header) to the destination above.
 *      You can delete this comment block after pasting — it's just a marker.
 * ══════════════════════════════════════════════════════════════════════ */

'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authApi } from '@/lib/auth';
import type { User } from '@/types/user';

/**
 * Auth store.
 *
 * What we persist in localStorage: just the user OBJECT (id, email, name, role)
 * for instant UI render on page refresh. NOT the token — that's in the httpOnly cookie.
 *
 * The user object is treated as a cache. On app load, we call `bootstrap()`
 * which calls /api/auth/me to confirm the cookie is still valid and refresh data.
 */

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

  setUser: (user: User | null) => void;
  bootstrap: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      status: 'idle',

      setUser: (user) =>
        set({ user, status: user ? 'authenticated' : 'unauthenticated' }),

      // Call once on app start (e.g. in a top-level layout effect).
      // Verifies the httpOnly cookie is still valid by hitting /me.
      bootstrap: async () => {
        set({ status: 'loading' });
        const result = await authApi.me();
        if (result.success) {
          set({ user: result.data.user, status: 'authenticated' });
        } else {
          set({ user: null, status: 'unauthenticated' });
        }
      },

      logout: async () => {
        await authApi.logout();
        set({ user: null, status: 'unauthenticated' });
      },
    }),
    {
      name: 'kiranawala-auth',
      storage: createJSONStorage(() => localStorage),
      // Only persist user — never persist status (it's always reset on load)
      partialize: (state) => ({ user: state.user }),
    },
  ),
);