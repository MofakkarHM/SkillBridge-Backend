import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }
    const result = await CategoryService.createCategoryIntoDb({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating category",
      err,
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.getAllCategoryFromDb();

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      err,
    });
  }
};
const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await CategoryService.updateCategoryIntoDb(
      id as string,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Categories updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating categories",
      err,
    });
  }
};
const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await CategoryService.deleteCategoryFromDb(id as string);

    res.status(200).json({
      success: true,
      message: "Categories deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting categories",
      err,
    });
  }
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
