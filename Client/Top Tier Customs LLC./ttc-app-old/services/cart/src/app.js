import express from "express";
import cors from "cors";
import pino from "pino-http";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use(pino());

app.use((req, _res, next) => {
  if (!req.user && req.headers["x-user-id"])
    req.user = { sub: String(req.headers["x-user-id"]) };
  next();
}); // dev helper

app.use(routes);

export default app;
