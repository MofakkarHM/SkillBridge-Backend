import { Request, Response } from "express";
import { TutorService } from "./tutor.service";

const updateTutorProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { bio, hourlyRate, experience } = req.body;

    const result = await TutorService.updateTutorProfile(id as string, {
      bio,
      hourlyRate,
      experience,
    });

    res.status(200).json({
      success: true,
      message: "Tutor profile updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating tutor profile",
      error: err,
    });
  }
};

const getTutorProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await TutorService.getTutorProfile(userId as string);

    res.status(200).json({
      success: true,
      message: "Tutor profile fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching tutor profile",
      error: err,
    });
  }
};

const getAllTutors = async (req: Request, res: Response) => {
  try {
    const result = await TutorService.getAllTutors();

    res.status(200).json({
      success: true,
      message: "Tutors fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching tutors",
      error: err,
    });
  }
};

export const TutorController = {
  updateTutorProfile,
  getTutorProfile,
  getAllTutors,
};
