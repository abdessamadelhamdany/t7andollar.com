import prisma from 'lib/prisma';

export const isValidTags = async (value) => {
  if (Array.isArray(value)) {
    const count = await prisma.tag.count({
      where: {
        id: {
          in: value,
        },
      },
    });

    if (count !== value.length) {
      throw Error(`some of tags was not found.`);
    }
  }
};
