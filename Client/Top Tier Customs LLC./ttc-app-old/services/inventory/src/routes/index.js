import { Router } from "express";
import inventory from "./inventory.routes.js";

const r = Router();

r.use(inventory);

export default r;
