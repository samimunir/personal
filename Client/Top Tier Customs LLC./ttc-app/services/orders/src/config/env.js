import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 8085,
  mongoUrl: process.env.MONGO_URL,
  inventoryUrl: process.env.INVENTORY_SERVICE_URL,
};
