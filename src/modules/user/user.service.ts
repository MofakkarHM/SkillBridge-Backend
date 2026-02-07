import { prisma } from "../../lib/prisma";
import { UserStatus } from "../../../generated/prisma/client";

const getAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
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
};
