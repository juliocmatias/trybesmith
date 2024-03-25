import { UserSequelizeModel } from "../../src/database/models/user.model";
import { UsersProductsFormatted } from '../../src/types';

export const usersProductsIdFormatted: UsersProductsFormatted = [
  {
    username: "Hagar",
    productIds: [1, 2],
  },
  {
    username: "Eddie",
    productIds: [3, 4],
  },
];

export const usersWithProductsId = [
  {
    "username": "Hagar",
    "productIds": [
      {
        "id": 1
      },
      {
        "id": 2
      }
    ]
  },
  {
    "username": "Eddie",
    "productIds": [
      {
        "id": 3
      },
      {
        "id": 4
      }
    ]
  } ];