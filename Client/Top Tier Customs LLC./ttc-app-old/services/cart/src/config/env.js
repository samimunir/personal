import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 8086,
  mongoUrl: process.env.MONGO_URL,
};
