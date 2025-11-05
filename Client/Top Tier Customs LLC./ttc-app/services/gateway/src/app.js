import express from "express";
import cors from "cors";
import logger from "./libs/logger.js";
import routes from "./routes/index.js";
import error from "./middlewares/error.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(logger);

// IMPORTANT: do NOT parse JSON for proxied /payments/* or /webhooks/stripe
app.use((req, res, next) => {
  const p = req.path || req.originalUrl || "";
  if (p.startsWith("/payments") || p.startsWith("/webhooks/stripe"))
    return next();
  return express.json()(req, res, next);
});

// Debug: show what the gateway receives (before proxy)
app.use((req, _res, next) => {
  console.log(`[gateway] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(routes);
app.use(error);

export default app;
