import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "../config/env.js";
import { requireAuth } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/rbac.js";

const router = Router();

// Public proxy (no auth)
const publicProxy = createProxyMiddleware({
  target: env.upstream.catalog,
  changeOrigin: false,
  xfwd: true,
});

// Admin proxy (auth + role)
const adminProxy = createProxyMiddleware({
  target: env.upstream.catalog,
  changeOrigin: false,
  xfwd: true,
});

// Public browsing (all subpaths included, no wildcard needed)
router.use("/products", publicProxy);
router.use("/services", publicProxy);

// Admin routes (protect, then proxy everything under /admin)
router.use("/admin", requireAuth, requireRole("ADMIN"), adminProxy);

export default router;
