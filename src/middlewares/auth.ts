import { Response, Request as ExpressRequest, NextFunction } from 'express';
import jwt from '../utils/jwt';
import { TokenPayload } from '../types';
// extraí o toke do bearer token

const extractBearerToken = (authorization: string): string => authorization.split(' ')[1];

// middleware de autenticação

interface Request extends ExpressRequest {
  user: TokenPayload; // ou o tipo que você está esperando
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const token = extractBearerToken(authorization);
    const decoded = jwt.verify(token);
    req.user = decoded;
    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Expired or invalid token';
    return res.status(401).json({ message });
  }
};

export default auth;