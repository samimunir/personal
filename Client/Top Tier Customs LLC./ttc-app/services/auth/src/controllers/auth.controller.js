import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { SignupSchema, LoginSchema } from "../utils/validate.js";
import { signAccess, signRefresh } from "../utils/tokens.js";
import { env } from "../config/env.js";
import { redis } from "../config/redis.js";
import { errors } from "../utils/errors.js";

function setRefreshCookie(res, token, exp) {
  const isProd = env.nodeEnv === "production";
  res.cookie(env.cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    expires: new Date(exp * 1000),
  });
}

export const signup = async (req, res, next) => {
  try {
    const { email, password, name } = SignupSchema.parse(req.body);
    const exists = await User.findOne({ email });
    if (exists) throw errors.conflict("email_in_use");
    const passwordHash = await bcrypt.hash(password, 10);
    const doc = await User.create({ email, passwordHash, profile: { name } });
    res.status(201).json({ userId: String(doc._id), email: doc.email });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);
    const u = await User.findOne({ email });
    if (!u) throw errors.unauthorized("invalid_creds");
    const ok = await bcrypt.compare(password, u.passwordHash);
    if (!ok) throw errors.unauthorized("invalid_creds");

    const { token: accessToken, exp } = signAccess({
      userId: String(u._id),
      roles: u.roles,
      secret: env.jwtSecret,
      ttl: env.accessTtl,
    });

    const {
      token: refreshToken,
      exp: rExp,
      jti,
    } = signRefresh({
      userId: String(u._id),
      secret: env.jwtRefreshSecret,
      ttl: env.refreshTtl,
    });

    // store refresh allow-list -> TTL matches token TTL
    await redis.set(
      `refresh:${jti}`,
      JSON.stringify({ userId: String(u._id) }),
      "EX",
      rExp - Math.floor(Date.now() / 1000)
    );

    setRefreshCookie(res, refreshToken, rExp);

    res.json({
      accessToken,
      expiresIn: exp - Math.floor(Date.now() / 1000),
      user: { id: String(u._id), email: u.email, roles: u.roles },
    });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const cookie = req.cookies?.[env.cookieName];
    if (!cookie) throw errors.unauthorized("no_refresh_cookie");

    let payload;
    try {
      payload = jwt.verify(cookie, env.jwtRefreshSecret);
    } catch {
      throw errors.unauthorized("invalid_refresh");
    }

    const record = await redis.get(`refresh:${payload.jti}`);
    if (!record) throw errors.unauthorized("refresh_revoked");

    // rotate
    await redis.del(`refresh:${payload.jti}`);

    const { token: accessToken, exp } = signAccess({
      userId: payload.sub,
      roles: [], // we could fetch roles by userId to be safe; optional optimization
      secret: env.jwtSecret,
      ttl: env.accessTtl,
    });

    const {
      token: newRefresh,
      exp: rExp,
      jti,
    } = signRefresh({
      userId: payload.sub,
      secret: env.jwtRefreshSecret,
      ttl: env.refreshTtl,
    });

    await redis.set(
      `refresh:${jti}`,
      JSON.stringify({ userId: payload.sub }),
      "EX",
      rExp - Math.floor(Date.now() / 1000)
    );
    setRefreshCookie(res, newRefresh, rExp);

    res.json({ accessToken, expiresIn: exp - Math.floor(Date.now() / 1000) });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const cookie = req.cookies?.[env.cookieName];
    if (cookie) {
      try {
        const p = jwt.verify(cookie, env.jwtRefreshSecret);
        await redis.del(`refresh:${p.jti}`);
      } catch {
        /* ignore */
      }
    }
    res.clearCookie(env.cookieName, { path: "/" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res) => {
  // req.user is attached by requireAuth middleware when used directly here
  res.json({ id: req.user.id, roles: req.user.roles });
};
