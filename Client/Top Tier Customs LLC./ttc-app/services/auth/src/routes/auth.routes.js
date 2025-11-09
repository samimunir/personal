import { Router } from "express";
import {
  signup,
  login,
  refresh,
  logout,
  me,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const router = Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/auth/refresh", refresh);
router.post("/auth/logout", logout);
router.get("/auth/me", requireAuth, me);
