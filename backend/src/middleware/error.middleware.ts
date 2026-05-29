import type { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError';
import { logger } from '../utils/logger';
import { isProd } from '../config/env';

/**
 * 404 handler — must be registered AFTER all routes.
 */
export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`, 'NOT_FOUND'));
};

/**
 * Global error handler — must be registered LAST.
 * Maps every kind of error to a consistent JSON shape.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // ApiError — operational, expected
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: { message: err.message, code: err.code, details: err.details },
    });
  }

  // Zod — validation
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: err.flatten().fieldErrors,
      },
    });
  }

  // Prisma — known errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        success: false,
        error: { message: 'Unique constraint violation', code: 'CONFLICT' },
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: { message: 'Record not found', code: 'NOT_FOUND' },
      });
    }
  }

  // Anything else — unexpected, log and return generic 500
  logger.error({ err, path: req.path, method: req.method }, 'Unhandled error');

  return res.status(500).json({
    success: false,
    error: {
      message: isProd ? 'Internal server error' : (err as Error)?.message ?? 'Unknown error',
      code: 'INTERNAL_ERROR',
    },
  });
};