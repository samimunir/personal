import express from "express";
// import { jsonParser } from "../middleware/bodyParsers.js";
import authProxy from "../proxy/auth.proxy.js";

const authRouter = express.Router();

authRouter.use(authProxy);

export default authRouter;
