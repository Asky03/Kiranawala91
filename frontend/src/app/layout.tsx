'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';

/**
 * Mount this once at the root layout (inside <body>).
 * Verifies the httpOnly cookie is still valid by calling /api/auth/me
 * and updates the auth store with the fresh user object.
 *
 * Why this is needed:
 *   - localStorage cached the user object for instant UI render
 *   - But that cache could be stale (role changed, account deleted)
 *   - This bootstrap call confirms the cookie is valid and refreshes data
 *   - If the cookie is gone, user is set to null and UI updates accordingly
 */
export function AuthBootstrap() {
  const bootstrap = useAuthStore((s) => s.bootstrap);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  return null;
}