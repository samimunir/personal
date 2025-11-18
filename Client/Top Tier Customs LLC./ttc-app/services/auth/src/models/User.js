import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import env from "../config/env.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: ["customer", "admin"],
      default: ["customer"],
    },
    refreshTokens: [
      {
        token: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
    profile: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function (password) {
  const salt = 10;
  this.passwordHash = await bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.passwordResetToken = hashed;
  this.passwordResetExpires =
    Date.now() + (Number(env.PSW_RESET_TTL) || 60) * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
