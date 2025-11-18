import jwt from "jsonwebtoken";
import env from "../config/env.js";

const createAccessToken = (user) => {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    env.JWT_SECRET,
    { expiresIn: env.ACCESS_TTL.toString() }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    { sub: user._id.toString(), tokenVersion: user.refreshTokenVersion },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.REFRESH_TTL.toString() }
  );
};

const sendRefreshToken = (res, token) => {
  res.cookie("jid", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/auth/refresh",
  });
};

export { createAccessToken, createRefreshToken, sendRefreshToken };
