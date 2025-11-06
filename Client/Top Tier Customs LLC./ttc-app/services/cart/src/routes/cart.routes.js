import { Router } from "express";
import {
  getCart,
  upsertItems,
  removeItem,
  clearCart,
  health,
} from "../controllers/cart.controller.js";

const r = Router();

r.get("/cart/health", health);
r.get("/cart", getCart); // ?userId=dev (until Auth wired)
r.put("/cart/items", upsertItems); // body: { userId, items: [...] }
r.delete("/cart/items/:sku", removeItem); // ?userId=...
r.post("/cart/clear", clearCart); // body: { userId }

export default r;
