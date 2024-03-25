import { expect } from 'chai';
import sinon from 'sinon';
import UserModel, 
{ UserSequelizeModel } from '../../../src/database/models/user.model';
import { usersService } from '../../../src/services';
import { usersWithProducts } from '../../mocks/usersWithProducts';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });
  describe('getAll', function () {
    beforeEach(function () { sinon.restore(); });
    it('should return all users', async function () {
      // triple A
      // Arrange
      const users = usersWithProducts;

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
