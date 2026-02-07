import { prisma } from "../../lib/prisma";

// 1. Create a Review
const createReview = async (
  studentId: string,
  data: { tutorId: string; rating: number; comment: string },
) => {
  // Check if tutor exists
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: data.tutorId },
  });

  if (!tutor) throw new Error("Tutor not found");

  // Create the review
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

// 2. Get Reviews for a specific Tutor (Public)
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
