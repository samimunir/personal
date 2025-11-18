import { Router } from "express";
import { health } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/health", health);

export default authRouter;
