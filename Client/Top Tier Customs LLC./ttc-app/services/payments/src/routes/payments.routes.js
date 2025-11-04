import { Router } from "express";
import { createIntent } from "../controllers/payments.controller.js";

const router = Router();

router.post("/payments/intent", createIntent);

export default router;
