import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "../config/env.js";
import { requireAuth } from "../middlewares/auth.js"; // you already have this

const router = Router();
const ordersProxy = createProxyMiddleware({
  target: env.upstream.orders || "http://localhost:4105",
  changeOrigin: false,
  xfwd: true,
});

router.use("/orders", requireAuth, ordersProxy); // protect user-facing order reads

export default router;
