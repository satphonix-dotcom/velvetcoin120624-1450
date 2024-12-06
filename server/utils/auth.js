import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// Token blacklist (in production, use Redis)
const tokenBlacklist = new Set();

export const generateToken = (userId) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { 
      expiresIn: '7d',
      jwtid: crypto.randomBytes(16).toString('hex')
    }
  );
  return token;
};

export const invalidateToken = (token) => {
  tokenBlacklist.add(token);
};

export const isTokenBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};

export const generatePasswordResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return { salt, hash };
};

export const verifyPassword = (password, hash, salt) => {
  const verifyHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === verifyHash;
};