import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import prisma from 'lib/prisma';
import { Post, Prisma } from '@prisma/client';
import { NextApiHandler } from '../../../../interfaces';

type Data = {
  error?: string;
  data?: Post[];
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
        res.send({ data: [] });
        return;
      }

      where = {
        published: true,
        featuredAtCategory: {
          not: category.id,
        },
        categories: {
          some: {
            slug: req.query.category,
          },
        },
      };
    } else {
      where = {
        published: true,
        featuredAtHome: false,
      };
    }

    const posts = await prisma.post.findMany({
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

    res.send({ data: posts });
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
