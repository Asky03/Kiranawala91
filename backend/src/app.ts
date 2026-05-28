import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';

import { env, isDev } from './config/env';
import { logger } from './utils/logger';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

import healthRoutes from './modules/health/health.routes';
import authRoutes from './modules/auth/auth.routes';

export const createApp = (): Express => {
  const app = express();

  // ─── Security middleware ────────────────────────────────
  app.use(helmet());
  app.use(
    cors({
      origin: env.CORS_ORIGIN.split(',').map((s) => s.trim()),
      credentials: true,
    }),
  );

  // ─── Body parsing ───────────────────────────────────────
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // ─── Cookies (Day 2 — needed for httpOnly JWT cookie) ──
  app.use(cookieParser());

  // ─── Request logging ────────────────────────────────────
  app.use(
    pinoHttp({
      logger,
      autoLogging: !isDev ? true : { ignore: (req) => req.url === '/api/health' },
    }),
  );

  // ─── Rate limiting (basic global) ───────────────────────
  app.use(
    '/api',
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 min
      max: 300, // 300 requests per IP per window
      standardHeaders: 'draft-7',
      legacyHeaders: false,
    }),
  );

  // ─── Routes ─────────────────────────────────────────────
  app.use('/api/health', healthRoutes);
  app.use('/api/auth', authRoutes);

  // Root
  app.get('/', (_req, res) => {
    res.json({
      service: 'kiranawala-api',
      version: '0.2.0',
      docs: '/api/health',
    });
  });

  // ─── 404 + error handling (always last) ─────────────────
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};