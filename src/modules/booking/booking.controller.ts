import { Request, Response } from "express";
import { BookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: "Error creating booking",
      error: err,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await BookingService.getAllBookings();

    res.status(200).json({
      success: true,
      message: "All bookings fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: err,
    });
  }
};

const getMyBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const role = req.query.role as string;

    const result = await BookingService.getMyBookings(userId, role);

    res.status(200).json({
      success: true,
      message: "My bookings fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching my bookings",
      error: err,
    });
  }
};

export const BookingController = {
  createBooking,
  getAllBookings,
  getMyBookings,
};
