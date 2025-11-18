import { Router } from "express";
import health from "./health.routes.js";
import payments from "./payments.routes.js";
import webhooks from "./webhooks.routes.js";
const router = Router();
router.use(health);
router.use(payments);
router.use(webhooks);
export default router;
