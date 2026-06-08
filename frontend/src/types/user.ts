/* ══════════════════════════════════════════════════════════════════════
 *  📁  DESTINATION:
 *      frontend/src/types/user.ts  ← you can delete the .gitkeep next to it
 *
 *  🆕 CREATE NEW
 *
 *  📝  User type + Role type + ROLE_HOME mapping (CUSTOMER → /, SHOPKEEPER → /dashboard, ADMIN → /admin)
 *
 *  👉  Copy this entire file (including this header) to the destination above.
 *      You can delete this comment block after pasting — it's just a marker.
 * ══════════════════════════════════════════════════════════════════════ */

export type Role = 'CUSTOMER' | 'SHOPKEEPER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone: string | null;
  createdAt: string;
}

/**
 * Maps each role to its post-login landing page.
 * One source of truth used by login, signup, middleware, navbar.
 */
export const ROLE_HOME: Record<Role, string> = {
  CUSTOMER: '/',
  SHOPKEEPER: '/dashboard',
  ADMIN: '/admin',
};