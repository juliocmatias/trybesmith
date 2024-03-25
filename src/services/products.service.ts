import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServicesResponse';

const create = async (product: ProductInputtableTypes): Promise<ServiceResponse<Product>> => {
  try {
    const user = await UserModel.findByPk(product.userId);

    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }

    const createdProduct = await ProductModel.create(product);
    return { status: 'CREATED', data: createdProduct.dataValues };
  } catch (error) {
    let message = '';
    if (error instanceof Error) {
      message = error.message;
    }
    return { status: 'INTERNAL_SERVER_ERROR', data: { message } };
  }
};

export default { create };