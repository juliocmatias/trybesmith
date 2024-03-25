import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { Product } from '../../../src/types';
import { productsController } from '../../../src/controllers';
import { productsService } from '../../../src/services';
import { ProductSequelizeModel } from '../../../src/database/models/product.model';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('create', function () {
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

  describe('getAll', function () {
    beforeEach(function () {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.restore();
    });

    it('Test whether it is possible to get all products', async function () {
      // triple A
  
      // Arrange
  
      const products: ProductSequelizeModel[] = [
        {
          id: 1,
          name: 'Product 1',
          price: '100',
          userId: 1,
        } as unknown as ProductSequelizeModel,
        {
          id: 2,
          name: 'Product 2',
          price: '200',
          userId: 2,
        } as unknown as ProductSequelizeModel,
      ];
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(productsService, 'getAll').resolves({ status: 'SUCCESSFUL', data: products });
  
      // Act
  
      await productsController.getAll(req, res);
  
      // Assert
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });

});
