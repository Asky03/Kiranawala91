/* ══════════════════════════════════════════════════════════════════════
 *  📁  DESTINATION:
 *      frontend/middleware.ts  ← AT ROOT of frontend/, NOT inside src/
 *
 *  🆕 CREATE NEW
 *
 *  📝  Next.js Edge middleware — verifies JWT cookie, enforces role-based routing on /admin /dashboard /account
 *
 *  👉  Copy this entire file (including this header) to the destination above.
 *      You can delete this comment block after pasting — it's just a marker.
 * ══════════════════════════════════════════════════════════════════════ */

import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * Next.js Edge middleware — runs BEFORE every matching request.
 *
 * Why verify here and not just rely on backend?
 *   - Faster UX: a non-admin hitting /admin/users gets redirected instantly,
 *     not after the page loads, calls the backend, and gets 403.
 *   - Defense in depth: backend STILL enforces permission on every API call.
 *     This is a UX optimization, not the security boundary.
 *
 * The JWT_SECRET here must match the backend's. Set it in `frontend/.env.local`
 * as `JWT_SECRET` (not NEXT_PUBLIC_, since this runs server-side only).
 */

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? '');

type Role = 'CUSTOMER' | 'SHOPKEEPER' | 'ADMIN';

interface TokenPayload {
  sub: string;
  role: Role;
}

const ROUTE_ROLE_MAP: { prefix: string; roles: Role[]; loginRedirect: string }[] = [
  { prefix: '/admin', roles: ['ADMIN'], loginRedirect: '/admin/login' },
  { prefix: '/dashboard', roles: ['SHOPKEEPER', 'ADMIN'], loginRedirect: '/login' },
  // /account is for anyone logged in (customer's own page, etc.)
  { prefix: '/account', roles: ['CUSTOMER', 'SHOPKEEPER', 'ADMIN'], loginRedirect: '/login' },
];

// Public exceptions inside protected prefixes (don't redirect from these)
const PUBLIC_EXCEPTIONS = ['/admin/login'];

async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET, { issuer: 'kiranawala' });
    if (typeof payload.sub === 'string' && typeof payload.role === 'string') {
      return { sub: payload.sub, role: payload.role as Role };
    }
    return null;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip public exceptions
  if (PUBLIC_EXCEPTIONS.includes(pathname)) {
    return NextResponse.next();
  }

  // Find matching protected route
  const match = ROUTE_ROLE_MAP.find((r) => pathname.startsWith(r.prefix));
  if (!match) return NextResponse.next();

  const token = req.cookies.get('token')?.value;

  // No token → bounce to the appropriate login
  if (!token) {
    const loginUrl = new URL(match.loginRedirect, req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Token present but invalid/expired → bounce to login, clear cookie
  const payload = await verifyToken(token);
  if (!payload) {
    const loginUrl = new URL(match.loginRedirect, req.url);
    loginUrl.searchParams.set('redirect', pathname);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete('token');
    return res;
  }

  // Token valid but wrong role → 404-style redirect to home
  // (Don't reveal that the route exists.)
  if (!match.roles.includes(payload.role)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

/**
 * Only run middleware on these paths — avoids running on static assets,
 * API proxies, and Next internals (huge perf win).
 */
export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/account/:path*'],
};