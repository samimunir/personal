import http from "http";
import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";

const initServer = () => {
  const server = http.createServer(app);

  connectDB();

  server.listen(env.PORT, () => {
    console.log(`[api/AUTH] live on localhost:${env.PORT}`);
  });
};

export default initServer;
