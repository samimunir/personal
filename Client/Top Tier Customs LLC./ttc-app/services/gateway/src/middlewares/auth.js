import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    req.user = jwt.verify(token, env.jwtSecret, { algorithms: ["HS256"] });
    next();
  } catch {
    res.status(401).json({ error: "unauthorized" });
  }
}
