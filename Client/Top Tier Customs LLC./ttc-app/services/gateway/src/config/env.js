import "dotenv/config";

export const env = {
  port: Number(process.env.PORT) || 5000,
  jwtSecret: process.env.JWT_SECRET || "dev_super_secret_change_me",
  upstream: {
    auth: process.env.AUTH_SERVICE_URL || "http://localhost:4101",
    catalog: process.env.CATALOG_SERVICE_URL || "http://localhost:4102",
    payments: process.env.PAYMENTS_SERVICE_URL || "http://localhost:4103",
    bookings: process.env.BOOKINGS_SERVICE_URL || "http://localhost:4104",
  },
};
