import { Router } from 'express';
import {
  checkEmailExists,
  requestOtp,
  verifyOtp,
  login,
  register,
} from '../controllers/auth.controller.js';
import {
  validateCheckEmail,
  validateRequestOtp,
  validateVerifyOtp,
  validateAuthLogin,
  validateRegister,
} from '../middleware/validate.js';
import { authRateLimiter } from '../middleware/rateLimit.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/check-email', validateCheckEmail, checkEmailExists);
router.post('/request-otp', authRateLimiter, validateRequestOtp, requestOtp);
router.post('/verify-otp', authRateLimiter, validateVerifyOtp, verifyOtp);
router.post('/register', authRateLimiter, validateRegister, register);
router.post('/login', authRateLimiter, validateAuthLogin, login);
router.get('/profile', requireAuth, (req, res) => res.json(req.user));

export default router;