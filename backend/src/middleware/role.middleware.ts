import type { RequestHandler } from 'express';
import { ApiError } from '../utils/ApiError';
import type { Role } from '@prisma/client';

/**
 * Restrict an endpoint to specific roles.
 * MUST be chained after `requireAuth` so `req.user` is populated.
 *
 * Usage:
 *   router.get('/admin/users', requireAuth, requireRole('ADMIN'), handler);
 *   router.post('/shop', requireAuth, requireRole('SHOPKEEPER', 'ADMIN'), handler);
 *
 * Why accept multiple roles? Common case: an action allowed for both
 * shopkeepers AND admins (admins can do anything a shopkeeper can).
 */
export const requireRole =
  (...allowed: Role[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user) {
      // Programmer error — middleware chain misuse
      return next(new ApiError(500, 'requireRole used without requireAuth', 'MIDDLEWARE_ORDER'));
    }

    if (!allowed.includes(req.user.role)) {
      return next(
        new ApiError(403, 'You do not have permission to access this resource', 'FORBIDDEN'),
      );
    }

    next();
  };