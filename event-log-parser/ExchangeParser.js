const _ = require('lodash');
const config = require('config');
const mongoose = require('mongoose');

const exchangeContract = require('./exchange');
const OrderObjSchema = require('./models/OrderObj');
const TokenHistorySchema = require('./models/TokenHistory');
const ExchangeTokenHistory = require('./models/ExchangeTokenHistory');
const EventStatus = require('./models/EventStatus');
const Eth = require('./web3/Eth');
const Helper = require('./Helper');

const OrderObjCollection = config.get('OrderObj.collection');
const TokenHistoryCollection = config.get('TokenHistory.collection');
const OrderObj = mongoose.model(OrderObjCollection, OrderObjSchema);
const OrderObjTemp = mongoose.model(`${OrderObjCollection}Temp`, OrderObjSchema);
const ReceiveTokenHistory = mongoose.model(`Receive${TokenHistoryCollection}`, TokenHistorySchema);
const SendBackTokenHistory = mongoose.model(`SendBack${TokenHistoryCollection}`, TokenHistorySchema);

class ExchangeParser {
  constructor() {
    this.initialBlock = config.get('Exchange.initialBlock');
    this.breakTime = config.get('Parser.breakTime');
    this.waitBlock = config.get('Parser.waitBlock');
    this.name = 'OrderObj';
  }

