import User from '../models/User.js';
import { ConflictError, UnauthorizedError, ForbiddenError } from '../middleware/errors.js';
import jwt from 'jsonwebtoken';

// Note: You will need a way to send OTPs (e.g., via email or SMS). 
// You can use a service like Nodemailer, Twilio, or Firebase. 
// For this example, we will just simulate it.

export const checkEmailExists = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({ exists: true });
    }
    res.json({ exists: false });
  } catch (err) {
    next(err);
  }
};

export const requestOtp = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // Simulate OTP generation and sending for existing user.
      // In a real app, this would be a trigger for an external service.
      return res.json({ message: 'OTP sent to your email.' });
    }
    // Logic for new user, e.g., create a temporary user record
    // and send a registration OTP.
    res.json({ message: 'OTP sent to your email.' });
  } catch (err) {
    next(err);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    // In a real app, you would verify the OTP here.
    // E.g., check against a stored OTP code.
    // Assuming for simplicity that it always succeeds for now.
    res.json({ message: 'OTP verified successfully.' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      return next(new UnauthorizedError('Invalid credentials.'));
    }
    const isMatch = await user.comparePassword(password); // Assumes you add a comparePassword method to your User model
    if (!isMatch) {
      return next(new UnauthorizedError('Invalid credentials.'));
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({
      message: 'Logged in successfully.',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};