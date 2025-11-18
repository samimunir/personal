import { Router } from "express";
import catalogRouter from "./catalog.routes.js";

const router = Router();

router.use(catalogRouter);

export default router;
