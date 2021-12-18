import { Tag } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import prisma from 'lib/prisma';
import slugify from 'lib/slugify';
import { NextApiHandler } from 'interfaces';
import { authenticated } from 'middlewares';

type Data = {
  error?: string;
  data?: Tag;
};

const getTagHandler: NextApiHandler<Data> = async (req, res) => {
  const id = parseInt(Array.isArray(req.query.id) ? '0' : req.query.id, 10);

  try {
    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: ReasonPhrases.NOT_FOUND,
      });
      return;
    }

    res.send({ data: tag || undefined });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const updateTagHandler: NextApiHandler = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const id = parseInt(Array.isArray(req.query.id) ? '0' : req.query.id, 10);

    if (typeof name !== 'string') {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: ReasonPhrases.BAD_REQUEST,
      });
      return;
    }

    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: ReasonPhrases.NOT_FOUND,
      });
      return;
    }

    let generatedSlug = slugify(name);

    const updatedTag = await prisma.tag.update({
      where: { id },
      data: { name, slug: slug ?? generatedSlug },
    });

    res.send({ data: updatedTag });
  } catch (error: any) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const deletePostHandler: NextApiHandler = async (req, res) => {
  try {
    const id = parseInt(Array.isArray(req.query.id) ? '0' : req.query.id, 10);

    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: ReasonPhrases.NOT_FOUND,
      });
      return;
    }

    const deletedTag = await prisma.tag.delete({
      where: { id },
    });

    res.send({ data: deletedTag });
  } catch (error: any) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    await getTagHandler(req, res);
    return;
  }

  if (req.method === 'PUT') {
    await authenticated(updateTagHandler)(req, res);
    return;
  }

  if (req.method === 'DELETE') {
    await authenticated(deletePostHandler)(req, res);
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
