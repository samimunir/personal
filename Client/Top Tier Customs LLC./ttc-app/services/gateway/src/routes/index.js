import { Router } from "express";
import health from "./health.routes.js";
import me from "./me.routes.js";
import catalog from "./catalog.routes.js";

const router = Router();
router.use(health);
router.use(me);
router.use(catalog); // mounts /products, /services, /admin/* via proxy

export default router;
