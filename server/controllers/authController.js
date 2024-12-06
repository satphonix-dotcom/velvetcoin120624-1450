import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

const signToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

export const register = catchAsync(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  // Create user
  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
  });

  // Generate token
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(201).json({
    status: 'success',
    token,
    user,
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid credentials', 401);
  }

  // Generate token
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.json({
    status: 'success',
    token,
    user,
  });
});

export const getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({
    status: 'success',
    user,
  });
});

export const updateProfile = catchAsync(async (req, res) => {
  const allowedUpdates = ['firstName', 'lastName', 'shippingAddresses', 'cryptoWallets'];
  const updates = Object.keys(req.body)
    .filter(key => allowedUpdates.includes(key))
    .reduce((obj, key) => {
      obj[key] = req.body[key];
      return obj;
    }, {});

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updates,
    { new: true, runValidators: true }
  );

  res.json({
    status: 'success',
    user,
  });
});