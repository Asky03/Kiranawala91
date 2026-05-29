import jwt, { type SignOptions, type JwtPayload } from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from './ApiError';

/**
 * Payload we sign into JWT.
 * Keep this MINIMAL — never put password, email, or sensitive info here.
 * The token is signed but NOT encrypted; anyone can decode the payload.
 */
export interface AuthTokenPayload extends JwtPayload {
  sub: string;          // user id (standard JWT claim "subject")
  role: 'CUSTOMER' | 'SHOPKEEPER' | 'ADMIN';
}

/**
 * Sign a JWT for an authenticated user.
 * Returns a string token ready to send to the client.
 */
export const signAuthToken = (payload: Omit<AuthTokenPayload, 'iat' | 'exp'>): string => {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
    issuer: 'kiranawala',
  };
  return jwt.sign(payload, env.JWT_SECRET, options);
};

/**
 * Verify a JWT and return its payload.
 * Throws ApiError(401) on any verification failure (expired, malformed, wrong signature).
 */
export const verifyAuthToken = (token: string): AuthTokenPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, { issuer: 'kiranawala' });
    if (typeof decoded === 'string' || !decoded.sub) {
      throw new ApiError(401, 'Invalid token payload', 'INVALID_TOKEN');
    }
    return decoded as AuthTokenPayload;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, 'Token expired', 'TOKEN_EXPIRED');
    }
    if (err instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, 'Invalid token', 'INVALID_TOKEN');
    }
    throw new ApiError(401, 'Authentication failed', 'AUTH_FAILED');
  }
};