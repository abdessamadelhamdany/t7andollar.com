import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { authenticated } from 'middlewares';
import { NextApiHandler, SafeUser } from 'interfaces';

interface Data {
  error?: string;
  data?: SafeUser;
}

const meHandler: NextApiHandler<Data> = async (req, res) => {
  try {
    const authUser: SafeUser = { ...{ ...req.user, password: undefined } };

    res.status(StatusCodes.OK).json({
      data: authUser,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    await authenticated(meHandler)(req, res);
    return;
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;
