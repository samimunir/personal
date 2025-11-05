import express from "express";
import cors from "cors";
import logger from "./libs/logger.js";
import routes from "./routes/index.js";
import error from "./middlewares/error.js";

const app = express();

// RAW body for Stripe webhook ONLY (must be before any json/body parsing)
app.use("/webhooks/stripe", express.raw({ type: "application/json" }));

// JSON for everything else
app.use(express.json());
app.use(cors({ origin: true }));
app.use(logger);

// Debug: log request line so we can see what reaches the service
app.use((req, _res, next) => {
  console.log(`[payments] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(routes);
app.use(error);

export default app;
