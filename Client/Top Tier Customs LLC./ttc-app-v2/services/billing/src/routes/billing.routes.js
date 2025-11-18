import { Router } from "express";
import { health } from "../controllers/billing.controller.js";

const billingRouter = Router();

billingRouter.get("/health", health);

export default billingRouter;
