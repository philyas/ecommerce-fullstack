import { Response } from 'express';

const HTTP = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Sendet eine einheitliche Fehler-Response.
 */
export function sendError(
  res: Response,
  message: string,
  statusCode: number = HTTP.INTERNAL_SERVER_ERROR
): void {
  res.status(statusCode).json({ error: message });
}

/**
 * Sendet 400 Bad Request.
 */
export function sendBadRequest(res: Response, message: string): void {
  sendError(res, message, HTTP.BAD_REQUEST);
}

/**
 * Sendet 404 Not Found.
 */
export function sendNotFound(res: Response, message: string = 'Item not found'): void {
  sendError(res, message, HTTP.NOT_FOUND);
}
