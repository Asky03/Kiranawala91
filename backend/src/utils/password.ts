import bcrypt from 'bcryptjs';

/**
 * bcrypt work factor (number of rounds = 2^SALT_ROUNDS).
 * 12 is the modern standard. Higher = more secure but slower login.
 *
 * Quick benchmark:
 *  - 10 rounds: ~100ms on modern hardware
 *  - 12 rounds: ~400ms
 *  - 14 rounds: ~1.5s
 *
 * 12 is the right balance. Do NOT lower this.
 */
const SALT_ROUNDS = 12;

/**
 * Hash a plaintext password.
 * bcrypt automatically generates and embeds the salt in the output.
 */
export const hashPassword = (plain: string): Promise<string> => {
  return bcrypt.hash(plain, SALT_ROUNDS);
};

/**
 * Verify a plaintext password against a stored hash.
 * Constant-time comparison — safe against timing attacks.
 */
export const verifyPassword = (plain: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};