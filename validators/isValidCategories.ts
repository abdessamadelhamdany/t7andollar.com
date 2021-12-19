import prisma from 'lib/prisma';

export const isValidCategories = async (value) => {
  if (Array.isArray(value)) {
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
  }
};
