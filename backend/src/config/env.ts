import { z } from 'zod';
import { config } from 'dotenv';

config();

/**
 * Environment schema — single source of truth for all env vars.
 *
 * If a var is missing or malformed at boot, the app refuses to start.
 * This is intentional: fail fast in dev > silent prod bugs.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),

  // ─── Database ─────────────────────────────────────────
  DATABASE_URL: z.string().url(),

  // ─── JWT (Day 2) ──────────────────────────────────────
  // Min 32 chars enforced because JWT_SECRET shorter than that is brute-forceable.
  // Generate with: openssl rand -base64 64
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),

  // Standard zod-friendly duration strings: '7d', '12h', '30m'.
  // jsonwebtoken accepts these directly.
  JWT_EXPIRES_IN: z.string().default('7d'),

  // ─── CORS ─────────────────────────────────────────────
  // Comma-separated list. Examples:
  //   dev:   http://localhost:3000
  //   prod:  https://kiranawala.com,https://admin.kiranawala.com
  CORS_ORIGIN: z.string().default('http://localhost:3000'),

  // ─── Logging ──────────────────────────────────────────
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // Pretty-print validation errors and exit
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

export const isDev = env.NODE_ENV === 'development';
export const isProd = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';