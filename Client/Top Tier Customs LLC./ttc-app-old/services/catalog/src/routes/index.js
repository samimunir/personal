import { Router } from "express";
import catalogRoutes from "./catalog.routes.js";

const router = Router();
router.use(catalogRoutes);
export default router;
