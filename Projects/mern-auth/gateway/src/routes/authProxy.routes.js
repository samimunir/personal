import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

const target = process.env.AUTH_SERVICE_URL || "http://localhost:8081";

// everything under /api/auth goes to auth-service
router.use("/", createProxyMiddleware({ target, changeOrigin: true }));

export default router;
