import express from "express";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  return res.status(200).json({ source: "api/auth", ok: true });
});

app.use("/", authRouter);

export default app;
