import Order from "../models/Order.js";
import asyncHandler from "../utils/asyncHandler.js";
import { BadRequest, NotFound } from "../utils/httpErrors.js";

export const health = (_req, res) => res.json({ ok: true });

// internal create (called by Payments webhook)
// body: { paymentIntentId, amount, currency, metadata }
export const create = asyncHandler(async (req, res) => {
  console.log("[orders] POST /orders body=", req.body);

  const {
    paymentIntentId,
    amount,
    currency = "usd",
    metadata = {},
  } = req.body || {};
  if (!paymentIntentId || !amount)
    throw BadRequest("paymentIntentId and amount required");

  let items = [];
  try {
    if (metadata.itemsJson) items = JSON.parse(metadata.itemsJson);
  } catch {}

  const doc = await Order.create({
    userId: metadata.userId || null,
    items,
    amount,
    currency,
    status: "paid",
    paymentIntentId,
    metadata,
  });
  res.json({ id: doc._id });
});

export const getOne = asyncHandler(async (req, res) => {
  const doc = await Order.findById(req.params.id);
  if (!doc) throw NotFound("order_not_found");
  res.json(doc);
});
