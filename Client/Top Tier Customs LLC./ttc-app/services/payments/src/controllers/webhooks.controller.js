import Stripe from "stripe";
import { env } from "../config/env.js";
import axios from "axios";

// Stripe verifies against the raw body; see app.js note for route order
const stripe = new Stripe(env.stripeSecret, { apiVersion: "2024-06-20" });

export function stripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      env.stripeWebhookSecret
    );
  } catch (err) {
    console.error("Webhook signature verify failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object;
    // Example: forward to Orders (internal)
    const payload = {
      paymentIntentId: pi.id,
      amount: pi.amount,
      currency: pi.currency,
      metadata: pi.metadata || {},
    };

    const url = `${env.ordersUrl}/orders`;
    console.log(
      "[payments] calling orders:",
      url,
      "payload=",
      JSON.stringify(payload)
    );

    // axios
    //   .post(`${env.ordersUrl}/orders`, {
    //     paymentIntentId: pi.id,
    //     amount: pi.amount,
    //     currency: pi.currency,
    //     // Forward metadata (e.g., itemsJson, userId, type)
    //     metadata: pi.metadata || {},
    //   })
    //   .catch((e) =>
    //     console.error("orders create error:", e?.response?.data || e.message)
    //   );

    axios
      .post(url, payload, { timeout: 10000 })
      .then((r) => console.log("[payments] orders response", r.status))
      .catch((e) => {
        const data = e?.response?.data;
        console.error("[payments] orders create error:", e.message, data || "");
      });
  }

  res.json({ received: true });
}
