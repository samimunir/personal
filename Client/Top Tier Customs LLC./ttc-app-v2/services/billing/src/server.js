import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";

export async function start() {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`api/billing live on localhost:${env.PORT}`);
  });
}
