import UserModel, { UserSequelizeModel } from '../database/models/user.model';
import ProductModel from '../database/models/product.model';
import { UsersProductsFormatted, ServiceResponse } from '../types';

const formattedUsersProducts = (usersWithProducts: UserSequelizeModel[]): UsersProductsFormatted => 
  usersWithProducts.map(({ dataValues: { username, productIds } }: UserSequelizeModel) => ({
    username,
    productIds: productIds ? productIds.map(({ id }) => id) : [],
  }));

const getAll = async (): Promise<ServiceResponse<UsersProductsFormatted>> => {
  try {
    const users: UserSequelizeModel[] = await UserModel.findAll({
      include: [
        { model: ProductModel, as: 'productIds', attributes: ['id'] },
      ],
      attributes: ['username'],
    });
    
    const result: UsersProductsFormatted = formattedUsersProducts(users);
    return { status: 'SUCCESSFUL', data: result };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return { status: 'INTERNAL_SERVER_ERROR', data: { message } };
  }
};

export default { getAll };