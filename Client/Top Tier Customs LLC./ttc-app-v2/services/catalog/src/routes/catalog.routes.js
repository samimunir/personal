import { Router } from "express";
import { health } from "../controllers/catalog.controller.js";

const catalogRouter = Router();

catalogRouter.get("/health", health);

export default catalogRouter;
