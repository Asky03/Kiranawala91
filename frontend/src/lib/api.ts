/**
 * Lightweight typed fetch wrapper for the Kiranawala API.
 * Avoids axios — Next.js + native fetch is the modern approach.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export type ApiSuccess<T> = { success: true; data: T; message?: string };
export type ApiFailure = {
  success: false;
  error: { code: string; message: string; details?: unknown };
};
export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<ApiResult<T>> {
  const url = path.startsWith('http') ? path : `${API_URL}${path}`;

  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
      cache: 'no-store',
    });

    const body = (await res.json()) as ApiResult<T>;
    return body;
  } catch (err) {
    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: err instanceof Error ? err.message : 'Unknown network error',
      },
    };
  }
}
