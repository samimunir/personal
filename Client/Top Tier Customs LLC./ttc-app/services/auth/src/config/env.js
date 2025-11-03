import dotenv from "dotenv";

dotenv.config();

export const cfg = {
  port: Number(process.env.PORT) || 8081,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES,
  jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES,
};
