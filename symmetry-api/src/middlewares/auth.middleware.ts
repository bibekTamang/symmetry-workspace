import { expressjwt } from 'express-jwt';
import { env } from '../config/env';

/**
 * Reusable middleware that locks down routes.
 * If the token is missing or invalid, it automatically throws a 401 Unauthorized error.
 */
export const requireAuth = expressjwt({
  secret: env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'auth', 
});