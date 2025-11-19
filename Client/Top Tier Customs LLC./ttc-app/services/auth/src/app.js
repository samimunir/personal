import express from "express";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`\n[AUTH] 🔐 ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/health", (_req, res) => {
  return res.status(200).json({ source: "api/auth", ok: true });
});

app.use("/", authRouter);

export default app;
