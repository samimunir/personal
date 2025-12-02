import dotenv from "dotenv";

dotenv.config();

const envVAR = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  JWT_AT_SECRET: process.env.JWT_AT_SECRET,
  JWT_AT_TTL: process.env.JWT_AT_TTL,
  JWT_RT_SECRET: process.env.JWT_RT_SECRET,
  JWT_RT_TTL: process.env.JWT_RT_TTL,
};

export default envVAR;
