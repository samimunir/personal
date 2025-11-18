import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDb() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.mongoUrl);
  console.log("MongoDB connected -> api/inventory");
}
