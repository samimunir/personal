import express from "express";
import cors from "cors";
import logger from "./libs/logger.js";
import routes from "./routes/index.js";
import error from "./middlewares/error.js";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(logger);
app.use(routes);
app.use(error);

export default app;
