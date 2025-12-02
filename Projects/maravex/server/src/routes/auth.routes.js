import express from "express";
import { signup, login, logout } from "../controllers/user.controller.js";
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

export default authRouter;
