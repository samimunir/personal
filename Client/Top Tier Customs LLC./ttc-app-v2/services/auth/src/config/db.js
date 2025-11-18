import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("[AUTH] x MongoDB connected.");
  } catch (error) {
    console.log("[AUTH] failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
