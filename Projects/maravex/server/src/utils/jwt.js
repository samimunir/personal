import jwt from "jsonwebtoken";
import envVAR from "../config/env.js";

export const signAT = (user) => {
  const payload = {
    sub: user._id.toString(),
    email: user.email,
    role: user.role,
    token_v: user.refresh_token_version,
  };
  const SECRET = envVAR.JWT_AT_SECRET;

  const token = jwt.sign(payload, SECRET, { expiresIn: envVAR.JWT_AT_TTL });

  return token;
};

export const signRT = (user) => {
  const payload = {
    sub: user._id.toString(),
    token_v: user.refresh_token_version,
  };
  const SECRET = envVAR.JWT_RT_SECRET;

  const token = jwt.sign(payload, SECRET, { expiresIn: envVAR.JWT_RT_TTL });

  return token;
};

export const verifyRT = (token) => {
  return jwt.verify(token, envVAR.JWT_RT_SECRET);
};
