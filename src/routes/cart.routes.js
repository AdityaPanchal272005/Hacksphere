import { Router } from 'express';
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
} from '../controllers/cart.controller.js';
import { requireAuth } from '../middleware/auth.js';
import {
  validateCartAddItem,
  validateCartRemoveItem,
} from '../middleware/validate.js';

const router = Router();

router.use(requireAuth);

router.get('/', getCart);
router.post('/add', validateCartAddItem, addItemToCart);
router.post('/remove', validateCartRemoveItem, removeItemFromCart);

export default router;