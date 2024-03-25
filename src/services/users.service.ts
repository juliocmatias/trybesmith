import UserModel, 
{ UserSequelizeModel } from '../database/models/user.model';
// import { User } from '../types';
import { ServiceResponse } from '../types/ServicesResponse';

const getAll = async (): Promise<ServiceResponse<UserSequelizeModel[]>> => {
  try {
    const users = await UserModel.findAll();
    return { status: 'SUCCESSFUL', data: users };
  } catch (error) {
    let message = '';
    if (error instanceof Error) {
      message = error.message;
    }
    return { status: 'INTERNAL_SERVER_ERROR', data: { message } };
  }
};

export default { getAll };