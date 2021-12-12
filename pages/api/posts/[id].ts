import innertext from 'innertext';
import readingTime from 'reading-time';
import { Prisma, Post } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import prisma from 'lib/prisma';
import { NextApiHandler } from 'interfaces';
import { authenticated, updatePostValidator } from 'middlewares';

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
    });

    if (!post) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: ReasonPhrases.NOT_FOUND,
      });
      return;
    }

    res.send({ data: post || undefined });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const updatePostHandler: NextApiHandler = async (req, res) => {
  try {
    const id = parseInt(Array.isArray(req.query.id) ? '0' : req.query.id, 10);

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: ReasonPhrases.NOT_FOUND,
      });
      return;
    }

    if (req.validated.body) {
      const stats = readingTime(innertext(req.validated.body));

      if (stats.minutes >= 2) {
        req.validated.readingTime = `${Math.round(stats.minutes)} دقائق`;
      } else {
        req.validated.readingTime = 'دقيقة';
      }
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      include: { categories: true, tags: true },
      data: {
        ...req.validated,
        categories: Array.isArray(req.validated.categories)
          ? { set: req.validated.categories.map((id) => ({ id })) }
          : undefined,
        tags: Array.isArray(req.validated.tags)
          ? { set: req.validated.tags.map((id) => ({ id })) }
          : undefined,
      },
    });

    res.send({ data: updatedPost });
  } catch (error: any) {
    console.error(error.message);
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
    await authenticated(updatePostValidator(updatePostHandler))(req, res);
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
