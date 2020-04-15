const should = require('should');
const mongoose = require('mongoose');
const ExchangeParser = require('../ExchangeParser');

describe('ExchangeParser Test', () => {
  it('updateStatus test', async () => {
    try {
      const result = await ExchangeParser.updateStatus('OrderObj', 5548973);
      result.should.have.property('_id');
      result.should.have.property('status');
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  it('handleCreateOrderObjEvent test', async () => {
    try {
      const orderObjs = await ExchangeParser.handleCreateOrderObjEvent(5549024);
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

  it('handleDeleteOrderObjEvent test', async () => {
    try {
      const orderObjs = await ExchangeParser.handleDeleteOrderObjEvent(5549025);
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

  describe('handleOrderEvent test', async () => {
    it('handleCreateOrderObjEvent first need to be execute', async () => {
      try {
        const orderObjs = await ExchangeParser.handleCreateOrderObjEvent(5549028);
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

    it('handleCreateOrderEvent test', async () => {
      try {
        const orders = await ExchangeParser.handleCreateOrderEvent(5549031);
        orders.should.have.length(1);
        const order = orders[0];
        order.should.have.property('open');
        order.open.should.be.eql(true);
        order.should.have.property('order');
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    it('handleDeleteOrderEvent test', async () => {
      try {
        const orders = await ExchangeParser.handleDeleteOrderEvent(5549033);
        orders.should.have.length(1);
        const order = orders[0];
        order.should.have.property('open');
        order.open.should.be.eql(false);
        order.should.have.property('order');
        order.order.should.be.eql('');
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    describe('handleMatchOrderEvent test', async () => {
      it('handleCreateOrderEvent first', async () => {
        try {
          const orders = await ExchangeParser.handleCreateOrderEvent(5549035);
          orders.should.have.length(1);
          const order = orders[0];
          order.should.have.property('open');
          order.open.should.be.eql(true);
        } catch (error) {
          console.log(error);
          throw error;
        }
      });

      it('handleCreateMatchOrderEvent', async () => {
        try {
          const matchOrders = await ExchangeParser.handleCreateMatchOrderEvent(5549088);
          matchOrders.should.have.length(1);
          const matchOrder = matchOrders[0];
          matchOrder.should.have.property('match');
          matchOrder.match.should.have.length(1);
        } catch (error) {
          console.log(error);
          throw error;
        }
      });

      it('handleDeleteMatchOrderEvent', async () => {
        try {
          const matchOrders = await ExchangeParser.handleDeleteMatchOrderEvent(5549787);
          matchOrders.should.have.length(1);
          const matchOrder = matchOrders[0];
          matchOrder.should.have.property('match');
          matchOrder.match.should.have.length(0);
        } catch (error) {
          console.log(error);
          throw error;
        }
      });
    });
  });
});
