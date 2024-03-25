import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { Product } from '../../../src/types';
import productsController from '../../../src/controllers';
import productsService from '../../../src/services';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Test whether it is possible to register a new product', async function () {
    // triple A

    // Arrange

    const product: Omit<Product, 'id'> = {
      name: 'Product 1',
      price: '100',
      userId: 1,
    };

    req.body = product;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.stub(productsService, 'create').resolves({ status: 'CREATED', data: { ...product, id: 1 } });

    // Act

    await productsController.create(req, res);

    // Assert

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ ...product, id: 1 });
  });

});
