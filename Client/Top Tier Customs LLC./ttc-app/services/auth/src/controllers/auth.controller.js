import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { env } from "../config/env.js";
import asyncHandler from "../utils/asyncHandler.js";
import { BadRequest, Unauthorized } from "../utils/httpErrors.js";

export const health = (_req, res) => res.json({ ok: true });

export const signup = asyncHandler(async (req, res) => {
  const { email, password, roles } = req.body || {};
  if (!email || !password) throw BadRequest("email and password required");
  const exists = await User.findOne({ email });
  if (exists) throw BadRequest("email_in_use");
  const passwordHash = await bcrypt.hash(password, 10);
  const doc = await User.create({
    email,
    passwordHash,
    roles: roles || ["CUSTOMER"],
  });
  res.json({ id: doc._id });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) throw BadRequest("email and password required");
  const u = await User.findOne({ email });
  if (!u) throw Unauthorized("invalid_creds");
  const ok = await bcrypt.compare(password, u.passwordHash);
  if (!ok) throw Unauthorized("invalid_creds");

  const token = jwt.sign(
    { sub: String(u._id), roles: u.roles },
    env.jwtSecret,
    {
      algorithm: "HS256",
      expiresIn: env.jwtExpires,
    }
  );
  const refresh = jwt.sign(
    { sub: String(u._id), roles: u.roles, typ: "refresh" },
    env.jwtSecret,
    {
      algorithm: "HS256",
      expiresIn: env.jwtRefreshExpires,
    }
  );
  res.json({ token, refresh });
});
