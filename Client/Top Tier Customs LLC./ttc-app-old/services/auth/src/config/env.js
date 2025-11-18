import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 8081,
  mongoUrl: process.env.MONGO_URL,
  redisUrl: process.env.REDIS_URL,

  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,

  accessTtl: process.env.ACCESS_TOKEN_TTL || "15m",
  refreshTtl: process.env.REFRESH_TOKEN_TTL || "7d",

  cookieName: process.env.REFRESH_COOKIE_NAME || "refresh_token",
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
};
