import { Request, Response } from "express";
import { UserService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err,
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await UserService.updateUserStatus(id as string, status);

    res.status(200).json({
      success: true,
      message: `User status updated to ${status}`,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating user status",
      error: err,
    });
  }
};

export const UserController = {
  getAllUsers,
  updateUserStatus,
};
