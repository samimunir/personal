import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
router.get("/me", requireAuth, (req, res) => {
  const { sub, roles } = req.user || {};
  res.json({ userId: sub, roles });
});
export default router;
