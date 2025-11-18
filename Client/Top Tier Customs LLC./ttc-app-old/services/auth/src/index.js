import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import pino from "pino-http";

import { env } from "./config/env.js";
import { connectMongo } from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import { authLimiter } from "./middleware/rateLimit.js";
import { router as authRoutes } from "./routes/auth.routes.js";
import { HttpError } from "./utils/errors.js";

const app = express();

app.use(helmet());
app.use(pino());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// health
app.get("/auth/health", (_req, res) => res.json({ ok: true }));

// rate limit on auth endpoints
app.use(["/auth/signup", "/auth/login", "/auth/refresh"], authLimiter);

// routes
app.use(authRoutes);

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.name === "ZodError") {
    return res
      .status(400)
      .json({ error: "validation_error", details: err.errors });
  }
  if (err instanceof HttpError) {
    return res
      .status(err.status)
      .json({ error: err.code, message: err.message });
  }
  console.error(err);
  res.status(500).json({ error: "internal_error" });
});

async function main() {
  await connectMongo();
  await connectRedis();
  app.listen(env.port, () =>
    console.log(`api/auth live on localhost:${env.port}`)
  );
}

main().catch((err) => {
  console.error("Fatal startup error", err);
  process.exit(1);
});
