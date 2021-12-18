import fs from 'fs';
import path from 'path';
import mime from 'mime';
import multer from 'multer';
import nc from 'next-connect';
import * as dateFn from 'date-fns';
import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'interfaces';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Upload } from '@prisma/client';

interface Data {
  error?: string;
  data?: Upload;
}

/** Setup next connect */
const handler = nc<NextApiRequest, NextApiResponse<Data>>({
  onError(error, _req, res) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  },
  onNoMatch(req, res) {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  },
});

/** Setup multer */
const MB = 1024 * 1024;

const upload = multer({
  limits: {
    fileSize: 2 * MB,
  },

  storage: multer.diskStorage({
    filename(_, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname +
          '-' +
          uniqueSuffix +
          '.' +
          mime.getExtension(file.mimetype)
      );
    },

    destination(_, __, cb) {
      const today = dateFn.format(Date.now(), 'dd-MM-Y');
      const dest = `public/uploads/${today}`;

      const destPath = path.join(process.cwd(), dest);
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }

      cb(null, dest);
    },
  }),

  fileFilter(_, file, cb) {
    const allowedFileExtensions = ['jpeg', 'png', 'gif', 'webp'];
    const allowedMimetypes = allowedFileExtensions.map((ext) =>
      mime.getType(ext)
    );
    cb(null, allowedMimetypes.includes(file.mimetype));
  },
});

/** Register midllewares */
const multerWithErrorHandling = async (req, res, next) => {
  const uploader = upload.single('photo');

  uploader(req as any, res as any, (error) => {
    if (!req.file) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'The photo field is required.',
      });
      return;
    }

    if (error instanceof multer.MulterError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: error.message,
      });
      return;
    }

    if (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: ReasonPhrases.INTERNAL_SERVER_ERROR,
      });
      return;
    }

    next(error);
  });
};
handler.use(multerWithErrorHandling);

/** Register handlers */
handler.post(async (req, res) => {
  const file = req.file;

  const uploadedFile = await prisma.upload.create({
    data: {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      destination: file.destination,
      filename: file.filename,
      path: file.path,
      size: file.size,
    },
  });

  res.json({
    data: uploadedFile,
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
