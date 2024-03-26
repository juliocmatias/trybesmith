import Joi, { ObjectSchema } from 'joi';
import { Product } from '../../types';

type ProductWithoutId = Omit<Product, 'id'>;

const productSchema: ObjectSchema<ProductWithoutId> = Joi.object({
  name: Joi.string().min(3).messages({
    'string.base': '"name" must be a string',
    'string.min': '"name" length must be at least 3 characters long',
  }),
  price: Joi.string().min(3).messages({
    'string.base': '"price" must be a string',
    'string.min': '"price" length must be at least 3 characters long',
  }),
  userId: Joi.number()
    .messages({
      'number.base': '"userId" must be a number',
      'number.type': '"userId" must be a number',
    }),
});

export default productSchema;