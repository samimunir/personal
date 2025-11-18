import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("[BILLING] x MongoDB connected.");
  } catch (error) {
    console.log("[BILLING] failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
