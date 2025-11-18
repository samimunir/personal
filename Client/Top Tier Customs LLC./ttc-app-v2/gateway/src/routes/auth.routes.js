import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import env from "../config/env.js";

const authProxy = createProxyMiddleware({
  target: env.UPSTREAM.AUTH,
  changeOrigin: true,
  xfwd: true,
  preserveHeaderKeyCase: true,

  onProxyReq(proxyReq, req) {
    const isJSON =
      req.headers["content-type"] &&
      req.headers["content-type"].includes("application/json");

    if (isJSON && req.body && Object.keys(req.body).length) {
      const body = JSON.stringify(req.body);

      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Content-Length", Buffer.byteLength(body));
      proxyReq.write(body);
    }

    if (req.user) {
      proxyReq.setHeader("x-user-id", req.user.id);
      proxyReq.setHeader("x-user-roles", (req.user.roles || []).join(","));
    }
  },

  onError(err, _req, res) {
    console.error("[AUTH PROXY ERROR]", this.target, err?.message || err);

    if (!res.headersSent) {
      return res.status(502).json({ error: "UPSTREAM.AUTH_UNREACHABLE" });
    }
  },
});

export const authRouter = Router();

authRouter.use("/auth", authProxy);
