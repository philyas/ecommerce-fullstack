import { Request, Response } from 'express';
import { itemsService } from '../services/itemsService.js';
import { isNonEmptyString, isBoolean, isPositiveInteger } from '../utils/validation.js';
import { sendError, sendBadRequest, sendNotFound } from '../utils/response.js';

export const itemsController = {
  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const items = await itemsService.findAll();
      res.json(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      sendError(res, 'Failed to fetch items');
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, quantity } = req.body;

      if (!isNonEmptyString(name)) {
        sendBadRequest(res, 'Name is required and must be a non-empty string');
        return;
      }

      if (quantity !== undefined && !isPositiveInteger(quantity)) {
        sendBadRequest(res, 'Quantity must be a positive integer');
        return;
      }

      const savedItem = await itemsService.create(name, quantity);
      res.status(201).json(savedItem);
    } catch (error) {
      console.error('Error creating item:', error);
      sendError(res, 'Failed to create item');
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { bought, quantity } = req.body;

      const updates: { bought?: boolean; quantity?: number } = {};

      if (bought !== undefined) {
        if (!isBoolean(bought)) {
          sendBadRequest(res, 'Bought must be a boolean value');
          return;
        }
        updates.bought = bought;
      }

      if (quantity !== undefined) {
        if (!isPositiveInteger(quantity)) {
          sendBadRequest(res, 'Quantity must be a positive integer (1-999)');
          return;
        }
        updates.quantity = quantity;
      }

      if (Object.keys(updates).length === 0) {
        sendBadRequest(res, 'At least one field (bought or quantity) is required');
        return;
      }

      const updatedItem = await itemsService.update(id, updates);

      if (!updatedItem) {
        sendNotFound(res);
        return;
      }

      res.json(updatedItem);
    } catch (error) {
      console.error('Error updating item:', error);
      sendError(res, 'Failed to update item');
    }
  },

  async deleteAll(_req: Request, res: Response): Promise<void> {
    try {
      const { deletedCount } = await itemsService.deleteAll();
      res.json({ message: 'All items deleted successfully', deletedCount });
    } catch (error) {
      console.error('Error deleting all items:', error);
      sendError(res, 'Failed to delete all items');
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedItem = await itemsService.deleteById(id);

      if (!deletedItem) {
        sendNotFound(res);
        return;
      }

      res.json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
      console.error('Error deleting item:', error);
      sendError(res, 'Failed to delete item');
    }
  },
};
