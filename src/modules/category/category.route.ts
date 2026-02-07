import express, { Router } from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../enums/role.enum";

const router = express.Router();

router.get("/", CategoryController.getAllCategories);

router.post("/", auth(UserRole.ADMIN), CategoryController.createCategory);

router.patch("/:id", auth(UserRole.ADMIN), CategoryController.updateCategory);

router.delete("/:id", auth(UserRole.ADMIN), CategoryController.deleteCategory);

export const CategoryRoutes: Router = router;
