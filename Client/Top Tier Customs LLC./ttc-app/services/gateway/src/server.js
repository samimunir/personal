import app from "./app.js";
import { env } from "./config/env.js";

export async function start() {
  app.listen(env.port, () => {
    // console.log("gateway :" + env.port)
    console.log(`api/gateway live on localhost:${env.port}`);
  });
}
