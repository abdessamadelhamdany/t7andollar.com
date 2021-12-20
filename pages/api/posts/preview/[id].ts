import { Post } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import prisma from 'lib/prisma';
import { NextApiHandler } from 'interfaces';
import { authenticated } from 'middlewares';

type Data = {
  error?: string;
  data?: Post;
};

const getPostHandler: NextApiHandler<Data> = async (req, res) => {
  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: ReasonPhrases.BAD_REQUEST,
    });
    return;
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id, 10) },
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

    res.send({
      data: post,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    await authenticated(getPostHandler)(req, res);
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
