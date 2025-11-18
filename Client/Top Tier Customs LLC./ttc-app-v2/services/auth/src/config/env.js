import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  REDIS: {
    URI: process.env.REDIS_URI,
    USERNAME: process.env.REDIS_USERNAME,
    PASSWORD: process.env.REDIS_PASSWORD,
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
  },
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  ACCESS_TTL: process.env.ACCESS_TTL,
  REFRESH_TTL: process.env.REFRESH_TTL,
  REFRESH_COOKIE_NAME: process.env.REFRESH_COOKIE_NAME,
};

export default env;
