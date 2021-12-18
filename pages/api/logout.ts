import Cookies from 'cookies';
import prisma from 'lib/prisma';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextApiHandler } from 'interfaces';
import { authenticated } from 'middlewares';

const logoutHandler: NextApiHandler = async (req, res) => {
  try {
    const cookies = new Cookies(req, res);
    const jwtToken = cookies.get('jwt-token');

    await prisma.token.deleteMany({
      where: {
        token: jwtToken,
        userId: req.user?.id,
      },
    });

    cookies.set('jwt-token', '', {
      httpOnly: true,
      expires: new Date('0000'),
    });

    res.json({});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    await authenticated(logoutHandler)(req, res);
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
