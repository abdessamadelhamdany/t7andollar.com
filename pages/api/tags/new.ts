import { Tag, Prisma } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import prisma from 'lib/prisma';
import slugify from 'lib/slugify';
import { authenticated } from 'middlewares';
import { NextApiHandler } from 'interfaces';

type Data = {
  error?: string;
  data?: Tag;
};

const createNewTagHandler: NextApiHandler<Data> = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (typeof name !== 'string') {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: ReasonPhrases.BAD_REQUEST,
      });
      return;
    }

    let generatedSlug = slugify(name);

    const tag = await prisma.tag.create({
      data: {
        name,
        slug: slug ?? generatedSlug,
      },
    });

    res.send({ data: tag });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        res.status(StatusCodes.BAD_REQUEST).json({
          error: ReasonPhrases.BAD_REQUEST,
        });
        return;
      }
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    await authenticated(createNewTagHandler)(req, res);
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
