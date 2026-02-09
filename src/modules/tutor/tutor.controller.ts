import { NextFunction, Request, Response } from "express";
import { TutorService } from "./tutor.service";

const updateTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const { bio, hourlyRate, experience, availability } = req.body;

    const result = await TutorService.updateTutorProfile(userId, {
      bio,
      hourlyRate,
      experience,
      availability,
    });

    res.status(200).json({
      success: true,
      message: "Tutor profile updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const result = await TutorService.getTutorProfile(userId as string);

    res.status(200).json({
      success: true,
      message: "Tutor profile fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllTutors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await TutorService.getAllTutors();

    res.status(200).json({
      success: true,
      message: "Tutors fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const TutorController = {
  updateTutorProfile,
  getTutorProfile,
  getAllTutors,
};
