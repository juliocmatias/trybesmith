import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { UserSequelizeModel } from '../../../src/database/models/user.model';
import { usersService } from '../../../src/services';
import { usersController } from '../../../src/controllers';

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('getAll', function () {
    it('should return all users', async function () {
      // triple A
      // Arrange
      const users: UserSequelizeModel[] = [
        { id: 1, username: 'user1', vocation: 'mage', level: 1, password: 'password' } as unknown as UserSequelizeModel,
        { id: 2, username: 'user2', vocation: 'warrior', level: 2, password: 'password' } as unknown as UserSequelizeModel,
      ];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(usersService, 'getAll').resolves({ status: 'SUCCESSFUL', data: users });

      // Act

      await usersController.getAll(req, res);

      // Assert

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(users);
    });
  });

});
