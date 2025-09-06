import User from '../models/User.js';
import { ConflictError, UnauthorizedError, ForbiddenError } from '../middleware/errors.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// A simple in-memory store for OTPs for this hackathon.
// In a production app, use a database or a secure cache like Redis.
const otpStore = {};

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'EcoFinds OTP Verification',
      text: `Your OTP for EcoFinds is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP sent to your email.' });
  } catch (err) {
    next(err);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (otpStore[email] && otpStore[email] === otp) {
      delete otpStore[email]; // OTP verified, remove it from store
      res.json({ message: 'OTP verified successfully.' });
    } else {
      return next(new UnauthorizedError('Invalid OTP.'));
    }
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new ConflictError('Email already in use.'));
    }

    const newUser = new User({
      email,
      username,
      passwordHash: password, // The pre-save hook will hash this
      role: 'user', // Default role
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully. Please log in.' });
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