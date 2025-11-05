import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "../config/env.js";

const router = Router();

// Proxy for /payments/*  (health + intent)
router.use(
  "/payments",
  createProxyMiddleware({
    target: env.upstream.payments, // e.g. http://localhost:4103
    changeOrigin: false,
    xfwd: true,
    logLevel: "debug", // 👈 adds proxy debug logs
  })
);

// Proxy for /webhooks/stripe  (exact path)
router.use(
  "/webhooks/stripe",
  createProxyMiddleware({
    target: env.upstream.payments,
    changeOrigin: false,
    xfwd: true,
    logLevel: "debug",
  })
);

export default router;
