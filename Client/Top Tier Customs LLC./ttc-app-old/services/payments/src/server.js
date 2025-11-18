import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

export async function start() {
  if (!env.stripeSecret) {
    throw new Error("STRIPE_SECRET missing");
  }

  if (!env.stripeWebhookSecret) {
    console.warn(
      "⚠ STRIPE_WEBHOOK_SECRET missing (webhook will fail verification)"
    );
  }

  await connectDB();

  app.listen(env.port, () => {
    console.log(`api/payments micro-service live on localhost:${env.port}`);
  });
}
