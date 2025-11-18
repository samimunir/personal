import express from "express";
import authRouter from "./routes/auth.routes.js";

const app = express();

/*
    IMPORTANT: no global body parser here.
    - keeping Gateway neutral; parsers are applied per-route.
*/

app.get("/health", (_req, res) => {
  return res.status(200).json({ source: "api/gateway", ok: true });
});

app.use("/auth", authRouter);

export default app;
