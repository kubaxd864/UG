import { Router } from "express";
import ctrl from "../controllers/heroes.js";
const router = Router();

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.get("/:id/incidents", ctrl.getIncidentHistory);
router.post("/", ctrl.create);
router.patch("/:id", ctrl.updateById);

export default router;
