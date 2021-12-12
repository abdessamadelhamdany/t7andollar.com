import prisma from 'lib/prisma';

export const isValidCategories = async (value) => {
  const count = await prisma.category.count({
    where: {
      id: {
        in: value,
      },
    },
  });

  if (count !== value.length) {
    throw Error(`some of categories was not found.`);
  }
};
