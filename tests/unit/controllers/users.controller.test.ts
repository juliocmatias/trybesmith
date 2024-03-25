import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { UserSequelizeModel } from '../../../src/database/models/user.model';
import { usersService } from '../../../src/services';
import { usersController } from '../../../src/controllers';
import { usersWithProducts } from '../../mocks/usersWithProducts';

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

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(usersService, 'getAll').resolves({ status: 'SUCCESSFUL', data: usersWithProducts });

      // Act

      await usersController.getAll(req, res);

      // Assert

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(usersWithProducts);
    });
  });

});
