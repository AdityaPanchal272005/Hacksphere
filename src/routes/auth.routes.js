import { Router } from 'express';
import {
  checkEmailExists,
  requestOtp,
  verifyOtp,
  login,
} from '../controllers/auth.controller.js';
import {
  validateCheckEmail,
  validateRequestOtp,
  validateVerifyOtp,
  validateAuthLogin,
} from '../middleware/validate.js';
import { authRateLimiter } from '../middleware/rateLimit.js';

const router = Router();

router.post('/check-email', validateCheckEmail, checkEmailExists);
router.post('/request-otp', authRateLimiter, validateRequestOtp, requestOtp);
router.post('/verify-otp', authRateLimiter, validateVerifyOtp, verifyOtp);
router.post('/login', authRateLimiter, validateAuthLogin, login);

export default router;