import app from "./app.js";
import { env } from "./config/env.js";

export async function start() {
  if (!env.stripeSecret) throw new Error("STRIPE_SECRET missing");
  if (!env.stripeWebhookSecret)
    console.warn(
      "⚠ STRIPE_WEBHOOK_SECRET missing (webhook will fail verification)"
    );
  app.listen(env.port, () => console.log("payments :" + env.port));
}
