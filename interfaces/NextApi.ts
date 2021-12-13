import { User } from '@prisma/client';
import {
  NextApiRequest as NextApiRequestBase,
  NextApiResponse as NextApiResponseBase,
} from 'next';

interface MulterFile {
  fieldname: string;
  originalname: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface NextApiRequest extends NextApiRequestBase {
  user: User;
  validated: any | null;
  file: MulterFile;
  files: MulterFile[];
}

export interface NextApiResponse<T> extends NextApiResponseBase<T> {}

export declare type NextApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>
) => void | Promise<void>;

interface MiddlewareData {
  data?: any;
  error?: string;
}

export declare type NextApiMiddleware = (
  handler: NextApiHandler<MiddlewareData>
) => NextApiHandler<MiddlewareData>;
