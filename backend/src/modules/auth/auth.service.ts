import { prisma } from '../../config/db';
import { hashPassword, verifyPassword } from '../../utils/password';
import { signAuthToken } from '../../utils/jwt';
import { ApiError } from '../../utils/ApiError';
import type { RegisterInput, LoginInput } from './auth.schema';
import type { User } from '@prisma/client';

/**
 * Public user shape — what we return to clients.
 * NEVER include password in this. Use Prisma `select` to enforce at type level.
 */
export type PublicUser = Pick<
  User,
  'id' | 'email' | 'name' | 'role' | 'phone' | 'createdAt'
>;

const PUBLIC_USER_SELECT = {
  id: true,
  email: true,
  name: true,
  role: true,
  phone: true,
  createdAt: true,
} as const;

/**
 * Register a new user.
 * - Validates email uniqueness
 * - Hashes password with bcrypt
 * - Issues JWT immediately so user is logged in after signup
 */
export const registerUser = async (
  input: RegisterInput,
): Promise<{ user: PublicUser; token: string }> => {
  // Pre-check is a UX optimization (faster, clearer error).
  // The unique constraint below is the actual safety net against race conditions.
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });
  if (existing) {
    throw new ApiError(409, 'Email already registered', 'EMAIL_EXISTS');
  }

  const passwordHash = await hashPassword(input.password);

  try {
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        password: passwordHash,
        role: input.role,
      },
      select: PUBLIC_USER_SELECT,
    });

    const token = signAuthToken({ sub: user.id, role: user.role });
    return { user, token };
  } catch (err) {
    // Catch unique-constraint race (two requests at same instant)
    if (
      err &&
      typeof err === 'object' &&
      'code' in err &&
      (err as { code: string }).code === 'P2002'
    ) {
      throw new ApiError(409, 'Email already registered', 'EMAIL_EXISTS');
    }
    throw err;
  }
};

/**
 * Log in an existing user.
 * Returns same shape as register — consistent client handling.
 *
 * Security note: we use the SAME error message for "no such user" and
 * "wrong password". Different messages let attackers enumerate emails.
 */
export const loginUser = async (
  input: LoginInput,
): Promise<{ user: PublicUser; token: string }> => {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new ApiError(401, 'Invalid email or password', 'INVALID_CREDENTIALS');
  }

  const valid = await verifyPassword(input.password, user.password);
  if (!valid) {
    throw new ApiError(401, 'Invalid email or password', 'INVALID_CREDENTIALS');
  }

  const token = signAuthToken({ sub: user.id, role: user.role });

  // Strip password before returning
  const { password: _pw, updatedAt: _u, addressLine: _a, city: _c, pincode: _p, ...publicUser } = user;
  return { user: publicUser, token };
};

/**
 * Fetch fresh user data from DB.
 * Used by GET /api/auth/me to confirm session + get latest profile.
 */
export const getCurrentUser = async (userId: string): Promise<PublicUser> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: PUBLIC_USER_SELECT,
  });

  if (!user) {
    throw new ApiError(404, 'User not found', 'USER_NOT_FOUND');
  }

  return user;
};