import { NextFunction, Response, Request } from 'express';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  }
  next();
};

export default validateLogin;