import { Router } from "express";
import { stripeWebhook } from "../controllers/webhooks.controller.js";
const router = Router();
router.post("/webhooks/stripe", stripeWebhook); // exact path
export default router;
