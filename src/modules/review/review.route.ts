import express, { Router } from "express";
import { ReviewController } from "./review.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../enums/role.enum";

const router = express.Router();

router.get("/:tutorId", ReviewController.getTutorReviews);

router.post("/", auth(UserRole.STUDENT), ReviewController.createReview);

export const ReviewRoutes: Router = router;
