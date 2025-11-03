import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: ["CUSTOMER"],
    },
    profile: {
      name: String,
      phone: String,
      avatar: String,
    },
    addresses: [{ type: Object }],
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
