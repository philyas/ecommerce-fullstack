/**
 * Validation Middleware.
 * Trennt Validierungslogik vom Controller (Single Responsibility).
 */

import { Request, Response, NextFunction } from 'express';
import { config } from '../config/index.js';
import { sendBadRequest } from '../utils/response.js';
import { isNonEmptyString, isBoolean, isPositiveInteger, isValidMongoId } from '../utils/validation.js';

const { nameMaxLength, quantityMin, quantityMax } = config.validation.item;

/**
 * Validiert die Request-Body für das Erstellen eines Items.
 */
export function validateCreateItem(req: Request, res: Response, next: NextFunction): void {
  const { name, quantity } = req.body;

  if (!isNonEmptyString(name)) {
    sendBadRequest(res, 'Name is required and must be a non-empty string');
    return;
  }

  if (name.length > nameMaxLength) {
    sendBadRequest(res, `Name cannot exceed ${nameMaxLength} characters`);
    return;
  }

  if (quantity !== undefined && !isPositiveInteger(quantity)) {
    sendBadRequest(res, `Quantity must be a positive integer between ${quantityMin} and ${quantityMax}`);
    return;
  }

  if (quantity !== undefined && (quantity < quantityMin || quantity > quantityMax)) {
    sendBadRequest(res, `Quantity must be between ${quantityMin} and ${quantityMax}`);
    return;
  }

  next();
}

/**
 * Validiert die Request-Body für das Aktualisieren eines Items.
 */
export function validateUpdateItem(req: Request, res: Response, next: NextFunction): void {
  const { bought, quantity } = req.body;

  if (bought === undefined && quantity === undefined) {
    sendBadRequest(res, 'At least one field (bought or quantity) is required');
    return;
  }

  if (bought !== undefined && !isBoolean(bought)) {
    sendBadRequest(res, 'Bought must be a boolean value');
    return;
  }

  if (quantity !== undefined) {
    if (!isPositiveInteger(quantity)) {
      sendBadRequest(res, `Quantity must be a positive integer`);
      return;
    }
    if (quantity < quantityMin || quantity > quantityMax) {
      sendBadRequest(res, `Quantity must be between ${quantityMin} and ${quantityMax}`);
      return;
    }
  }

  next();
}

/**
 * Validiert die ID-Parameter.
 */
export function validateIdParam(req: Request, res: Response, next: NextFunction): void {
  const { id } = req.params;

  if (!isValidMongoId(id)) {
    sendBadRequest(res, 'Invalid ID format');
    return;
  }

  next();
}
