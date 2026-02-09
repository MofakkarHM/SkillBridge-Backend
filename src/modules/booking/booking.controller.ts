import { NextFunction, Request, Response } from "express";
import { BookingService } from "./booking.service";

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.user!.id;
    const { tutorId, date } = req.body;

    const result = await BookingService.createBooking(studentId, {
      tutorId,
      date: new Date(date),
    });

    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await BookingService.getAllBookings();

    res.status(200).json({
      success: true,
      message: "All bookings fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getMyBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;

    const result = await BookingService.getMyBookings(userId, role);

    res.status(200).json({
      success: true,
      message: "My bookings fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const BookingController = {
  createBooking,
  getAllBookings,
  getMyBookings,
};
