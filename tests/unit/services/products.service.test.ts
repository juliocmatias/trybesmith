import { expect } from 'chai';
import sinon from 'sinon';
import productsService from '../../../src/services';
import ProductModel, { ProductSequelizeModel } from '../../../src/database/models/product.model';
import { Product } from '../../../src/types';
import UserModel from '../../../src/database/models/user.model';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  
  it('Test whether it is possible to register a new product', async function () {
    // triple A

    // Arrange

    const product: Omit<Product, 'id'> = {
      name: 'Product 1',
      price: '100',
      userId: 1,
    };

    sinon.stub(UserModel, 'findByPk').resolves({ id: 1 } as any);

    sinon.stub(ProductModel, 'create').resolves({
      dataValues: { ...product, id: 1 },
    } as ProductSequelizeModel);

    // Act
  
    const response = await productsService.create(product);

    // Assert

    expect(response.status).to.be.eq('CREATED');
    expect(response.data).to.be.deep.eq({ ...product, id: 1 });
  });

  it('It tests that it is not possible to register a new product if the user does not exit.', async function () {
    // triple A

    // Arrange

    const product: Omit<Product, 'id'> = {
      name: 'Product 1',
      price: '100',
      userId: 999999,
    };

    sinon.stub(UserModel, 'findByPk').resolves(null);

    sinon.stub(ProductModel, 'create').resolves({
      dataValues: { ...product, id: 1 },
    } as ProductSequelizeModel);


    // Act

    const response = await productsService.create(product);

    // Assert

    expect(response.status).to.be.eq('NOT_FOUND');
    expect(response.data).to.be.deep.eq({ message: 'User not found' });
  });

  it('Tests whether, when an error occurs when registering a new product, the productsService captures it.', async function () {
    // triple A

    // Arrange

    const product: Omit<Product, 'id'> = {
      name: 'Product 1',
      price: '100',
      userId: 1,
    };

    sinon.stub(UserModel, 'findByPk').resolves({ id: 1 } as any);

    sinon.stub(ProductModel, 'create').throws(new Error('Internal server error'));

    // Act

    const response = await productsService.create(product);

    // Assert

    expect(response.status).to.be.eq('INTERNAL_SERVER_ERROR');
    expect(response.data).to.be.deep.eq({ message: 'Internal server error' });
  });

});
