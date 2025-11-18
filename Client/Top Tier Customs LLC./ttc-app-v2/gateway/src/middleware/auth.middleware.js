import jwt from "jsonwebtoken";
import env from "../config/env.js";

const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized (missing token)." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role };

    req.headers["x-user-id"] = payload.sub;
    req.headers["x-user-role"] = payload.role;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized (missing user)." });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden (insufficient role)." });
    }

    next();
  };
};

export { requireAuth, requireRole };
