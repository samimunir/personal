import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import authProxyRouter from "../src/routes/authProxy.routes.js";

const app = express();

const PORT = process.env.PORT || 8080;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

app.use(morgan("dev"));

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));

// app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "gateway" });
});

app.use("/api/auth", authProxyRouter);

app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});
