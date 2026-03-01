import { Router } from "express";
import ctrl from "../controllers/heroes.js";
const router = Router();

router.get("/", ctrl.getAll);
router.post("/", ctrl.create);

export default router;
