import { expect } from 'chai';
import sinon from 'sinon';
import UserModel, 
{ UserSequelizeModel } from '../../../src/database/models/user.model';
import { usersService } from '../../../src/services';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });
  describe('getAll', function () {
    beforeEach(function () { sinon.restore(); });
    it('should return all users', async function () {
      // triple A
      // Arrange
      const users: UserSequelizeModel[] = [
        { id: 1, username: 'user1', vocation: 'mage', level: 1, password: 'password' } as unknown as UserSequelizeModel,
        { id: 2, username: 'user2', vocation: 'warrior', level: 2, password: 'password' } as unknown as UserSequelizeModel,
      ];

      sinon.stub(UserModel, 'findAll').resolves(users);

      // Act

      const response = await usersService.getAll();

      // Assert

      expect(response.status).to.be.eq('SUCCESSFUL');
      expect(response.data).to.be.deep.eq(users);
    });

    it('should return an error if an error occurs', async function () {
      // triple A
      // Arrange
      sinon.stub(UserModel, 'findAll').throws('Error');

      // Act

      const response = await usersService.getAll();

      // Assert

      expect(response.status).to.be.eq('INTERNAL_SERVER_ERROR');
    });

  });
});
