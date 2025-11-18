import dotnenv from "dotenv";

dotnenv.config();

const env = {
  PORT: Number(process.env.PORT),
  JWT_SECRET: process.env.JWT_SECRET,
  UPSTREAM: {
    AUTH: process.env.AUTH_SERVICE_URL,
    CATALOG: process.env.CATALOG_SERVICE_URL,
    BILLING: process.env.BILLING_SERVICE_URL,
  },
};

export default env;
