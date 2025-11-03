import { Router } from "express";
import {
  health,
  listProducts,
  getProduct,
  listServices,
  getService,
  createProduct,
  updateProduct,
  deleteProduct,
  createService,
  updateService,
  deleteService,
} from "../controllers/catalog.controller.js";

const router = Router();

router.get("/catalog/health", health);

router.get("/products", listProducts);
router.get("/products/:slug", getProduct);

router.get("/services", listServices);
router.get("/services/:slug", getService);

router.post("/admin/products", createProduct);
router.patch("/admin/products/:id", updateProduct);
router.delete("/admin/products/:id", deleteProduct);

router.post("/admin/services", createService);
router.patch("/admin/services/:id", updateService);
router.delete("/admin/services/:id", deleteService);

export default router;
