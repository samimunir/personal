import { Router } from "express";
import billingRouter from "./billing.routes.js";

const router = Router();

router.use(billingRouter);

export default router;
