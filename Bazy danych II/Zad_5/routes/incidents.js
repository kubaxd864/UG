import { Router } from "express";
import ctrl from "../controllers/incidents.js";
const router = Router();

router.get("/", ctrl.getAll);
router.get("/stats", ctrl.getStats);
router.get("/:id", ctrl.getById);
router.post("/", ctrl.create);
router.post("/:id/assign", ctrl.assignNewHero);
router.patch("/:id/resolve", ctrl.closeIncident);

export default router;
