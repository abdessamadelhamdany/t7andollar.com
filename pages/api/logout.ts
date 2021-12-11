import Cookies from 'cookies';
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      const cookies = new Cookies(req, res);
      const jwtToken = cookies.get('jwt-token');

      if (!jwtToken) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          error: ReasonPhrases.UNAUTHORIZED,
        });
        return;
      }

      const decoded = jwt.verify(
        jwtToken,
        process.env.JWT_SECRET
      ) as JwtPayload;

      await prisma.token.deleteMany({
        where: {
          token: jwtToken,
          userId: decoded._id,
        },
      });

      cookies.set('jwt-token', '', {
        httpOnly: true,
        expires: new Date('0000'),
      });

      res.json({});
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
