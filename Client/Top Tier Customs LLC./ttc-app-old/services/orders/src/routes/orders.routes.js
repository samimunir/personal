import { Router } from "express";
import { create, getOne, getRecent } from "../controllers/orders.controller.js";
const router = Router();

// Called from Payments webhook (internal). In production, protect via shared secret or network ACL.
router.post("/orders", create);

// Basic fetch by id (protect later via Gateway/RBAC)
router.get("/orders/:id", getOne);

// debug
router.get("/orders/debug/recent", getRecent);

export default router;
