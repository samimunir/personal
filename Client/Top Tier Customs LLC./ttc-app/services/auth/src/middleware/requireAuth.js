import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { errors } from "../utils/errors.js";

export function requireAuth(req, _res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return next(errors.unauthorized());
  try {
    const claims = jwt.verify(token, env.jwtSecret);
    req.user = { id: claims.sub, roles: claims.roles || [] };
    next();
  } catch {
    next(errors.unauthorized());
  }
}
