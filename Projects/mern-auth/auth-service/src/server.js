import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import router from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

connectDB();

app.use(morgan("dev"));

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "auth-service" });
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Auth service running on http://localhost:${PORT}`);
});
