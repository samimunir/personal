import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
};

export default env;
