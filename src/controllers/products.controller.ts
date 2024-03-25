import { Request, Response } from 'express';
import { productsService } from '../services';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const create = async (req: Request, res: Response) => {
  const { name, price, userId } = req.body;

  const { status, data } = await productsService
    .create({ name, price, userId: Number(userId) });

  return res.status(mapStatusHTTP(status)).json(data);
};

const getAll = async (req: Request, res: Response) => {
  const { status, data } = await productsService.getAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

export default { create, getAll };