import { Prisma, TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getTutorProfile = async (userId: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      userId: userId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      receivedReviews: {
        select: {
          rating: true,
          comment: true,
          createdAt: true,
          student: {
            select: { name: true, image: true },
          },
        },
      },
    },
  });

  return result;
};

const updateTutorProfile = async (
  userId: string,
  data: Prisma.TutorProfileUncheckedUpdateInput,
) => {
  const result = await prisma.tutorProfile.upsert({
    where: {
      userId: userId,
    },

    update: data,

    create: {
      userId: userId,
      bio: (data.bio as string) || "",
      hourlyRate: (data.hourlyRate as number) || 0,
      experience: (data.experience as number) || 0,
      availability: (data.availability as string) || "",
    },
  });

  return result;
};

const getAllTutors = async () => {
  const result = await prisma.tutorProfile.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true,
          headline: true,
        },
      },
      categories: true,
    },
  });

  return result;
};

export const TutorService = {
  getTutorProfile,
  updateTutorProfile,
  getAllTutors,
};
