import { Router } from 'express';
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from '../controllers/categories.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { validateCategory } from '../middleware/validate.js';

const router = Router();

router.get('/', getAllCategories);
router.post('/', requireAuth, requireAdmin, validateCategory, createCategory);
router.delete('/:slug', requireAuth, requireAdmin, deleteCategory);

export default router;