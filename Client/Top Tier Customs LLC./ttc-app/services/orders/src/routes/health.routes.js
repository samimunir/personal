import { Router } from "express";
import { health } from "../controllers/orders.controller.js";
const router = Router();
router.get("/orders/health", health);
export default router;
