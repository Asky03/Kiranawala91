import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiError } from '../utils/ApiError';

/**
 * Validates req.body / req.query / req.params against a Zod schema.
 * Parses + types the value, replaces the original with the parsed version.
 *
 * Usage:
 *   router.post('/login', validate(loginSchema, 'body'), authController.login);
 */
export const validate =
  (schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body'): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[source]);
      // Replace with parsed value (gives us type coercion + defaults)
      req[source] = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const details = err.flatten().fieldErrors;
        return next(new ApiError(400, 'Validation failed', 'VALIDATION_ERROR', details));
      }
      next(err);
    }
  };