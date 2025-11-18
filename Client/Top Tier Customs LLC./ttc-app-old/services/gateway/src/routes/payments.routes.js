// import { Router } from "express";
// import { createProxyMiddleware } from "http-proxy-middleware";
// import { env } from "../config/env.js";

// const router = Router();

// // Proxy for /payments/*  (health + intent)
// router.use(
//   "/payments",
//   createProxyMiddleware({
//     target: env.upstream.payments, // e.g. http://localhost:4103
//     changeOrigin: false,
//     xfwd: true,
//     logLevel: "debug", // 👈 adds proxy debug logs
//   })
// );

// // Proxy for /webhooks/stripe  (exact path)
// router.use(
//   "/webhooks/stripe",
//   createProxyMiddleware({
//     target: env.upstream.payments,
//     changeOrigin: false,
//     xfwd: true,
//     logLevel: "debug",
//   })
// );

// export default router;

// import { Router } from "express";
// import { createProxyMiddleware } from "http-proxy-middleware";
// import { env } from "../config/env.js";

// const router = Router();

// // /payments -> forward as-is (mount is fine)
// router.use(
//   "/payments",
//   createProxyMiddleware({
//     target: env.upstream.payments, // e.g. http://localhost:4103
//     changeOrigin: false,
//     xfwd: true,
//     logLevel: "debug",
//   })
// );

// // /webhooks/stripe -> preserve the exact path upstream
// router.use(
//   "/webhooks/stripe",
//   createProxyMiddleware({
//     target: `${env.upstream.payments}/webhooks/stripe`,
//     changeOrigin: false,
//     xfwd: true,
//     prependPath: false, // <-- don't add the mount again
//     logLevel: "debug",
//   })
// );

// export default router;

import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "../config/env.js";

const router = Router();

// Forward /payments/* as-is to the payments service
router.use(
  "/payments",
  createProxyMiddleware({
    target: env.upstream.payments, // e.g., http://localhost:4103
    changeOrigin: false,
    xfwd: true,
    logLevel: "debug",
  })
);

// Webhook: force upstream path to /webhooks/stripe (Express strips the mount)
router.use(
  "/webhooks/stripe",
  createProxyMiddleware({
    target: `${env.upstream.payments}/webhooks/stripe`,
    changeOrigin: false,
    xfwd: true,
    logLevel: "debug",
    ignorePath: true, // 👈 CRUCIAL: do not append the (stripped) req.url; use target path exactly
  })
);

export default router;
