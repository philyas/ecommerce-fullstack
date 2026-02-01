import { Router } from 'express';
import { itemsController } from '../controllers/itemsController.js';
import {
  validateCreateItem,
  validateUpdateItem,
  validateIdParam,
} from '../middleware/validation.js';

const router = Router();

// GET /items - Alle Items abrufen
router.get('/', itemsController.getAll);

// POST /items - Neues Item erstellen
router.post('/', validateCreateItem, itemsController.create);

// PUT /items/:id - Item aktualisieren
router.put('/:id', validateIdParam, validateUpdateItem, itemsController.update);

// DELETE /items/clear - Alle Items löschen
router.delete('/clear', itemsController.deleteAll);

// DELETE /items/:id - Einzelnes Item löschen
router.delete('/:id', validateIdParam, itemsController.delete);

export default router;
