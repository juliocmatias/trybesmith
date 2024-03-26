import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types';
import jwt from '../utils/jwt';

const login = async (username: string, password: string): 
Promise<ServiceResponse<{ token: string }>> => {
  try {
    const user = await UserModel.findOne({ where: { username } });

    if (!user || user.dataValues.password !== password) {
      return { status: 'UNAUTHORIZED',
        data: { message: 'Username or password invalid' } };
    }
    
    const { id } = user.dataValues;
    const token = jwt.create({ id, username });
    return { status: 'SUCCESSFUL', data: { token } };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return { status: 'INTERNAL_SERVER_ERROR', data: { message } };
  }
};

export default { login };