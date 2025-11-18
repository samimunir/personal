import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

export async function start() {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`api/auth micro-service live on localhost:${env.port}`);
  });
}
