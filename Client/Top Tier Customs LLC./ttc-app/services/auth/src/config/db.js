import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI).then(() => {
      console.log("[AUTH] x MongoDB connected ✅");
    });
    // console.log(`-> ${conn.connection.host}`);
  } catch (err) {
    console.log("[AUTH] x MongoDB connection failed ❌");
    console.error(err);

    process.exit(1);
  }
};

export default connectDB;
