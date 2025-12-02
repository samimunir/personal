import jwt from "jsonwebtoken";
import envVAR from "../config/env.js";

export const authenticate = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      source: "<auth.middleware>",
      message: "No token/missing token.",
      error: "Failed to authenticate.",
    });
  }

  jwt.verify(token, envVAR.JWT_AT_SECRET, (e, decoded) => {
    if (e) {
      return res.status(403).json({
        source: "<auth.middleware>",
        message: "Invalid or expired token.",
        error: "Failed to authenticate.",
      });
    }

    req.user = decoded;
    next();
  });
};
