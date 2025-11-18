import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "../config/env.js";
const r = Router();
r.use(
  "/inventory",
  createProxyMiddleware({
    target: env.upstream.inventory,
    changeOrigin: false,
    xfwd: true,
    logLevel: "debug",
  })
);
export default r;
