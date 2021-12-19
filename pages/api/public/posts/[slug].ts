import { Post } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import prisma from 'lib/prisma';
import { NextApiHandler } from 'interfaces';

type Data = {
  error?: string;
  data?: {
    post: Post;
    nextPosts: Post[];
  };
};

const getPostBySlugHandler: NextApiHandler<Data> = async (req, res) => {
  const { slug } = req.query;

  if (typeof slug !== 'string') {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: ReasonPhrases.BAD_REQUEST,
    });
    return;
  }

  try {
    const post = await prisma.post.findFirst({
      where: { published: true, slug },
      include: {
        categories: true,
        tags: true,
        author: { select: { name: true, image: true } },
      },
    });

    if (!post) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: ReasonPhrases.NOT_FOUND,
      });
      return;
    }

    const nextPosts = await prisma.post.findMany({
      take: 2,
      where: {
        published: true,
        slug: {
          not: slug,
        },
        categories: {
          some: {
            id: {
              in: post.categories.map((category) => category.id),
            },
          },
        },
      },
      include: {
        author: { select: { name: true } },
      },
    });

    res.send({
      data:
        {
          post,
          nextPosts,
        } || undefined,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    await getPostBySlugHandler(req, res);
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
