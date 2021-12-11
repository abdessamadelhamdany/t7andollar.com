import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import prisma from 'lib/prisma';
import { Post } from '@prisma/client';
import { authenticated } from 'middlewares';
import { NextApiHandler } from 'interfaces';

type Data = {
  error?: string;
  data?: number | Post;
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
    });

    res.send({ data: post || undefined });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const updatePostHandler: NextApiHandler<Data> = async (req, res) => {
  try {
    const { id } = req.query;

    if (typeof id !== 'string') {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: ReasonPhrases.BAD_REQUEST,
      });
      return;
    }

    res.send({ data: parseInt(id, 10) });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    await getPostHandler(req, res);
    return;
  }

  if (req.method === 'PUT') {
    authenticated(updatePostHandler)(req, res);
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
