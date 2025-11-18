import { env } from "./config/env.js";
import { connectDb } from "./config/db.js";
import app from "./app.js";

await connectDb();

app.listen(env.port, () =>
  console.log(`api/inventory live on localhost:${env.port}`)
);
