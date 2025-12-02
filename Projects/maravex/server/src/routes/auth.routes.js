import express from "express";
import {
  signup,
  login,
  logout,
  refresh,
} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.get("/health", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "MaraveX API/AUTH status OK.", ok: true });
});

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", authenticate, logout);
authRouter.post("/refresh", authenticate, refresh);

export default authRouter;
