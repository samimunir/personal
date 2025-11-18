import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TTL: process.env.JWT_ACCESS_TTL,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TTL: process.env.JWT_REFRESH_TTL,
  PSW_RESET_TOKEN_SECRET: process.env.PSW_RESET_TOKEN_SECRET,
  PSW_RESET_TTL: process.env.PSW_RESET_TTL,
};

export default env;
