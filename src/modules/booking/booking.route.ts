import express, { Router } from "express";
import { BookingController } from "./booking.controller";
import { UserRole } from "../../enums/role.enum";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/my-bookings",
  auth(UserRole.STUDENT, UserRole.TUTOR),
  BookingController.getMyBookings,
);

router.post("/", auth(UserRole.STUDENT), BookingController.createBooking);

router.get("/", auth(UserRole.ADMIN), BookingController.getAllBookings);

export const BookingRoutes: Router = router;
