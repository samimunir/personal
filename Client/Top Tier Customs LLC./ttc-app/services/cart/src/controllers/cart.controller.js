import { Cart } from "../models/cart.model.js";

export async function getCart(req, res) {
  const userId = req.user?.sub || req.query.userId; // dev fallback
  if (!userId) return res.status(400).json({ error: "user_required" });
  const cart =
    (await Cart.findOne({ userId })) || (await Cart.create({ userId }));
  res.json(cart);
}

export async function upsertItems(req, res) {
  const userId = req.user?.sub || req.body.userId;
  const items = Array.isArray(req.body.items) ? req.body.items : [];
  if (!userId) return res.status(400).json({ error: "user_required" });
  if (!items.length) return res.status(400).json({ error: "items_required" });
  const cart =
    (await Cart.findOne({ userId })) || (await Cart.create({ userId }));

  // merge by sku
  for (const it of items) {
    const i = cart.items.find((x) => x.sku === it.sku);
    if (i) {
      i.qty = it.qty ?? i.qty;
      i.unitPrice = it.unitPrice ?? i.unitPrice;
      i.title = it.title ?? i.title;
      i.variant = it.variant ?? i.variant;
      i.image = it.image ?? i.image;
    } else {
      cart.items.push(it);
    }
  }
  cart.recalc();
  await cart.save();
  res.json(cart);
}

export async function removeItem(req, res) {
  const userId = req.user?.sub || req.query.userId;
  const { sku } = req.params;
  if (!userId || !sku) return res.status(400).json({ error: "bad_request" });
  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ error: "not_found" });
  cart.items = cart.items.filter((i) => i.sku !== sku);
  cart.recalc();
  await cart.save();
  res.json(cart);
}

export async function clearCart(req, res) {
  const userId = req.user?.sub || req.body.userId;
  if (!userId) return res.status(400).json({ error: "user_required" });
  const cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ ok: true });
  cart.items = [];
  cart.recalc();
  await cart.save();
  res.json(cart);
}

export async function health(_req, res) {
  res.json({ ok: true });
}
