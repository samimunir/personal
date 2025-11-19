import express from "express";
import {
  register,
  login,
  logout,
  refreshAccessToken,
  getMe,
} from "../controllers/auth.controller.js";
import { authenticate, authorizeRoles } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refresh-token", refreshAccessToken);

authRouter.get("/me", authenticate, getMe);

authRouter.get(
  "/admin/test",
  authenticate,
  authorizeRoles("admin"),
  (req, res) => {
    return res
      .status(200)
      .json({ message: "Admin access granted.", user: req.user });
  }
);

export default authRouter;
