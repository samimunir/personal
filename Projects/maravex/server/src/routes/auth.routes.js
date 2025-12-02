import express from "express";
import { signup, login, logout } from "../controllers/user.controller.js";

const authRouter = express.Router();

authRouter.get("/health", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "MaraveX API/AUTH status OK.", ok: true });
});

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
