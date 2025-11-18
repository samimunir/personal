import { Stock } from "../models/stock.model.js";

export async function getOne(req, res) {
  const { sku } = req.params;
  const doc = await Stock.findOne({ sku });
  if (!doc) return res.status(404).json({ error: "not_found" });
  res.json(doc);
}

export async function adjust(req, res) {
  const { sku, delta } = req.body; // delta can be +/- number
  if (!sku || typeof delta !== "number")
    return res.status(400).json({ error: "bad_request" });
  const doc = await Stock.findOneAndUpdate(
    { sku },
    { $inc: { stock: delta } },
    { new: true, upsert: true }
  );
  res.json(doc);
}

export async function reserve(req, res) {
  const { sku, qty } = req.body;
  if (!sku || !qty) return res.status(400).json({ error: "bad_request" });
  const doc = await Stock.findOne({ sku });
  if (!doc || doc.stock - doc.reserved < qty)
    return res.status(409).json({ error: "insufficient_stock" });
  doc.reserved += qty;
  await doc.save();
  res.json(doc);
}

export async function release(req, res) {
  const { sku, qty } = req.body;
  const doc = await Stock.findOne({ sku });
  if (!doc) return res.status(404).json({ error: "not_found" });
  doc.reserved = Math.max(0, doc.reserved - qty);
  await doc.save();
  res.json(doc);
}

// export async function consume(req, res) {
//   const { sku, qty } = req.body;
//   const doc = await Stock.findOne({ sku });
//   if (!doc || doc.reserved < qty)
//     return res.status(409).json({ error: "not_reserved" });
//   doc.reserved -= qty;
//   doc.stock = Math.max(0, doc.stock - qty);
//   await doc.save();
//   res.json(doc);
// }

export async function consume(req, res) {
  const { sku, qty } = req.body;
  if (!sku || typeof qty !== "number" || qty <= 0) {
    return res
      .status(400)
      .json({ error: "bad_request", message: "sku and positive qty required" });
  }

  const doc = await Stock.findOne({ sku });
  if (!doc) return res.status(404).json({ error: "not_found" });

  const available = (doc.stock ?? 0) - (doc.reserved ?? 0);

  // Preferred path: if we had previously reserved qty, finalize it.
  if ((doc.reserved ?? 0) >= qty) {
    doc.reserved -= qty;
    doc.stock = Math.max(0, doc.stock - qty);
    await doc.save();
    return res.json({
      ok: true,
      mode: "reserved->consumed",
      sku,
      stock: doc.stock,
      reserved: doc.reserved,
    });
  }

  // MVP path: no reservation; consume from available stock if possible.
  if (available >= qty) {
    doc.stock = Math.max(0, doc.stock - qty);
    await doc.save();
    return res.json({
      ok: true,
      mode: "direct-consume",
      sku,
      stock: doc.stock,
      reserved: doc.reserved,
    });
  }

  // Not enough inventory either way
  return res
    .status(409)
    .json({
      error: "insufficient_stock",
      sku,
      stock: doc.stock,
      reserved: doc.reserved,
    });
}

export async function seed(req, res) {
  const items = req.body.items || [];
  const ops = items.map((i) =>
    Stock.updateOne({ sku: i.sku }, { $set: i }, { upsert: true })
  );
  await Promise.all(ops);
  res.json({ ok: true });
}

export async function health(_req, res) {
  res.json({ ok: true });
}
