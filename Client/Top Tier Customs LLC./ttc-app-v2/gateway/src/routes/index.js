import { Router } from "express";
import { authRouter } from "./auth.routes.js";
import { catalogRouter } from "./catalog.routes.js";
import { billingRouter } from "./billing.routes.js";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";

const router = Router();

router.use("/health", (_req, res) => {
  return res.status(200).json({ service: "GATEWAY", ok: true });
});

router.use(authRouter);

router.use("/catalog/admin", requireAuth, requireRole("admin"), catalogRouter);
router.use(catalogRouter);

router.use(billingRouter);

export default router;
