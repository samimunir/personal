import express from "express";
import cors from "cors";
import pino from "pino-http";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(pino());

mongoose.connect(process.env.MONGO_URI!);

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    passwordHash: String,
    roles: { type: [String], phone: String, avatar: String },
    addresses: [{ type: Object }],
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

const PRIV = process.env.JWT_PRIVATE?.replace(/\n/g, "\n");
const PUB = process.env.JWT_PUBLIC?.replace(/\n/g, "\n");

app.get("/auth/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ error: "email_in_use" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const doc = await User.create({
    email,
    passwordHash,
    roles: roles || ["CUSTOMER"],
  });
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const u = await User.findOne({ email });
  if (!u) {
    return res.status(401).json({ error: "invalid_creds" });
  }

  const ok = await bcrypt.compare(password, u.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: "invalid_creds" });
  }

  const token = jwt.sign({ sub: String(u._id), roles: u.roles }, PRIV, {
    algorithm: "RS256",
    expiresIn: "15m",
  });
  const refresh = jwt.sign({ sub: String(u._id), roles: u.roles }, PRIV, {
    algorithm: "RS256",
    expiresIn: "7d",
  });

  res.json({ token, refresh, pub: PUB });
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`api/auth live on localhost:5001`);
});
