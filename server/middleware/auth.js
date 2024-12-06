import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

export const protect = catchAsync(async (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    throw new AppError('Please authenticate', 401);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new AppError('User not found', 401);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AppError('User account is deactivated', 401);
    }

    // Check if password was changed after token was issued
    if (user.passwordChangedAt && decoded.iat < user.passwordChangedAt.getTime() / 1000) {
      throw new AppError('Password recently changed. Please log in again', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError('You do not have permission to perform this action', 403);
    }
    next();
  };
};