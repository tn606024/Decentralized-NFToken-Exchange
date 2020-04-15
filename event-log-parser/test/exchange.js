const should = require('should');
const ExchangeContract = require('../exchange');


describe('exchange test', () => {
  it('getCreateOrderObjEvent test', async () => {
    try {
      const orderObjs = await ExchangeContract.getCreateOrderObjEvent(5549024);
      orderObjs.should.have.length(1);
      const orderObj = orderObjs[0];
      orderObj.should.have.property('_id');
      orderObj.should.have.property('owner');
      orderObj.should.have.property('contractAddress');
      orderObj.should.have.property('tokenId');
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  it('getDeleteOrderObjEvent test', async () => {
    try {
      const orderObjs = await ExchangeContract.getDeleteOrderObjEvent(5549025);
      orderObjs.should.have.length(1);
      const orderObj = orderObjs[0];
      orderObj.should.have.property('_id');
      orderObj.should.have.property('owner');
      orderObj.should.have.property('contractAddress');
      orderObj.should.have.property('tokenId');
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  it('getCreateOrderEvent test', async () => {
    try {
      const orders = await ExchangeContract.getCreateOrderEvent(5549031);
      orders.should.have.length(1);
      const order = orders[0];
      order.should.have.property('_id');
      order.should.have.property('order');
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  it('getDeleteOrderEvent test', async () => {
    try {
      const orders = await ExchangeContract.getDeleteOrderEvent(5549033);
      orders.should.have.length(1);
      const order = orders[0];
      order.should.have.property('_id');
      order.should.have.property('order');
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  it('getCreateMatchOrderEvent test', async () => {
    try {
      const matchOrders = await ExchangeContract.getCreateMatchOrderEvent(5549088);
      matchOrders.should.have.length(1);
      const matchOrder = matchOrders[0];
      matchOrder.should.have.property('_id');
      matchOrder.should.have.property('match');
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  it('getDeleteMatchOrderEvent test', async () => {
    try {
      const matchOrders = await ExchangeContract.getDeleteMatchOrderEvent(5549787);
      matchOrders.should.have.length(1);
      const matchOrder = matchOrders[0];
      matchOrder.should.have.property('_id');
      matchOrder.should.have.property('match');
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
});
