import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "../config/env.js";

const r = Router();

// Public browse
r.use(
  "/products",
  createProxyMiddleware({
    target: `${env.upstream.catalog}/products`,
    changeOrigin: false,
    xfwd: true,
    logLevel: "debug",
    ignorePath: true, // keep target path exactly "/products"
  })
);

r.use(
  "/services",
  createProxyMiddleware({
    target: `${env.upstream.catalog}/services`,
    changeOrigin: false,
    xfwd: true,
    logLevel: "debug",
    ignorePath: true,
  })
);

// Admin CRUD (if you’re calling these through the gateway)
r.use(
  "/admin/products",
  createProxyMiddleware({
    target: `${env.upstream.catalog}/admin/products`,
    changeOrigin: false,
    xfwd: true,
    logLevel: "debug",
    ignorePath: true,
  })
);
r.use(
  "/admin/services",
  createProxyMiddleware({
    target: `${env.upstream.catalog}/admin/services`,
    changeOrigin: false,
    xfwd: true,
    logLevel: "debug",
    ignorePath: true,
  })
);

export default r;
