import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
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
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      phone: {
        type: String,
      },
      dob: {
        type: Date,
      },
    },
    vehicles: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
