import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use((req, res, next) => {
  const path = req.path || req.originalUrl || "";
  if (path.startsWith("/payments") || path.startsWith("/webhooks/stripe")) {
    return next();
  }

  return express.json()(req, res, next);
});

app.use((req, _res, next) => {
  console.log(`[GATEWAY] ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/", router);

export default app;
