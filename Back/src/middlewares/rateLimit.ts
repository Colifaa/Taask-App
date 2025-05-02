import rateLimit from 'express-rate-limit';
import { config } from '../config/config';

export const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    error: 'Demasiadas peticiones, por favor intente más tarde'
  },
  standardHeaders: true,
  legacyHeaders: false,
}); 