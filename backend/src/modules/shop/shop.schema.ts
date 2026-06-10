import { z } from 'zod';

/**
 * Validation schemas for the Shop module.
 * Single source of truth for what the API accepts.
 */

const nameField = z.string().trim().min(2, 'Shop name too short').max(100);
const descField = z.string().trim().max(500, 'Description too long').optional().or(z.literal(''));
const addressField = z.string().trim().min(5, 'Address too short').max(200);
const cityField = z.string().trim().min(2).max(80);

// Indian pincodes: 6 digits, first digit non-zero
const pincodeField = z
  .string()
  .trim()
  .regex(/^[1-9][0-9]{5}$/, 'Invalid Indian pincode');

// Indian mobile: 10 digits starting 6-9
const phoneField = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number')
  .optional()
  .or(z.literal(''));

// HH:MM format (24h)
const timeField = z
  .string()
  .trim()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Use HH:MM format (24-hour)')
  .optional()
  .or(z.literal(''));

// ─── Create Shop ──────────────────────────────────────────────────
export const createShopSchema = z.object({
  name: nameField,
  description: descField,
  addressLine: addressField,
  city: cityField,
  pincode: pincodeField,
  phone: phoneField,
  openingTime: timeField,
  closingTime: timeField,
});

export type CreateShopInput = z.infer<typeof createShopSchema>;

// ─── Update Shop (all fields optional) ────────────────────────────
export const updateShopSchema = createShopSchema.partial();
export type UpdateShopInput = z.infer<typeof updateShopSchema>;

// ─── Reject Shop (admin needs to give a reason) ───────────────────
export const rejectShopSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(10, 'Please provide a meaningful rejection reason')
    .max(500),
});

export type RejectShopInput = z.infer<typeof rejectShopSchema>;