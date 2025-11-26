import dotenv from "dotenv";

dotenv.config();

const envVAR = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_AT_SECRET: process.env.JWT_AT_SECRET,
  JWT_RT_SECRET: process.env.JWT_RT_SECRET,
};

export default envVAR;
