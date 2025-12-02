import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    profile: {
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
      phone_number: {
        type: String,
      },
      addresses: {
        billing: {
          address: {
            type: String,
          },
          city: {
            type: String,
          },
          state: {
            type: String,
          },
          zip: {
            type: String,
          },
        },
        shipping: {
          address: {
            type: String,
          },
          city: {
            type: String,
          },
          state: {
            type: String,
          },
          zip: {
            type: String,
          },
        },
      },
      dob: {
        type: Date,
        required: true,
      },
      favorite_products: {
        type: [String],
      },
    },
    psw_last_reset: {
      type: Date,
    },
    number_of_psw_resets: {
      type: Number,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
