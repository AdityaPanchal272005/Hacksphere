import { Router } from 'express';
import {
  getCategories,
  createCategory,
} from '../controllers/categories.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { validateCategory } from '../middleware/validate.js';

const router = Router();

router.get('/', getCategories);
router.post('/', requireAuth, requireAdmin, validateCategory, createCategory);

export default router;