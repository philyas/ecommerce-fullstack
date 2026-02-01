/**
 * Globaler Error-Handler.
 * Fängt alle Fehler ab (aus asyncHandler oder next(err)) und sendet eine einheitliche Response.
 */

import { Request, Response, NextFunction } from 'express';
import { HTTP } from '../constants/http.js';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Unhandled error:', err);

  const statusCode = HTTP.INTERNAL_SERVER_ERROR;
  const message =
    err instanceof Error ? err.message : 'An unexpected error occurred';

  if (res.headersSent) {
    return;
  }
  res.status(statusCode).json({ error: message });
}
