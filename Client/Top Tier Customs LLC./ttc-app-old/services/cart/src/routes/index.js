import { Router } from "express";
import cart from "./cart.routes.js";

const r = Router();

r.use(cart);

export default r;
