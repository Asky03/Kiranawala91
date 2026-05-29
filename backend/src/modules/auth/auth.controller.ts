import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import * as authService from './auth.service';
import { env, isProd } from '../../config/env';

/**
 * Cookie config — used for both setting on login and clearing on logout.
 *
 * Why these settings?
 *   - httpOnly: JS cannot read it → XSS can't steal the token
 *   - secure: HTTPS only in production
 *   - sameSite=lax: prevents CSRF on most actions, while still allowing
 *     normal top-level navigation (clicking links from other sites)
 *   - maxAge: matches JWT expiry roughly (7 days)
 */
const COOKIE_NAME = 'token';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  path: '/',
};

/**
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, token } = await authService.registerUser(req.body);

  res
    .status(201)
    .cookie(COOKIE_NAME, token, COOKIE_OPTIONS)
    // Also return token in body so non-cookie clients (Postman) can use it.
    .json(new ApiResponse({ user, token }, 'Account created successfully'));
});

/**
 * POST /api/auth/login
 *
 * Optional query: ?as=admin
 *   When `as=admin`, only ADMIN role users are accepted here.
 *   This protects the dedicated /admin/login frontend from being used by
 *   regular users who guessed the URL.
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { user, token } = await authService.loginUser(req.body);

  // If client requested admin-only login, reject non-admin credentials
  const adminOnly = req.query.as === 'admin';
  if (adminOnly && user.role !== 'ADMIN') {
    // Same generic error as wrong password — don't leak that the
    // email exists but isn't an admin.
    throw new ApiError(401, 'Invalid email or password', 'INVALID_CREDENTIALS');
  }

  res
    .status(200)
    .cookie(COOKIE_NAME, token, COOKIE_OPTIONS)
    .json(new ApiResponse({ user, token }, 'Logged in successfully'));
});

/**
 * POST /api/auth/logout
 * Clears the cookie. Token in localStorage (if any) must be cleared client-side.
 */
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie(COOKIE_NAME, { ...COOKIE_OPTIONS, maxAge: undefined })
    .json(new ApiResponse(null, 'Logged out'));
});

/**
 * GET /api/auth/me
 * Returns the current user. Requires auth.
 * Used by the frontend on page load to restore session.
 */
export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, 'Not authenticated', 'NOT_AUTHENTICATED');

  const user = await authService.getCurrentUser(req.user.id);
  res.status(200).json(new ApiResponse({ user }));
});

// Silence unused import warning in some configs
void env;