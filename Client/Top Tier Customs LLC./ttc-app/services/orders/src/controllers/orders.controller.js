import axios from "axios";
import Order from "../models/Order.js";
import asyncHandler from "../utils/asyncHandler.js";
import { NotFound } from "../utils/httpErrors.js";

// if you already have a central env loader, use that instead
const INVENTORY_URL =
  process.env.INVENTORY_SERVICE_URL || "http://localhost:8087";

export const health = (_req, res) => res.json({ ok: true });

function parseItemsFromMetadata(metadata = {}) {
  try {
    if (typeof metadata.itemsJson === "string") {
      const arr = JSON.parse(metadata.itemsJson);
      if (Array.isArray(arr)) return arr;
    }
    if (Array.isArray(metadata.items)) return metadata.items;
  } catch (_) {}
  return [];
}

// body: { paymentIntentId, amount, currency, metadata }
export const create = asyncHandler(async (req, res) => {
  const {
    paymentIntentId,
    amount,
    currency = "usd",
    metadata = {},
  } = req.body || {};
  if (!paymentIntentId || !amount) {
    return res
      .status(400)
      .json({
        error: "bad_request",
        message: "paymentIntentId and amount required",
      });
  }

  const items = parseItemsFromMetadata(metadata);

  const doc = await Order.create({
    userId: metadata.userId || null,
    items, // denormalized for quick reads
    amount,
    currency,
    status: "paid",
    paymentIntentId,
    metadata,
  });

  // Best-effort inventory consumption (log + retry)
  if (INVENTORY_URL && items.length) {
    for (const it of items) {
      let lastErr = null;
      for (let i = 0; i < 3; i++) {
        try {
          console.log("[orders] consume", it.sku, "qty=", it.qty);
          await axios.post(
            `${INVENTORY_URL}/inventory/consume`,
            { sku: it.sku, qty: it.qty },
            { timeout: 4000 }
          );
          lastErr = null;
          break;
        } catch (e) {
          lastErr = e;
          await new Promise((r) => setTimeout(r, 300 * (i + 1))); // 300ms, 600ms
        }
      }
      if (lastErr) {
        console.error(
          "[orders] inventory consume error:",
          it.sku,
          lastErr?.response?.status || lastErr.message
        );
      }
    }
  } else if (!items.length) {
    console.warn(
      "[orders] no items parsed from metadata; inventory not consumed"
    );
  }

  res.json({ id: doc._id });
});

export const getOne = asyncHandler(async (req, res) => {
  const doc = await Order.findById(req.params.id);
  if (!doc) throw NotFound("order_not_found");
  res.json(doc);
});

// handy for local verification
export const getRecent = asyncHandler(async (_req, res) => {
  const list = await Order.find().sort({ createdAt: -1 }).limit(10);
  res.json(list);
});
