import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { NextApiMiddleware } from 'interfaces';
import { isValidCategories, isValidTags } from 'validators';

const schema = Joi.object({
  title: Joi.string().max(255),
  slug: Joi.string().max(255),
  excerpt: Joi.string().max(255),
  thumbnail: Joi.string().allow(null).max(255),
  body: Joi.string(),
  published: Joi.boolean(),
  keywords: Joi.array().items(Joi.string()),
  categories: Joi.array().items(Joi.number()).external(isValidCategories),
  tags: Joi.array().items(Joi.number()).external(isValidTags),
});

export const updatePostValidator: NextApiMiddleware = (handler) => {
  return async (req, res) => {
    try {
      req.validated = await schema.validateAsync(req.body);
      await handler(req, res);
    } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: error.message,
      });
      return;
    }
  };
};
