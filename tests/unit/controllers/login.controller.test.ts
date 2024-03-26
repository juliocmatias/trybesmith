import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { loginService } from '../../../src/services';
import { loginController } from '../../../src/controllers';
import { user } from '../../mocks/login';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return a token if the user exists', async function () {
    // triple A
    // Arrange
    
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY4Njc1NDc1Nn0.jqAuJkcLp0RuvrOd4xKxtj_lm3Z3-73gQQ9IVmwE5gA";

    req.body = user;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(loginService, 'login').resolves({ status: 'SUCCESSFUL', data: { token } });

    // Act

    await loginController.login(req, res);
    
    // Assert

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token });
  });
});
