import jwt from "jsonwebtoken";
import crypto from "crypto";
import ms from "ms"; // tiny helper, but we didn’t add it; so use a local parser instead

// simple duration to seconds (supports s,m,h,d)
function toSeconds(ttl) {
  const m = ttl.match(/^(\d+)([smhd])$/i);
  if (!m) return 900; // default 15m
  const n = Number(m[1]);
  const u = m[2].toLowerCase();
  return n * (u === "s" ? 1 : u === "m" ? 60 : u === "h" ? 3600 : 86400);
}

export function signAccess({ userId, roles, secret, ttl }) {
  const exp = Math.floor(Date.now() / 1000) + toSeconds(ttl);
  const token = jwt.sign({ sub: userId, roles }, secret, {
    algorithm: "HS256",
    expiresIn: exp - Math.floor(Date.now() / 1000),
  });
  return { token, exp };
}

export function signRefresh({ userId, secret, ttl }) {
  const jti = crypto.randomUUID();
  const exp = Math.floor(Date.now() / 1000) + toSeconds(ttl);
  const token = jwt.sign({ sub: userId, jti }, secret, {
    algorithm: "HS256",
    expiresIn: exp - Math.floor(Date.now() / 1000),
  });
  return { token, exp, jti };
}
