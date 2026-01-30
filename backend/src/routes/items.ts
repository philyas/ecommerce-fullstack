import { Router } from 'express';
import { itemsController } from '../controllers/itemsController.js';

const router = Router();

router.get('/', itemsController.getAll);
router.post('/', itemsController.create);
router.put('/:id', itemsController.updateBought);
router.delete('/:id', itemsController.delete);

export default router;
