import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, index: true },
    passwordHash: String,
    roles: { type: [String], default: ["CUSTOMER"] },
    profile: { name: String },
  },
  { timestamps: true }
);

export const User = mongoose.model("users", userSchema);
