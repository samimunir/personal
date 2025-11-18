import jwt from "jsonwebtoken";
import env from "../config/env.js";

const signAccessToken = (user) => {
  return jwt.sign(
    { sub: user._id.toString(), roles: user.roles },
    env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: env.JWT_ACCESS_TTL }
  );
};

const signRefreshToken = (user) => {
  return jwt.sign(
    { sub: user._id.toString(), roles: user.roles },
    env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: env.JWT_REFRESH_TTL }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.JWT_REFRESH_TOKEN_SECRET);
};

export default {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
