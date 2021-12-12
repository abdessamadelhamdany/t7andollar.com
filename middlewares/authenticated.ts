import Cookies from 'cookies';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import prisma from 'lib/prisma';
import { NextApiMiddleware } from 'interfaces';

export const authenticated: NextApiMiddleware = (handler) => {
  return async (req, res) => {
    const cookies = new Cookies(req, res);
    const jwtToken = cookies.get('jwt-token');

    if (!jwtToken) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        error: ReasonPhrases.UNAUTHORIZED,
      });
      return;
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    } catch (error) {
      cookies.set('jwt-token', '', {
        httpOnly: true,
        expires: new Date('0000'),
      });

      res.status(StatusCodes.UNAUTHORIZED).json({
        error: ReasonPhrases.UNAUTHORIZED,
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded._id,
      },
    });

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: ReasonPhrases.NOT_FOUND,
      });
      return;
    }

    req.user = user;

    await handler(req, res);
  };
};
