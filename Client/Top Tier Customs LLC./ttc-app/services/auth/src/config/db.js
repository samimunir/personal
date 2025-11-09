import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectMongo() {
  if (!env.mongoUrl) {
    throw new Error("MONGO_URI missing");
  }

  await mongoose
    .connect(env.mongoUrl)
    .then(console.log(`MongoDB connected -> api/auth`));
}
