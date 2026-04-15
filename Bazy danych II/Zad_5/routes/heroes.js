import { Router } from "express";
import ctrl from "../controllers/heroes.js";
const router = Router();

router.get("/", ctrl.getAll);
router.get("/profiles", ctrl.getProfiles);
router.get("/:id", ctrl.getById);
router.get("/:id/profile", ctrl.getProfileById);
router.get("/:id/incidents", ctrl.getIncidentHistory);
router.post("/", ctrl.create);
router.post("/:id/profile/specializations", ctrl.addSpecialization);
router.patch("/:id", ctrl.updateById);
router.patch("/:id/profile", ctrl.updateProfile);
router.delete("/:id/profile/specializations/:name", ctrl.deleteSpecialization);
router.delete("/:id/profile", ctrl.deleteProfile);

export default router;
