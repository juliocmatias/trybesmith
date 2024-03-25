import ProductModel from '../database/models/product.model';
import UserModel, 
{ UserSequelizeModel } from '../database/models/user.model';
import { UsersProductsFormatted } from '../types';
import { ServiceResponse } from '../types/ServicesResponse';

const formattedUsersProducts = (usersWithProducts: UserSequelizeModel[]): UsersProductsFormatted => 
  usersWithProducts.map(({ dataValues: { username, productIds } }: UserSequelizeModel) => ({
    username,
    productIds: productIds ? productIds.map((product) => product.id) : [],
  }));

const getAll = async (): Promise<ServiceResponse<UsersProductsFormatted>> => {
  try {
    const usersWithProducts: UserSequelizeModel[] = await UserModel.findAll({
      include: [
        { model: ProductModel, as: 'productIds', attributes: ['id'] },
      ],
      attributes: ['username'],
    });
    const result = formattedUsersProducts(usersWithProducts);
    return { status: 'SUCCESSFUL', data: result };
  } catch (error) {
    let message = '';
    if (error instanceof Error) {
      message = error.message;
    }
    return { status: 'INTERNAL_SERVER_ERROR', data: { message } };
  }
};

export default { getAll };