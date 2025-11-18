import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import env from "../config/env.js";

const router = express.Router();

const authProxy = createProxyMiddleware({
  target: env.UPSTREAM.AUTH, // e.g. "http://localhost:4001"
  changeOrigin: true,
  xfwd: true,
  logLevel: "debug",
  pathRewrite: (path, req) => {
    // If client hits:   /api/auth/register
    // Auth service sees: /auth/register
    return path.replace(/^\/api\/auth/, "/auth");
  },

  onProxyReq(proxyReq, req) {
    // Only care about JSON bodies
    const contentType = req.headers["content-type"] || "";
    const isJSON = contentType.includes("application/json");

    if (!isJSON) return;
    if (!req.body || !Object.keys(req.body).length) return;

    const bodyData = JSON.stringify(req.body);

    // Make sure headers/body match what we're sending
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

    // Write body to upstream request
    proxyReq.write(bodyData);
  },

  onError(err, _req, res) {
    console.error("[AUTH PROXY ERROR]", err?.message || err);
    if (!res.headersSent) {
      res.status(502).json({ error: "UPSTREAM.AUTH_UNREACHABLE" });
    }
  },
});

// ✅ Attach JSON parser ONLY on this router, BEFORE the proxy
router.use("/auth", express.json(), authProxy);

export const authRouter = router;
