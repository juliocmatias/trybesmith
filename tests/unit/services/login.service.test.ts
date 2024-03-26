import { expect } from 'chai';
import sinon from 'sinon';
import UserModel, { UserSequelizeModel } from '../../../src/database/models/user.model';
import { loginService } from '../../../src/services';
import { user, findUserModel, userNameInvalid, passwordInvalid } from '../../mocks/login';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  it('should return a token if the user exists', async function () {
    // triple A
    // Arrange

    sinon.stub(UserModel, 'findOne').resolves(findUserModel);
    // Act

    const response = await loginService.login(user.username, user.password);

    // Assert

    expect(response.status).to.be.eq('SUCCESSFUL');
    expect(response.data).to.have.property('token');
  });

  it('should return an error if the user does not exist', async function () {
    // triple A
    // Arrange

    sinon.stub(UserModel, 'findOne').resolves(null);
    // Act

    const response = await loginService.login(userNameInvalid.username, user.password);

    // Assert

    expect(response.status).to.be.eq('UNAUTHORIZED');
    expect(response.data).to.be.deep.eq({ message: 'Username or password invalid' });
  });

  it('should return an error if the password is incorrect', async function () {
    // triple A
    // Arrange

    sinon.stub(UserModel, 'findOne').resolves(findUserModel as unknown as UserSequelizeModel);
    // Act

    const response = await loginService.login(user.username, passwordInvalid.password);

    // Assert

    expect(response.status).to.be.eq('UNAUTHORIZED');
    expect(response.data).to.be.deep.eq({ message: 'Username or password invalid' });
  });

  it('should return an error if an error occurs', async function () {
    // triple A
    // Arrange

    sinon.stub(UserModel, 'findOne').throws(new Error('Internal server error'));

    // Act

    const response = await loginService.login(user.username, user.password);

    // Assert

    expect(response.status).to.be.eq('INTERNAL_SERVER_ERROR');
    expect(response.data).to.be.deep.eq({ message: 'Internal server error' });
  });
});
