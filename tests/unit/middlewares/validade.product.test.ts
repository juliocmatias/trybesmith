import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express'
import { validateProduct } from '../../../src/middlewares';
import { Product } from '../../../src/types';

chai.use(sinonChai);

describe('ValidateProductMiddleware', function () {
  const req = {} as Request;
  const res = {} as Response;
  
  const product: Omit<Product, 'id'> = {
    name: "Martelo de Thor",
    price: "30 peças de ouro",
    userId: 1
  };

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return an error if the name is not provided', function () {
    // triple A
    // Arrange

    const { price, userId } = product;

    req.body = { price, userId };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    const next = sinon.stub();
    // Act

    validateProduct(req, res, next);

    // Assert

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('should return an error if the price is not provided', function () {
    // triple A
    // Arrange

    const { name, userId } = product;

    req.body = { name, userId };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    const next = sinon.stub();
    // Act

    validateProduct(req, res, next);

    // Assert

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"price" is required' });
  });

  it('should return an error if the userId is not provided', function () {
    // triple A
    // Arrange

    const { name, price } = product;

    req.body = { name, price };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    const next = sinon.stub();
    // Act

    validateProduct(req, res, next);

    // Assert

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"userId" is required' });
  });

  it('should return an error if the userId is not a number', function () {
    // triple A
    // Arrange

    const { name, price } = product;

    req.body = { name, price, userId: '1' };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    const next = sinon.stub();
    // Act

    validateProduct(req, res, next);

    // Assert

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"userId" must be a number' });
  });

  it('should return an error if the name is not a string', function () {
    // triple A
    // Arrange

    const { price, userId } = product;

    req.body = { name: 1, price, userId };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    const next = sinon.stub();
    // Act

    validateProduct(req, res, next);

    // Assert

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" must be a string' });
  });

  it('should return an error if the name is less than 3 characters long', function () {
    // triple A
    // Arrange

    const { price, userId } = product;

    req.body = { name: 'a', price, userId };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    const next = sinon.stub();
    // Act

    validateProduct(req, res, next);

    // Assert

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 3 characters long' });
  });

  it('should return an error if the price is not a string', function () {
    // triple A
    // Arrange

    const { name, userId } = product;

    req.body = { name, price: 1, userId };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    const next = sinon.stub();
    // Act

    validateProduct(req, res, next);

    // Assert

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"price" must be a string' });
  });

  it('should return an error if the price is less than 3 characters long', function () {
    // triple A
    // Arrange

    const { name, userId } = product;

    req.body = { name, price: 'a', userId };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    const next = sinon.stub();
    // Act

    validateProduct(req, res, next);

    // Assert

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"price" length must be at least 3 characters long' });
  });

  it('should call next if all fields are provided and valid', function () {
    // triple A
    // Arrange

    req.body = product;
    const next = sinon.stub();
    // Act

    validateProduct(req, res, next);

    // Assert

    expect(next).to.have.been.called;
  });

});