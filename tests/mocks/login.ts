import bcrypt from 'bcryptjs';
import { User } from "../../src/types";
import { UserSequelizeModel } from '../../src/database/models/user.model';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

export const user: User = {
  username: 'Hagar',
  password: 'terrível'
} as User;

export const userNameInvalid = {
  username: 'Hagar1',
  password: 'terrível'
}

export const passwordInvalid = {
  username: 'Hagar',
  password: '123456'
}

export const findUserModel: UserSequelizeModel = {
  dataValues: {
    id: 1,
    username: 'Hagar',
    vocation: 'Guerreiro',
    level: 10,
    password: bcrypt.hashSync('terrível', SALT_ROUNDS)
  }
} as unknown as UserSequelizeModel;

const senha = 'terrível';
