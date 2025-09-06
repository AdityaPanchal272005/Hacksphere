import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  deleteUser,
} from '../controllers/users.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validateUserUpdate } from '../middleware/validate.js';

const router = Router();

router.use(requireAuth);

router.get('/profile', getProfile);
router.put('/profile', validateUserUpdate, updateProfile);
router.delete('/', deleteUser);

export default router;