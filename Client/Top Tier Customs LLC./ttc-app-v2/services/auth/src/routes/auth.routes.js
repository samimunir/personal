import { Router } from "express";
import {
  health,
  register,
  login,
  refresh,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/health", health);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);

export default authRouter;
