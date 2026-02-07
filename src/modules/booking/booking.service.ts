import { Booking, BookingStatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createBooking = async (
  studentId: string,
  data: {
    tutorId: string;
    date: Date;
  },
) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: data.tutorId },
  });

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  const result = await prisma.booking.create({
    data: {
      studentId: studentId,
      tutorId: data.tutorId,
      date: data.date,
      status: BookingStatus.PENDING,
    },
  });
  return result;
};

const getMyBookings = async (userId: string, role: string) => {
  if (role === "STUDENT") {
    return await prisma.booking.findMany({
      where: {
        studentId: userId,
      },
      include: {
        tutor: {
          include: { user: { select: { name: true, email: true } } },
        },
      },
    });
  } else if (role === "TUTOR") {
    const profile = await prisma.tutorProfile.findUnique({
      where: { userId: userId },
    });

    if (!profile) return [];

    return await prisma.booking.findMany({
      where: {
        tutorId: profile.id,
      },
      include: {
        student: {
          select: { name: true, email: true, image: true },
        },
      },
    });
  }

  return [];
};

const getAllBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      student: { select: { name: true } },
      tutor: { include: { user: { select: { name: true } } } },
    },
  });
};

export const BookingService = {
  createBooking,
  getMyBookings,
  getAllBookings,
};
