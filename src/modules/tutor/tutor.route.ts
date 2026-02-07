import express, { Router } from "express";
import { TutorController } from "./tutor.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../enums/role.enum";

const router = express.Router();

router.get("/", TutorController.getAllTutors);

router.get("/:userId", TutorController.getTutorProfile);

router.patch("/me", auth(UserRole.TUTOR), TutorController.updateTutorProfile);

export const TutorRoutes: Router = router;
