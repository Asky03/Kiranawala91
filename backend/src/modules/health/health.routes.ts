import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';
import { prisma } from '../../config/db';

const router = Router();

/**
 * GET /api/health
 * Confirms server is up and database is reachable.
 * Used by uptime monitors and as Day 1 end-to-end test.
 */
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    // Lightweight DB ping
    await prisma.$queryRaw`SELECT 1`;

    return ApiResponse.success(res, {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'kiranawala-api',
      version: '0.1.0',
      database: 'connected',
      uptime: Math.floor(process.uptime()),
    });
  }),
);

export default router;
