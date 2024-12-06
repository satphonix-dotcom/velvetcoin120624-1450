import session from 'express-session';
import MongoStore from 'connect-mongo';
import { v4 as uuidv4 } from 'uuid';

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  name: 'sessionId', // Custom session cookie name
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 24 * 60 * 60, // Session TTL in seconds
    crypto: {
      secret: process.env.SESSION_ENCRYPT_SECRET
    }
  }),
  resave: false,
  saveUninitialized: false,
  genid: () => uuidv4(), // Generate unique session IDs
  rolling: true, // Reset cookie maxAge on each request
});

// Session security middleware
export const sessionSecurity = (req, res, next) => {
  // Regenerate session on authentication
  if (req.path === '/api/auth/login' && req.method === 'POST') {
    req.session.regenerate((err) => {
      if (err) next(err);
      next();
    });
    return;
  }

  // Check for session fixation
  if (req.session.isAuthenticated && !req.session.initializedAt) {
    req.session.regenerate((err) => {
      if (err) next(err);
      req.session.initializedAt = Date.now();
      next();
    });
    return;
  }

  next();
};