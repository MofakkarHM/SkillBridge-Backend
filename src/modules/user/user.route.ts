import express, { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../enums/role.enum";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), UserController.getAllUsers);

router.patch(
  "/:id/status",
  auth(UserRole.ADMIN),
  UserController.updateUserStatus,
);

export const UserRoutes: Router = router;
