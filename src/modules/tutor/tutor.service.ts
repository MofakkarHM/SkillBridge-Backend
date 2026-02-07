import { TutorProfile } from "../../../generated/prisma/client";
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
    },
  });

  return result;
};

const updateTutorProfile = async (
  userId: string,
  data: Partial<TutorProfile>,
) => {
  const result = await prisma.tutorProfile.upsert({
    where: {
      userId: userId,
    },
    update: data as any,

    create: {
      userId: userId,
      bio: data.bio || "",
      hourlyRate: data.hourlyRate || 0,
      experience: data.experience || 0,
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
        },
      },
    },
  });

  return result;
};

export const TutorService = {
  getTutorProfile,
  updateTutorProfile,
  getAllTutors,
};
