import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 4102,
  mongoUrl: process.env.MONGO_URL,
};
