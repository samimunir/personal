import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI missing");
  }

  await mongoose
    .connect(env.mongoUri)
    .then(console.log(`MongoDB connected -> api/auth`));
}
