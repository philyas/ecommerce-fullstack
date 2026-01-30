import { Request, Response } from 'express';
import { itemsService } from '../services/itemsService.js';
import { isNonEmptyString, isBoolean } from '../utils/validation.js';
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
      const { name } = req.body;

      if (!isNonEmptyString(name)) {
        sendBadRequest(res, 'Name is required and must be a non-empty string');
        return;
      }

      const savedItem = await itemsService.create(name);
      res.status(201).json(savedItem);
    } catch (error) {
      console.error('Error creating item:', error);
      sendError(res, 'Failed to create item');
    }
  },

  async updateBought(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { bought } = req.body;

      if (!isBoolean(bought)) {
        sendBadRequest(res, 'Bought must be a boolean value');
        return;
      }

      const updatedItem = await itemsService.updateBought(id, bought);

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
