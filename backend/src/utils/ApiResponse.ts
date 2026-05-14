import type { Response } from 'express';

/**
 * Consistent success response shape across all endpoints.
 * Always: { success: true, data, message? }
 */
export class ApiResponse {
  static success<T>(res: Response, data: T, message?: string, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      data,
      ...(message && { message }),
    });
  }

  static created<T>(res: Response, data: T, message = 'Created successfully') {
    return ApiResponse.success(res, data, message, 201);
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }
}
