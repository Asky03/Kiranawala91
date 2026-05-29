import { z } from 'zod';

/**
 * Schemas are the contract between client and server.
 * Keep them strict — every constraint here means one less bug later.
 */

// Common rules
const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .email('Invalid email address')
  .max(254); // RFC 5321 max email length

const passwordField = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password too long')
  .refine((v) => /[a-zA-Z]/.test(v) && /\d/.test(v), {
    message: 'Password must contain at least one letter and one number',
  });

const phoneField = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number')
  .optional();

const nameField = z.string().trim().min(2, 'Name too short').max(80, 'Name too long');

// ─── Register ──────────────────────────────────────────────────────────
// Note: role is restricted to CUSTOMER and SHOPKEEPER.
// ADMIN is NEVER self-registered — only created via seed or by another admin.
export const registerSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  password: passwordField,
  role: z.enum(['CUSTOMER', 'SHOPKEEPER']).default('CUSTOMER'),
});

export type RegisterInput = z.infer<typeof registerSchema>;

// ─── Login ─────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;