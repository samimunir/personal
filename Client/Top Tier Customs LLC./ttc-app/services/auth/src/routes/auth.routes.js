import { Router } from "express";
import { health, signup, login } from "../controllers/auth.controller.js";

const router = Router();
router.get("/auth/health", health);
router.post("/auth/signup", signup);
router.post("/auth/login", login);

export default router;
