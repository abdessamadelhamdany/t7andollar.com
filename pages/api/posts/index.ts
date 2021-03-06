import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import prisma from 'lib/prisma';
import { Post } from '@prisma/client';
import { authenticated } from '../../../middlewares';
import { NextApiHandler } from '../../../interfaces';

type Data = {
  error?: string;
  data?: Post[];
};

const getPostsHandler: NextApiHandler<Data> = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { tags: true, categories: true },
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
    await authenticated(getPostsHandler)(req, res);
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
