/**
 * Items Controller.
 * Verantwortlich nur für Request/Response-Handling (Single Responsibility).
 * Validierung erfolgt in Middleware.
 */

import { Request, Response } from 'express';
import { itemsService } from '../services/itemsService.js';
import { sendError, sendNotFound } from '../utils/response.js';
import type { CreateItemDTO, UpdateItemDTO } from '../types/index.js';

/**
 * Wrapper für async Controller-Methoden zur einheitlichen Fehlerbehandlung.
 */
function asyncHandler(
  handler: (req: Request, res: Response) => Promise<void>
): (req: Request, res: Response) => void {
  return (req, res) => {
    handler(req, res).catch((error) => {
      console.error('Controller error:', error);
      sendError(res, 'An unexpected error occurred');
    });
  };
}

export const itemsController = {
  /**
   * GET /items - Alle Items abrufen
   */
  getAll: asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const items = await itemsService.findAll();
    res.json(items);
  }),

  /**
   * POST /items - Neues Item erstellen
   * Validierung erfolgt in validateCreateItem Middleware
   */
  create: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name, quantity } = req.body as CreateItemDTO;
    const savedItem = await itemsService.create(name, quantity);
    res.status(201).json(savedItem);
  }),

  /**
   * PUT /items/:id - Item aktualisieren
   * Validierung erfolgt in validateUpdateItem Middleware
   */
  update: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updates = req.body as UpdateItemDTO;

    const updatedItem = await itemsService.update(id, updates);

    if (!updatedItem) {
      sendNotFound(res);
      return;
    }

    res.json(updatedItem);
  }),

  /**
   * DELETE /items/clear - Alle Items löschen
   */
  deleteAll: asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const { deletedCount } = await itemsService.deleteAll();
    res.json({ message: 'All items deleted successfully', deletedCount });
  }),

  /**
   * DELETE /items/:id - Einzelnes Item löschen
   */
  delete: asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedItem = await itemsService.deleteById(id);

    if (!deletedItem) {
      sendNotFound(res);
      return;
    }

    res.json({ message: 'Item deleted successfully', item: deletedItem });
  }),
};
