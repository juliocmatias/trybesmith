import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || 'secret';

type TokenPayload = {
  id: number,
  username: string,
};

function create(data: TokenPayload): string {
  const token = jwt.sign(data, SECRET);
  return token;
}

function verify(token: string): TokenPayload {
  const data = jwt.decode(token) as TokenPayload;
  return data;
}

export default {
  create,
  verify,
};