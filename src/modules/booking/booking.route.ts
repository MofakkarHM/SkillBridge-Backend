import express, { Router } from "express";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.get("/my-bookings", BookingController.getMyBookings);

router.post("/", BookingController.createBooking);

router.get("/", BookingController.getAllBookings);

export const BookingRoutes: Router = router;
