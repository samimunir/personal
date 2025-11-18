import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../utils/tokens.js";
import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const health = async (_req, res) => {
  return res.status(200).json({ service: "AUTH", ok: true });
};

export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Email already in use." });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    email,
    password: hashedPassword,
    profile: { firstName, lastName },
  });

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  sendRefreshToken(res, refreshToken);

  return res.status(201).json({
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      profile: user.profile,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  sendRefreshToken(res, refreshToken);

  return res.status(200).json({
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      profile: user.profile,
    },
    accessToken,
  });
};

export const refresh = async (req, res) => {
  const token = req.cookies?.jid;
  if (!token) {
    return res.status(401).json({ message: "No refresh token." });
  }

  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) {
      throw new Error("User not found.");
    }

    if (payload.tokenVersion !== user.refreshTokenVersion) {
      throw new Error("Token version mismatch.");
    }

    const newAT = createAccessToken(user);
    const newRT = createRefreshToken(user);
    sendRefreshToken(res, newRT);

    return res
      .status(200)
      .json({
        accessToken: newAT,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          profile: user.profile,
        },
      });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token." });
  }
};
