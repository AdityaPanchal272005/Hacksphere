import { Router } from 'express';
import {
  getCart,
  addToCart,
  removeCartItem,
} from '../controllers/cart.controller.js';
import { requireAuth } from '../middleware/auth.js';
import {
  validateCartAddItem,
  validateCartRemoveItem,
} from '../middleware/validate.js';

const router = Router();

router.use(requireAuth);

router.get('/', getCart);
router.post('/add', validateCartAddItem, addToCart);
router.post('/remove', validateCartRemoveItem, removeCartItem);

export default router;