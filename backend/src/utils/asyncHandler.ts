/**
 * Wrapper für async Route-Handler.
 * Fängt Fehler ab und leitet sie an den globalen Error-Handler weiter (next(err)).
 */

import { Request, Response, NextFunction } from 'express';

export type AsyncRequestHandler = (
  req: Request,
  res: Response
) => Promise<void>;

/**
 * Wraps an async handler and forwards errors to next(err) for the global error handler.
 */
export function asyncHandler(
  handler: AsyncRequestHandler
): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next) => {
    Promise.resolve(handler(req, res)).catch(next);
  };
}
