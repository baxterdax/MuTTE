import { Request } from 'express';
import rateLimit from 'express-rate-limit';

export const createRateLimiter = () => {
  return rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: async (_req: Request) => {
      // Future: per-tenant dynamic limits using (req as AuthRequest).tenant
      // Default rate limit per tenant
      return parseInt(process.env.MAX_REQUESTS_PER_MINUTE || '100', 10);
    },
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this tenant, please try again later.',
  });
};
