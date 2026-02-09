import express, { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../enums/role.enum";

const router = express.Router();

router.get(
  "/me",
  auth(UserRole.STUDENT, UserRole.ADMIN, UserRole.TUTOR),
  UserController.getMyProfile,
);

router.patch(
  "/me",
  auth(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR),
  UserController.updateMyProfile,
);

router.get("/", auth(UserRole.ADMIN), UserController.getAllUsers);

router.patch(
  "/:id/status",
  auth(UserRole.ADMIN),
  UserController.updateUserStatus,
);

export const UserRoutes: Router = router;
