import http from "http";
import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";

const initServer = async () => {
  const server = http.createServer(app);

  await connectDB();

  server.listen(env.PORT, () => {
    console.log(`[api/AUTH] live on localhost:${env.PORT}`);
  });
};

export default initServer;
