import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 4105,
  mongoUrl: process.env.MONGO_URL,
};
