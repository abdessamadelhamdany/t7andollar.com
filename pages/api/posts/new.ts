import { Post, User } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import prisma from 'lib/prisma';
import { authenticated } from 'middlewares';
import { NextApiHandler } from 'interfaces';

type Data = {
  error?: string;
  data?: Post;
};

const createNewPostHandler: NextApiHandler<Data> = async (req, res) => {
  try {
    const user = req.user as User;

    const post = await prisma.post.create({
      data: {
        authorId: user.id,
      },
    });

    res.send({ data: post });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    await authenticated(createNewPostHandler)(req, res);
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
