import { Request, Response } from 'express';
import { usersService } from '../services';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const getAll = async (req: Request, res: Response) => {
  const { status, data } = await usersService.getAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

export default { getAll };