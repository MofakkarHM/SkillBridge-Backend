import { prisma } from "../../lib/prisma";
import { Category } from "../../../generated/prisma/client";

const createCategoryIntoDb = async (
  data: Pick<Category, "name" | "description">,
) => {
  const res = await prisma.category.create({
    data,
  });
  return res;
};

const getAllCategoryFromDb = async () => {
  const res = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return res;
};

const updateCategoryIntoDb = async (id: string, data: Partial<Category>) => {
  return await prisma.category.update({
    where: { id },
    data,
  });
};

const deleteCategoryFromDb = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  });
};

export const CategoryService = {
  createCategoryIntoDb,
  getAllCategoryFromDb,
  updateCategoryIntoDb,
  deleteCategoryFromDb,
};
