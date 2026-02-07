import express, { Router } from "express";
import { TutorController } from "./tutor.controller";

const router = express.Router();

router.patch("/:id", TutorController.updateTutorProfile);

router.get("/:userId", TutorController.getTutorProfile);

router.get("/", TutorController.getAllTutors);

export const TutorRoutes: Router = router;
