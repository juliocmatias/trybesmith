import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { validateLogin } from '../../../src/middlewares';
import { user } from '../../mocks/login';

chai.use(sinonChai);

describe('ValidateLoginMiddleware', function () {
  const req = {} as Request;
  const res = {} as Response;
  
  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  
  it('should return an error if the username is not provided', function () {
    // triple A
    // Arrange

    req.body = { password: user.password };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    const next = sinon.stub();
    // Act

    validateLogin(req, res, next);

    // Assert

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"username" and "password" are required' });
  });

  it('should return an error if the password is not provided', function () {
    // triple A
    // Arrange

    req.body = { username: user.username };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    const next = sinon.stub();
    // Act

    validateLogin(req, res, next);

    // Assert

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"username" and "password" are required' });
  });
});