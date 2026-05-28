import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyAuthToken, type AuthTokenPayload } from '../utils/jwt';
import { ApiError } from '../utils/ApiError';
import { prisma } from '../config/db';

/**
 * Augment Express's Request type so `req.user` is typed everywhere.
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: AuthTokenPayload['role'];
        email: string;
        name: string;
      };
    }
  }
}

/**
 * Extract token from either:
 *   1. httpOnly cookie `token` (browser flow — preferred, XSS-safe)
 *   2. `Authorization: Bearer <token>` header (API clients, Postman)
 */
const extractToken = (req: Request): string | null => {
  // Cookie first (browser sessions)
  const cookieToken = (req as Request & { cookies?: Record<string, string> }).cookies?.token;
  if (cookieToken) return cookieToken;

  // Fall back to Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  return null;
};

/**
 * Verifies the JWT and loads the user from DB.
 * Why fresh DB lookup? So if the user is deleted or role changed,
 * their token immediately stops working. Trade-off: 1 DB query per request.
 *
 * For high-traffic apps you'd cache this with Redis (60s TTL).
 */
export const requireAuth: RequestHandler = async (req, _res, next) => {
  try {
    const token = extractToken(req);
    if (!token) {
      throw new ApiError(401, 'Authentication required', 'NO_TOKEN');
    }

    const payload = verifyAuthToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      throw new ApiError(401, 'User no longer exists', 'USER_NOT_FOUND');
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Optional auth: attach user if token is valid, but don't fail if absent.
 * Useful for endpoints that behave differently for logged-in vs anonymous users
 * (e.g. shop listing showing "you've ordered here before" badges).
 */
export const optionalAuth: RequestHandler = async (req, _res, next) => {
  try {
    const token = extractToken(req);
    if (!token) return next();

    const payload = verifyAuthToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true, role: true },
    });

    if (user) req.user = user;
    next();
  } catch {
    // Silently ignore bad tokens for optional auth
    next();
  }
};