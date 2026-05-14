import type { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wraps async controllers so thrown errors flow to the error middleware.
 * Without this, async errors crash the process silently.
 *
 * Usage: router.get('/path', asyncHandler(async (req, res) => { ... }))
 */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
