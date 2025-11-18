import { createProxyMiddleware } from "http-proxy-middleware";
import env from "../config/env.js";

const authProxy = createProxyMiddleware({
  target: env.UPSTREAM.AUTH,
  changeOrigin: true,
  logLevel: "info",
  pathRewrite: {
    "^/auth": "",
  },

  onError(err, req, res) {
    console.error("Auth proxy error:", err);
    if (!res.headersSent) {
      res.writeHead(502, { "Content-Type": "application/json" });
    }

    res.end(JSON.stringify({ error: "Auth service unavailable" }));
  },
});

export default authProxy;
