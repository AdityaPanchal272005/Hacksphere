import { Router } from 'express';
import {
  createOrderFromCart, // Corrected from placeOrder
  getUserOrders,
} from '../controllers/orders.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validatePagination } from '../middleware/validate.js';

const router = Router();

router.use(requireAuth);

router.post('/', createOrderFromCart); // Corrected from placeOrder
router.get('/', validatePagination, getUserOrders);

export default router;