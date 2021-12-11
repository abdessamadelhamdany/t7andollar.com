import bcrypt from 'bcrypt';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';
import * as dateFn from 'date-fns';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
// import { NextFunction, Request, Response } from 'express';
// import { jwtConfig } from '../../config';
// import authService from './auth.service';
// import AuthInterfaces from './auth.interfaces';
// import usersService from '../users/users.service';
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

interface SafeUser extends Omit<User, 'password'> {}

type Data = {
  error?: string;
  data?: SafeUser;
};

const loginHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email, password, remember } = req.body;

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: ReasonPhrases.BAD_REQUEST,
    });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: ReasonPhrases.NOT_FOUND,
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: ReasonPhrases.UNAUTHORIZED,
      });
    }

    const jwtToken = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: remember === 'true' ? '7d' : '24h',
    });

    await prisma.token.create({
      data: {
        token: jwtToken,
        userId: user.id,
      },
    });

    const cookies = new Cookies(req, res);
    cookies.set('jwt-token', jwtToken, {
      httpOnly: true,
      expires: dateFn.addDays(new Date(), req.body.remember ? 7 : 1),
    });

    return res.status(StatusCodes.OK).json({
      data: {
        ...{ ...user, password: undefined },
      },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'POST':
      await loginHandler(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
