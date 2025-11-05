import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 8082,
  mongoUri: process.env.MONGO_URI,
};
