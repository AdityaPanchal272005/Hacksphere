import { Router } from 'express';
import {
  placeOrder,
  getOrders,
} from '../controllers/orders.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validatePagination } from '../middleware/validate.js';

const router = Router();

router.use(requireAuth);

router.post('/', placeOrder);
router.get('/', validatePagination, getOrders);

export default router;