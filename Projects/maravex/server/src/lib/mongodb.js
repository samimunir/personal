import envVAR from "../config/env.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(envVAR.MONGO_URI);
    console.log("✅ MongoDB connection successful.");
    console.log(`\t-> MongoDB host: [${conn.connection.host}]`);
  } catch (e) {
    console.log("❌ Error connecting to MongoDB instance.");
    console.error(e);

    process.exit(1);
  }
};

export default connectDB;
