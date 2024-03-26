import { NextFunction, Response, Request } from 'express';
import checkRequiredFields from '../utils/checkRequiredFields';
import productSchema from './validations/schemas';

const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { name, price, userId } = req.body;

  const requiredFields = ['name', 'price', 'userId'];
  const receivedFields = { name, price, userId };

  const missingFields = checkRequiredFields(receivedFields, requiredFields);

  if (missingFields) {
    return res.status(400).json({ message: missingFields });
  }

  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }

  const { error } = productSchema.validate({ name, price, userId });

  if (error) {
    return res.status(422).json({ message: error.message });
  }

  next();
};

export default validateProduct;