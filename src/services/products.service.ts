import ProductModel, 
{ ProductInputtableTypes, ProductSequelizeModel } from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServicesResponse';

const create = async (product: ProductInputtableTypes): Promise<ServiceResponse<Product>> => {
  try {
    const user = await UserModel.findByPk(product.userId);

    if (!user) return { status: 'UNPROCESSABLE_ENTITY', data: { message: '"userId" not found' } };

    const createdProduct = await ProductModel.create(product);
    return { status: 'CREATED', data: createdProduct.dataValues };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return { status: 'INTERNAL_SERVER_ERROR', data: { message } };
  }
};

const getAll = async (): Promise<ServiceResponse<ProductSequelizeModel[]>> => {
  try {
    const products = await ProductModel.findAll();
    return { status: 'SUCCESSFUL', data: products };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return { status: 'INTERNAL_SERVER_ERROR', data: { message } };
  }
};

export default { 
  create, 
  getAll, 
};