import { Router } from "express";
import { stripeWebhook } from "../controllers/webhooks.controller.js";

const router = Router();
// NOTE: express.raw is bound in app.js specifically for this path

router.post("/webhooks/stripe", stripeWebhook);

export default router;
