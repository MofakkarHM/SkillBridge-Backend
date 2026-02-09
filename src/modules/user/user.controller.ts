import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    next(err);
  }
};

const getMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await UserService.getMyProfile(req.user!.id);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const updateMyProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await UserService.updateMyProfile(req.user!.id, req.body);
    res
      .status(200)
      .json({ success: true, message: "Profile updated", data: result });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  getAllUsers,
  updateUserStatus,
  getMyProfile,
  updateMyProfile,
};