  async updateStatus(event, status) {
    try {
      const result = await EventStatus.findOneAndUpdate({
        _id: event,
      }, {
        status,
      }, {
        upsert: true,
        new: true,
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async handleCreateOrderObjEvent(block) {
    try {
      const orderObjs = await exchangeContract.getCreateOrderObjEvent(block);
      if (orderObjs.length !== 0) {
        const arr = orderObjs.map(async (orderObj) => {
          let returnValue;
          const dbOrderObjTemp = await OrderObjTemp.findOne({
            _id: orderObj._id,
          });
          if (dbOrderObjTemp !== null) {
            const {
              _id, owner, contractAddress, tokenId, open, match, want, order,
            } = dbOrderObjTemp;
            const dbOrderObj = new OrderObj({
              _id,
              owner,
              contractAddress,
              tokenId,
              open,
              match,
              want,
              order,
            });
            await dbOrderObj.save();
            await dbOrderObjTemp.remove();
          } else {
            const dbOrderObj = new OrderObj({
              _id: orderObj._id,
              owner: orderObj.owner,
              contractAddress: orderObj.contractAddress,
              tokenId: orderObj.tokenId,
            });
            returnValue = await dbOrderObj.save();
          }
          return returnValue;
        });
        const results = await Promise.all(arr);
        console.log(`${block} handleCreateOrderObjEvent done`);
        return results;
      }
      console.log(`${block} handleCreateOrderObjEvent done`);
      return orderObjs;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async handleDeleteOrderObjEvent(block) {
    try {
      const orderObjs = await exchangeContract.getDeleteOrderObjEvent(block);
      if (orderObjs.length !== 0) {
        const arr = orderObjs.map(async (orderObj) => {
          const dbOrderObj = await OrderObj.findOne({
            _id: orderObj._id,
          }, '_id owner contractAddress tokenId open match want order');
          if (dbOrderObj.want.length !== 0) {
            // const killMatch = dbOrderObj.want.map(async (orderId) => {
            //   const returnValue = await OrderObj.findOneAndUpdate({
            //     _id: orderId,
            //   }, {
            //     $pull: { match: dbOrderObj._id },
            //   }, {
            //     new: true,
            //   });
            //   return returnValue;
            // });
            // const killResults2 = await Promise.all(killMatch);
            const {
              _id, owner, contractAddress, tokenId, open, match, want, order,
            } = dbOrderObj;
            const dbOrderObjTemp = new OrderObjTemp({
              _id,
              owner,
              contractAddress,
              tokenId,
              open,
              match,
              want,
              order,
            });
            await dbOrderObjTemp.save();
          }
          const returnValue = await OrderObj.findOneAndDelete({
            _id: orderObj._id,
          });
          return returnValue;
        });
        const results = await Promise.all(arr);
        console.log(`${block} handleDeleteOrderObjEvent done`);
        return results;
      }
      console.log(`${block} handleDeleteOrderObjEvent done`);
      return orderObjs;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async handleCreateOrderEvent(block) {
    try {
      const orders = await exchangeContract.getCreateOrderEvent(block);
      if (orders.length !== 0) {
        const arr = orders.map(async (order) => {
          const returnValue = await OrderObj.findByIdAndUpdate({
            _id: order._id,
          }, {
            open: true,
            order: order.order,
          }, {
            new: true,
          });
          return returnValue;
        });
        const results = await Promise.all(arr);
        console.log(`${block} handleCreateOrderEvent done`);
        return results;
      }
      console.log(`${block} handleCreateOrderEvent done`);
      return orders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async handleDeleteOrderEvent(block) {
    try {
      const orders = await exchangeContract.getDeleteOrderEvent(block);
      if (orders.length !== 0) {
        const arr = orders.map(async (order) => {
          const dbOrderObj = await OrderObj.findOne({
            _id: order._id,
          });
          const killWant = dbOrderObj.match.map(async (orderId) => {
            const returnValue = await OrderObj.findOneAndUpdate({
              _id: orderId,
            }, {
              $pull: { want: dbOrderObj._id },
            }, {
              new: true,
            });
            const returnValue2 = await OrderObjTemp.findOneAndUpdate({
              _id: orderId,
            }, {
              $pull: { want: dbOrderObj._id },
            }, {
              new: true,
            });
            const returnValue3 = await OrderObjTemp.findOneAndDelete({
              _id: orderId,
              'want.0': { $exists: false },
            });
            return returnValue;
          });
          const killResults = await Promise.all(killWant);
          const returnValue = await OrderObj.findByIdAndUpdate({
            _id: order._id,
          }, {
            open: false,
            order: '',
            match: [],
          }, {
            new: true,
          });
          return returnValue;
        });
        const results = await Promise.all(arr);
        console.log(`${block} handleDeleteOrderEvent done`);
        return results;
      }
      console.log(`${block} handleDeleteOrderEvent done`);
      return orders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async handleCreateMatchOrderEvent(block) {
    try {
      const matchOrders = await exchangeContract.getCreateMatchOrderEvent(block);
      if (matchOrders.length !== 0) {
        const arr = matchOrders.map(async (matchOrder) => {
          const order = await OrderObj.findOne({
            order: matchOrder._id,
          });
          const returnValue = await OrderObj.findOneAndUpdate({
            order: matchOrder._id,
          }, {
            $push: { match: matchOrder.match },
          }, {
            new: true,
          });
          const returnValue2 = await OrderObj.findByIdAndUpdate({
            _id: matchOrder.match,
          }, {
            $push: { want: order._id },
          }, {
            new: true,
          });
          return returnValue;
        });
        const results = await Promise.all(arr);
        console.log(`${block} handleCreateMatchOrderEvent done`);
        return results;
      }
      console.log(`${block} handleCreateMatchOrderEvent done`);
      return matchOrders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async handleDeleteMatchOrderEvent(block) {
    try {
      const matchOrders = await exchangeContract.getDeleteMatchOrderEvent(block);
      if (matchOrders.length !== 0) {
        const arr = matchOrders.map(async (matchOrder) => {
          const order = await OrderObj.findOne({
            order: matchOrder._id,
          });
          const returnValue = await OrderObj.findOneAndUpdate({
            order: matchOrder._id,
          }, {
            $pull: { match: matchOrder.match },
          }, {
            new: true,
          });
          const returnValue2 = await OrderObj.findByIdAndUpdate({
            _id: matchOrder.match,
          }, {
            $pull: { want: order._id },
          }, {
            new: true,
          });
          return returnValue;
        });
        const results = await Promise.all(arr);
        console.log(`${block} handleDeleteMatchOrderEvent done`);
        return results;
      }
      console.log(`${block} handleDeleteMatchOrderEvent done`);
      return matchOrders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async handleReceiveTokenEvent(block) {
    try {
      const tokens = await exchangeContract.getReceiveTokenEvent(block);
      if (tokens.length !== 0) {
        const arr = tokens.map(async (token) => {
          const dbToken = new ReceiveTokenHistory({
            from: token.from,
            contractAddress: token.contractAddress,
            tokenId: token.tokenId,
            block: token.block,
            transactionHash: token.transactionHash,
          });
          await dbToken.save();
        });
        const results = await Promise.all(arr);
        console.log(`${block} handleReceiveTokenEvent done`);
        return results;
      }
      console.log(`${block} handleReceiveTokenEvent done`);
      return tokens;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async handleSendBackTokenEvent(block) {
    try {
      const tokens = await exchangeContract.getSendBackTokenEvent(block);
      if (tokens.length !== 0) {
        const arr = tokens.map(async (token) => {
          const dbToken = new SendBackTokenHistory({
            owner: token.owner,
            contractAddress: token.contractAddress,
            tokenId: token.tokenId,
            block: token.block,
            transactionHash: token.transactionHash,
          });
          await dbToken.save();
        });
        const results = await Promise.all(arr);
        console.log(`${block} handleSendBackTokenEvent done`);
        return results;
      }
      console.log(`${block} handleSendBackTokenEvent done`);
      return tokens;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async handleExchangeTokenHistoryEvent(block) {
    try {
      const tokens = await exchangeContract.getExchangeTokenEvent(block);
      if (tokens.length !== 0) {
        const arr = tokens.map(async (token) => {
          const dbToken = new ExchangeTokenHistory({
            block: token.block,
            orderHash: token.orderHash,
            matchOrderHash: token.matchOrderHash,
            orderOwner: token.orderOwner,
            orderContractAddress: token.orderContractAddress,
            orderTokenId: token.orderTokenId,
            matchOrderOwner: token.matchOrderOwner,
            matchOrderContractAddress: token.matchOrderContractAddress,
            matchOrderTokenId: token.matchOrderTokenId,
            transactionHash: token.transactionHash,
          });
          await dbToken.save();
        });
        const results = await Promise.all(arr);
        console.log(`${block} handleExchangeTokenHistoryEvent done`);
        return results;
      }
      console.log(`${block} handleExchangeTokenHistoryEvent done`);
      return tokens;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateAllEvent(fromBlock, toBlock) {
    console.log('start updateAllEvent');
    const range = _.range(fromBlock, toBlock + 1);
    for (const i of range) {
      try {
        let createEvent = [];
        console.log(`block ${i} start`);
        createEvent.push(this.handleCreateMatchOrderEvent(i));
        createEvent.push(this.handleCreateOrderEvent(i));
        createEvent.push(this.handleCreateOrderObjEvent(i));
        createEvent.push(this.handleReceiveTokenEvent(i));
        createEvent.push(this.handleSendBackTokenEvent(i));
        createEvent.push(this.handleExchangeTokenHistoryEvent(i));
        await Promise.all(createEvent);
        createEvent = [];
        await this.handleDeleteMatchOrderEvent(i);
        await this.handleDeleteOrderEvent(i);
        await this.handleDeleteOrderObjEvent(i);
        await this.updateStatus(this.name, i);
        console.log(`${i} block done`);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

  async updateEvent() {
    let orderObjStatus;
    let block;
    while (true) {
      try {
        console.log('start updateEvent');
        orderObjStatus = await EventStatus.findOne({
          _id: this.name,
        });
        block = orderObjStatus.status;
        console.log(`db block ${block}`);
        const newestBlock = await Eth.getBlockNumber();
        console.log(`newestBlock:${newestBlock}`);
        if (newestBlock - block >= this.waitBlock) {
          await this.updateAllEvent(block + 1, newestBlock - this.waitBlock);
        }
        console.log('start sleep');
        await Helper.sleep(this.breakTime);
      } catch (error) {
        console.log(error);
        await Helper.sleep(this.breakTime);
        await this.updateEvent();
      }
    }
  }

  async start() {
    try {
      let orderObjStatus = await EventStatus.findOne({
        _id: this.name,
      });
      if (orderObjStatus === null) {
        orderObjStatus = await this.updateStatus(this.name, this.initialBlock);
      }
      await this.updateEvent();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new ExchangeParser();
