import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import * as shopifyController from '../controllers/shopifyController.js';

const router = Router();

router.get('/auth', asyncHandler(shopifyController.auth));
router.get('/callback', asyncHandler(shopifyController.callback));
router.get('/products', asyncHandler(shopifyController.products));

export default router;
