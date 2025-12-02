import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { signAT, signRT } from "../utils/jwt.js";
import envVAR from "../config/env.js";

export const signup = async (req, res) => {
  try {
    const { email, password, first_name, last_name, dob } = req.body;

    if (!email || !password || !first_name || !last_name || !dob) {
      return res.status(400).json({
        success: false,
        error: "Missing required information for user creation.",
        message: "User signup failed.",
      });
    }

    const db_user = await User.findOne({ email });
    if (db_user) {
      return res.status(401).json({
        success: false,
        error: "An account with this email already exists.",
        message: "User signup failed.",
      });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: password_hash,
      profile: { first_name, last_name, dob },
    });

    return res
      .status(201)
      .json({ success: true, message: "User signup successful.", user: user });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message,
      message: "User signup failed, internal server error.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Missing required information for user login.",
        message: "User login failed.",
      });
    }

    const db_user = await User.findOne({ email });
    if (!db_user) {
      return res.status(404).json({
        success: false,
        error: `No account exists for [${email}]`,
        message: "User login failed.",
      });
    }

    const valid = await bcrypt.compare(password, db_user.password);
    if (!valid) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials.",
        message: "User login failed.",
      });
    }

    const accessToken = signAT(db_user);
    const refreshToken = signRT(db_user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: envVAR.NODE_ENV === "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User login successful.",
      user: db_user,
      accessToken: accessToken,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message,
      message: "User login failed, internal server error.",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const reqUser = req.user;
    const db_user = await User.findById(reqUser.sub);
    if (!db_user) {
      return res.status(404).json({
        success: false,
        error: "No user found.",
        message: "User logout unsuccessful.",
      });
    }

    console.log(`reqUser.token_v: ${reqUser.token_v}`);
    console.log(
      `db_user.refresh_token_version: ${db_user.refresh_token_version}`
    );
    if (reqUser.token_v != db_user.refresh_token_version) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized user.",
        message: "User logout unsuccessful.",
      });
    }

    db_user.refresh_token_version += 1;
    await db_user.save();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: envVAR.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      account: {
        id: db_user.sub,
        email: db_user.email,
        role: db_user.role,
        token_v: db_user.refresh_token_version,
      },
      message: "User logout successful.",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message,
      message: "User logout failed.",
    });
  }
};
