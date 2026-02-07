import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.id; // From Auth Middleware
    const { tutorId, rating, comment } = req.body;

    const result = await ReviewService.createReview(studentId, {
      tutorId,
      rating,
      comment,
    });

    res.status(200).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating review",
      error: err,
    });
  }
};

const getTutorReviews = async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;
    const result = await ReviewService.getTutorReviews(tutorId as string);

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: err,
    });
  }
};

export const ReviewController = {
  createReview,
  getTutorReviews,
};
