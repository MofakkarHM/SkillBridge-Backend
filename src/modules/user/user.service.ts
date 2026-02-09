import { prisma } from "../../lib/prisma";
import { UserStatus } from "../../../generated/prisma/client";

const getAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
};

const getMyProfile = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      status: true,
      createdAt: true,
    },
  });
};

const updateMyProfile = async (
  id: string,
  data: { name?: string; image?: string },
) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

const updateUserStatus = async (userId: string, status: UserStatus) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { status },
  });
};

export const UserService = {
  getAllUsers,
  updateUserStatus,
  getMyProfile,
  updateMyProfile,
};
