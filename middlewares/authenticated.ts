import Cookies from 'cookies';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import prisma from 'lib/prisma';
import { NextApiMiddleware, NextApiResponse, ResponseData } from 'interfaces';

const unauthorizedResponse = (
  res: NextApiResponse<ResponseData>,
  cookies: Cookies
) => {
  cookies.set('jwt-token', '', {
    httpOnly: true,
    expires: new Date('0000'),
  });

  res.status(StatusCodes.UNAUTHORIZED).json({
    error: ReasonPhrases.UNAUTHORIZED,
  });
};

export const authenticated: NextApiMiddleware = (handler) => {
  return async (req, res) => {
    const cookies = new Cookies(req, res);
    const jwtToken = cookies.get('jwt-token');

    if (!jwtToken) {
      unauthorizedResponse(res, cookies);
      return;
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
    } catch (error) {
      unauthorizedResponse(res, cookies);

      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        id: decoded._id,
        tokens: {
          some: {
            token: jwtToken,
          },
        },
      },
    });

    if (!user) {
      unauthorizedResponse(res, cookies);
      return;
    }

    req.user = user;

    await handler(req, res);
  };
};
