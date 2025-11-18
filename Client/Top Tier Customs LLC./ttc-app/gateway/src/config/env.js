import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  UPSTREAM: {
    AUTH: process.env.AUTH_SERVICE_URL,
  },
};

export default env;
