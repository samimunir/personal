import { Router } from "express";
import { health } from "../controllers/payments.controller.js";
const router = Router();

// accept both
router.get("/payments/health", health);
router.get("/health", health);

export default router;
