import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validate } from '../../middleware/validate.middleware';
import { requireAuth } from '../../middleware/auth.middleware';
import { registerSchema, loginSchema } from './auth.schema';
import * as authController from './auth.controller';

const router = Router();

/**
 * Stricter rate limit on auth endpoints than the global /api limit.
 * Prevents brute-force credential stuffing.
 *
 * 10 attempts per 15 minutes per IP. Reset on success would be nicer
 * (so a legit user who mistypes 3 times isn't locked out long), but
 * that needs Redis to track per-user state. Day 2 keeps it simple.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, error: 'Too many attempts. Try again in 15 minutes.' },
});

// ─── Public ────────────────────────────────────────────────────────────
router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/logout', authController.logout);

// ─── Protected ─────────────────────────────────────────────────────────
router.get('/me', requireAuth, authController.me);

export default router;