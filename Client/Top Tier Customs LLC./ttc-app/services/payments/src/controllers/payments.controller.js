import Stripe from "stripe";
import { env } from "../config/env.js";

const stripe = new Stripe(env.stripeSecret, {
  apiVersion: "2024-06-20",
  timeout: 20000,
});

export async function createIntent(req, res) {
  const { amount, currency = "usd", metadata = {} } = req.body || {};
  if (!amount || typeof amount !== "number")
    return res.status(400).json({ error: "amount_required_number" });

  // allow_redirects: 'always' (frontend ready) or 'never' (CLI/dev)
  const allowRedirects =
    req.query.noRedirects === "1" ||
    process.env.PAYMENTS_ALLOW_REDIRECTS === "false"
      ? "never"
      : "always";

  const pi = await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: allowRedirects,
    },
    metadata,
  });
  res.json({ clientSecret: pi.client_secret, paymentIntentId: pi.id });
}

// import Stripe from "stripe";
// import { env } from "../config/env.js";

// const stripe = new Stripe(env.stripeSecret, { apiVersion: "2024-06-20" });

// // POST /payments/intent { amount, currency?, metadata? }
// export async function createIntent(req, res) {
//   const { amount, currency = "usd", metadata = {} } = req.body || {};
//   if (!amount || typeof amount !== "number")
//     return res.status(400).json({ error: "amount_required" });
//   const pi = await stripe.paymentIntents.create({
//     amount,
//     currency,
//     automatic_payment_methods: { enabled: true },
//     metadata, // e.g. { type: 'catalog', userId, itemsJson, ... }
//   });
//   res.json({ clientSecret: pi.client_secret, paymentIntentId: pi.id });
// }

export function health(_req, res) {
  res.json({ ok: true });
}
