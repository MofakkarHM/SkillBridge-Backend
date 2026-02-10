import { prisma } from "../../lib/prisma";
import { BookingStatus } from "@prisma/client";

const createReview = async (
  studentId: string,
  data: { tutorId: string; rating: number; comment: string },
) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: data.tutorId },
  });

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  const booking = await prisma.booking.findFirst({
    where: {
      studentId: studentId,
      tutorId: data.tutorId,
      status: BookingStatus.COMPLETED,
    },
  });

  if (!booking) {
    throw new Error(
      "You can only review tutors after completing a session with them.",
    );
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      studentId: studentId,
      tutorId: data.tutorId,
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this tutor.");
  }

  const result = await prisma.review.create({
    data: {
      studentId: studentId,
      tutorId: data.tutorId,
      rating: data.rating,
      comment: data.comment,
    },
  });

  return result;
};

const getTutorReviews = async (tutorId: string) => {
  return await prisma.review.findMany({
    where: { tutorId },
    include: {
      student: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const ReviewService = {
  createReview,
  getTutorReviews,
};
