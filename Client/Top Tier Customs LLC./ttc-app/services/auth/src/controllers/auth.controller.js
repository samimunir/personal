import crypto from "crypto";
import User from "../models/User.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const generateAndStoreTokens = async (user, oldRefreshToken) => {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  const hashedNew = hashToken(refreshToken);

  if (oldRefreshToken) {
    const hashedOld = hashToken(oldRefreshToken);

    user.refreshTokens = user.refreshToken.filter(
      (rt) => rt.token !== hashedOld
    );
  }

  user.refreshToken.push({ token: hashedNew, createdAt: new Date() });

  await user.save();

  return { accessToken, refreshToken };
};

export const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      const err = new Error("Email and password are required.");
      err.status = 400;

      throw err;
    }

    const existing = await User.findOne({ email });
    if (existing) {
      const err = new Error("Email is already registered.");
      err.status = 409;

      throw err;
    }

    const user = new User({
      email,
      profile: { firstName, lastName },
      roles: ["customer"],
    });

    await user.setPassword(password);

    const { accessToken, refreshToken } = await generateAndStoreTokens(user);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        roles: user.roles,
        profile: user.profile,
      },
      tokens: { accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("Email and password are required.");
      err.status = 400;

      throw err;
    }

    const user = await User.findOne({ email });
    if (!user || !user.isActive) {
      const err = new Error("Invalid email or password.");
      err.status = 401;

      throw err;
    }

    const isValid = await user.validatePassword(password);
    if (!isValid) {
      const err = new Error("Invalid email or password.");
      err.status = 401;

      throw err;
    }

    const { accessToken, refreshToken } = await generateAndStoreTokens(user);

    return res.status(200).json({
      message: "User logged in successfully.",
      user: {
        id: user._id,
        email: user.email,
        roles: user.roles,
        profile: user.profile,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken =
      req.body.refreshToken || req.headers["x-refresh-token"];
    if (!refreshToken) {
      const err = new Error("Refresh token is required.");
      err.status = 400;

      throw err;
    }

    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(200).json({ message: "Logged out." });
    }

    const hashed = hashToken(refreshToken);
    user.refreshTokens = user.refreshTokens.filter((rt) => rt.token !== hashed);

    await user.save();

    return res.status(200).json({ message: "Logged out." });
  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      return res.status(200).json({ message: "Logged out." });
    }

    next(err);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const oldRefreshToken =
      req.body.refreshToken || req.headers["x-refresh-token"];
    if (!oldRefreshToken) {
      const err = new Error("Refresh token is required.");
      err.status = 400;

      throw err;
    }

    const payload = verifyRefreshToken(oldRefreshToken);

    const user = await User.findById(payload.sub);
    if (!user) {
      const err = new Error("User not found or inactive.");
      err.status = 401;

      throw err;
    }

    const hashedOld = hashToken(oldRefreshToken);

    const exists = user.refreshTokens.some((rt) => rt.token === hashedOld);
    if (!exists) {
      const err = new Error("Refresh token not recognized.");
      err.status = 401;

      throw err;
    }

    const { accessToken, refreshToken } = await generateAndStoreTokens(
      user,
      oldRefreshToken
    );

    return res.status(200).json({
      message: "Tokens refreshed",
      tokens: { accessToken, refreshToken },
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      err.status = 401;
      err.message = "Refresh token expired.";
    } else if (err.name === "JsonWebTokenError") {
      err.status = 401;
      err.message = "Invalid refresh token.";
    }

    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-passwordHash -refreshTokens -passwordResetToken -passwordResetExpires"
    );
    if (!user) {
      const err = new Error("User not found.");
      err.status = 404;

      throw err;
    }

    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
