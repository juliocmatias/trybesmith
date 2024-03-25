import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types';

const SECRET = process.env.SECRET || 'secret';

function create(data: TokenPayload): string {
  const token = jwt.sign(data, SECRET, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
  return token;
}

function verify(token: string): TokenPayload {
  const data = jwt.verify(token, SECRET) as TokenPayload;
  return data;
}

export default {
  create,
  verify,
};