import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "../config/env.js";

const AUTH_TARGET = env.upstream.auth; // e.g. http://localhost:8081
if (!AUTH_TARGET) {
  console.warn("[gateway] AUTH_SERVICE_URL is missing");
}

const authProxy = createProxyMiddleware({
  target: AUTH_TARGET,
  changeOrigin: true,
  xfwd: true, // add X-Forwarded-* headers
  preserveHeaderKeyCase: true,
  // We proxy *before* JSON body parsing in index.js, so we don't need to re-write body.
  // If you mount this after express.json(), uncomment the onProxyReq block below.

  // onProxyReq(proxyReq, req, _res) {
  //   if (req.body && ['POST','PUT','PATCH'].includes(req.method)) {
  //     const bodyData = JSON.stringify(req.body);
  //     proxyReq.setHeader('Content-Type', 'application/json');
  //     proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
  //     proxyReq.write(bodyData);
  //   }
  // },

  onError(err, _req, res) {
    console.error("[gateway->auth] proxy error:", err?.message || err);
    if (!res.headersSent) res.status(502).json({ error: "auth_unreachable" });
  },
});

export const authRouter = Router();
// Everything under /auth is forwarded 1:1 to the auth service
authRouter.use("/auth", authProxy);
