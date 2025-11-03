import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES,
  jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES,
};
