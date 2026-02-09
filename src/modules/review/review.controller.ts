import { NextFunction, Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.user!.id;
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
    next(err);
  }
};

const getTutorReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { tutorId } = req.params;
    const result = await ReviewService.getTutorReviews(tutorId as string);

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const ReviewController = {
  createReview,
  getTutorReviews,
};
