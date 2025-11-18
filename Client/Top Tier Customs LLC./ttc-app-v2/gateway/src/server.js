import app from "./app.js";
import env from "./config/env.js";

export async function start() {
  app.listen(env.PORT, () => {
    console.log(`api/gateway live on localhost:${env.PORT}`);
  });
}
