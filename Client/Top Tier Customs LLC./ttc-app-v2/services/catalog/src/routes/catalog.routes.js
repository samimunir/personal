import { Router } from "express";
import { health, adminHealth } from "../controllers/catalog.controller.js";

const catalogRouter = Router();

catalogRouter.get("/health", health);
catalogRouter.get("/admin/health", adminHealth);

export default catalogRouter;
