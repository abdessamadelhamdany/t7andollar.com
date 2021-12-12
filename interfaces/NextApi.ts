import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export declare type NextApiHandler<T = any> = (
  req: NextApiRequest & { user: User; validated: any | null },
  res: NextApiResponse<T>
) => void | Promise<void>;

interface MiddlewareData {
  data?: any;
  error?: string;
}

export declare type NextApiMiddleware = (
  handler: NextApiHandler<MiddlewareData>
) => NextApiHandler<MiddlewareData>;
