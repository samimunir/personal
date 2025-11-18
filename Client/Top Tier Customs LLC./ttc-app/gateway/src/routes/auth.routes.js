import express from "express";
import { jsonParser } from "../middleware/bodyParsers.js";
import authProxy from "../proxy/auth.proxy.js";

const authRouter = express.Router();

authRouter.use(jsonParser, authProxy);

export default authRouter;
