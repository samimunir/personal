import { Router } from "express";
import { health } from "../controllers/payments.controller.js";

const router = Router();

router.get("/payments/health", health);

export default router;
