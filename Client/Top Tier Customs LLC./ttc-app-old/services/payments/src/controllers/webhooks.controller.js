// import Stripe from "stripe";
// import { env } from "../config/env.js";
// import axios from "axios";

// // Stripe verifies against the raw body; see app.js note for route order
// const stripe = new Stripe(env.stripeSecret, { apiVersion: "2024-06-20" });

// export function stripeWebhook(req, res) {
//   const sig = req.headers["stripe-signature"];
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       env.stripeWebhookSecret
//     );
//   } catch (err) {
//     console.error("Webhook signature verify failed:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === "payment_intent.succeeded") {
//     const pi = event.data.object;
//     // Example: forward to Orders (internal)
//     const payload = {
//       paymentIntentId: pi.id,
//       amount: pi.amount,
//       currency: pi.currency,
//       metadata: pi.metadata || {},
//     };

//     const url = `${env.ordersUrl}/orders`;
//     console.log(
//       "[payments] calling orders:",
//       url,
//       "payload=",
//       JSON.stringify(payload)
//     );

//     axios
//       .post(url, payload, { timeout: 10000 })
//       .then((r) => console.log("[payments] orders response", r.status))
//       .catch((e) => {
//         const data = e?.response?.data;
//         console.error("[payments] orders create error:", e.message, data || "");
//       });
//   }

//   res.json({ received: true });
// }

import axios from "axios";
import { ProcessedEvent } from "../models/processedEvent.model.js";
import { env } from "../config/env.js";
import Stripe from "stripe";
const stripe = new Stripe(env.stripeSecret, { apiVersion: "2024-06-20" });

export async function stripeWebhook(req, res) {
  try {
    const sig = req.headers["stripe-signature"];
    const evt = stripe.webhooks.constructEvent(
      req.body,
      sig,
      env.stripeWebhookSecret
    );

    // idempotency guard
    const already = await ProcessedEvent.findOne({ eventId: evt.id });
    if (already) return res.json({ ok: true, dedup: true });

    if (evt.type === "payment_intent.succeeded") {
      const pi = evt.data.object;

      const payload = {
        paymentIntentId: pi.id,
        amount: pi.amount,
        currency: pi.currency,
        metadata: pi.metadata || {},
      };

      // simple retry (3 attempts, 300ms backoff)
      let err;
      for (let i = 0; i < 3; i++) {
        try {
          await axios.post(`${env.ordersUrl}/orders`, payload, {
            timeout: 5000,
          });
          err = null;
          break;
        } catch (e) {
          err = e;
          await new Promise((r) => setTimeout(r, 300 * (i + 1)));
        }
      }
      if (err) {
        console.error(
          "[payments] orders create error:",
          err?.response?.status || err.message
        );
        // still record the event so we don’t loop; a dead-letter table is a nice next step
      }
    }

    await ProcessedEvent.create({ eventId: evt.id, type: evt.type });
    res.json({ ok: true });
  } catch (e) {
    console.error("webhook error:", e.message);
    res.status(400).send("Webhook Error");
  }
}
