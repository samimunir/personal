import { Router } from "express";
import { createIntent } from "../controllers/payments.controller.js";
const router = Router();

// accept both
router.post("/payments/intent", createIntent);
router.post("/intent", createIntent);

export default router;
