import { Router } from "express";
import health from "./health.routes.js";
import me from "./me.routes.js";
import catalog from "./catalog.routes.js";
import payments from "./payments.routes.js";
import cart from "./cart.routes.js";
import inventory from "./inventory.routes.js";

const router = Router();
router.use(health);
router.use(me);
router.use(catalog);
router.use(payments); // ✅ ensure this is mounted
router.use(cart);
router.use(inventory);
export default router;
