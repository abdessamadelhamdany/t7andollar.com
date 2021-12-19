import { Prisma } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import prisma from 'lib/prisma';
import { NextApiHandler } from '../../../../interfaces';
import { Post } from '../../../../store/interfaces';

type Data = {
  error?: string;
  data?: Post | null;
};

const getPostsHandler: NextApiHandler<Data> = async (req, res) => {
  try {
    let where: Prisma.PostWhereInput = {};

    if (typeof req.query.category === 'string') {
      const category = await prisma.category.findUnique({
        where: {
          slug: req.query.category,
        },
      });

      if (!category) {
        res.send({ data: null });
        return;
      }

      where = {
        published: true,
        featuredAtCategory: category.id,
      };
    } else {
      where = {
        published: true,
        featuredAtHome: true,
      };
    }

    const featuredPostAtHome = await prisma.post.findFirst({
      where,
      include: {
        tags: true,
        categories: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    res.send({ data: featuredPostAtHome });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    await getPostsHandler(req, res);
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
