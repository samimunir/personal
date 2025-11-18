import app from "./app.js";
import connectDB from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import env from "./config/env.js";

export async function start() {
  await connectDB();
  await connectRedis();

  app.listen(env.PORT, () => {
    console.log(`api/auth live on localhost:${env.PORT}`);
  });
}
