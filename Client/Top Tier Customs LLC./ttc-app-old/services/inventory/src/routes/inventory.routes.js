import { Router } from "express";
import {
  getOne,
  adjust,
  reserve,
  release,
  consume,
  seed,
  health,
} from "../controllers/inventory.controller.js";

const r = Router();

r.get("/inventory/health", health);
r.get("/inventory/:sku", getOne);
r.post("/inventory/adjust", adjust); // { sku, delta }
r.post("/inventory/reserve", reserve); // { sku, qty }
r.post("/inventory/release", release); // { sku, qty }
r.post("/inventory/consume", consume); // { sku, qty }
r.post("/inventory/seed", seed); // [{ sku, stock, reserved?, lowStockThreshold? }]

export default r;
