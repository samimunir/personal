import express from "express";
import cors from "cors";
import envVAR from "./config/env.js";
import connectDB from "./lib/mongodb.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.use("/", (req, _res, next) => {
  console.log(`📲 [${req.method}] - ${req.originalUrl}`);
  next();
});

app.use("/api/auth", authRouter);

app.get("/api/health", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "MaraveX API status OK.", ok: true });
});

app.listen(envVAR.PORT, () => {
  connectDB().then(() => {
    console.log(
      `✅ MaraveX server API is live on http://localhost:${envVAR.PORT} 🌐`
    );
  });
});
