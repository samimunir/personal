import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import pino from "pino-http";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(pino());

app.get("/health", (req, res) => {
  return res
    .status(200)
    .json({ ok: true, message: "api/auth listening successfully" });
});

app.listen(PORT, () => {
  console.log(`api/auth live on localhost:${PORT}`);
});
