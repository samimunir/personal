import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDb() {
  if (!env.mongoUrl) throw new Error("MONGO_URL missing");
  await mongoose.connect(env.mongoUrl);
  console.log("Mongo connected (catalog)");
}
