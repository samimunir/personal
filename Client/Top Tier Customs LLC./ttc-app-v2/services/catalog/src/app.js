import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`[CATALOG] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(router);

export default app;
