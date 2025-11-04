import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 4103,
  stripeSecret: process.env.STRIPE_SECRET,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  ordersUrl: process.env.ORDERS_SERVICE_URL || "http://localhost:4105",
};
