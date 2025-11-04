import express from "express";
import cors from "cors";
import logger from "./libs/logger.js";
import routes from "./routes/index.js";
import error from "./middlewares/error.js";

const app = express();

// Stripe webhook needs raw body BEFORE express.json
app.use("/webhooks/stripe", express.raw({ type: "application/json" }));

app.use(cors({ origin: true }));
app.use(express.json()); // normal JSON for the rest
app.use((req, _res, next) => {
  // keep rawBody for webhook controller
  if (req.originalUrl === "/webhooks/stripe") return next();
  next();
});
app.use(logger);
app.use(routes);
app.use(error);

export default app;
