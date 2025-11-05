import { Router } from "express";
import health from "./health.routes.js";
import orders from "./orders.routes.js";
const router = Router();
router.use(health);
router.use(orders);
export default router;
