import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import Animal from "../app/models/animal.js"
import animalsController from '../app/controllers/animals.js';
import { expect } from 'chai';

describe('getAll', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return all animals', async () => {
    // Arrange
    const fakeAnimals = [{ name: 'Animal 1' }, { name: 'Animal 2' }];
    const findAllStub = sinon.stub(Animal, 'findAll').resolves(fakeAnimals);
    const res = { json: sinon.spy() };
    const next = sinon.spy();

    // Act
    await animalsController.getAll(null, res, next);

    // Assert
    expect(findAllStub.calledOnce).to.be.true;
    expect(res.json.calledOnceWithExactly(fakeAnimals)).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it('should handle database errors', async () => {
    // Arrange
    const errorMessage = 'database error';
    const findAllStub = sinon.stub(Animal, 'findAll').throws(new Error(errorMessage));
    const res = { status: sinon.stub().returns({ json: sinon.spy() }) };
    const next = sinon.spy();

    // Act
    await animalsController.getAll(null, res, next);

    // Assert
    expect(findAllStub.calledOnce).to.be.true;
    expect(res.status.calledOnceWithExactly(500)).to.be.true;
    expect(res.status().json.calledOnceWithExactly({ error: errorMessage })).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it('should handle empty result from database', async () => {
    // Arrange
    const findAllStub = sinon.stub(Animal, 'findAll').resolves(null);
    const res = { json: sinon.spy() };
    const next = sinon.spy();

    // Act
    await animalsController.getAll(null, res, next);

    // Assert
    expect(findAllStub.calledOnce).to.be.true;
    expect(res.json.notCalled).to.be.true;
    expect(next.calledOnce).to.be.true;
    expect(next.args[0][0]).to.be.an.instanceOf(Error);
    expect(next.args[0][0].message).to.equal('Problème de BDD');
  });
});