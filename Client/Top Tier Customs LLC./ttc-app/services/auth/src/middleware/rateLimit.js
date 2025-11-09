import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60, // 60 req/min per IP
  standardHeaders: true,
  legacyHeaders: false,
});
