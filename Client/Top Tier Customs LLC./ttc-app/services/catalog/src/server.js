import app from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";

export async function start() {
  await connectDb();
  app.listen(env.port, () => console.log("catalog :" + env.port));
}
