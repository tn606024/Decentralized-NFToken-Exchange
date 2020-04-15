const config = require('config');

const web3 = require('../web3');
const Event = require('../web3/Event');

const exchangeJson = require('./Exchange.json');

const ExchangeAddress = config.get('Exchange.address');

class ExchangeContract {
  constructor(abi, address) {
    this.EventEnum = {
      CREATE_ORDER_OBJ: 'CreateOrderObj',
      DELETE_ORDER_OBJ: 'DeleteOrderObj',
      CREATE_ORDER: 'CreateOrder',
      DELETE_ORDER: 'DeleteOrder',
      CREATE_MATCH_ORDER: 'CreateMatchOrder',
      DELETE_MATCH_ORDER: 'DeleteMatchOrder',
      RECEIVE_TOKEN: 'ReceiveToken',
      SENDBACK_TOKEN: 'SendBackToken',
      EXCHANGE_TOKEN: 'ExchangeToken',
    };
    this.abi = abi;
    this.address = address;
    this.ExchangeContract = new web3.eth.Contract(this.abi, this.address);
  }

  async getOrderObjEvent(block, eventName) {
    try {
      const events = await Event.getPastEvents(this.ExchangeContract, eventName, block);
      if (events.length === 0) return events;
      const orderObjs = events.reduce((acc, event) => {
        const { returnValues } = event;
        const {
          _hash, _owner, _contractAddress, _tokenId,
        } = returnValues;
        acc.push({
          _id: _hash,
          owner: _owner,
          contractAddress: _contractAddress,
          tokenId: _tokenId,
          block: event.blockNumber,
          event: event.event,
        });
        return acc;
      }, []);
      return orderObjs;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCreateOrderObjEvent(block) {
    try {
      const orderObjs = await this.getOrderObjEvent(block, this.EventEnum.CREATE_ORDER_OBJ);
      return orderObjs;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getDeleteOrderObjEvent(block) {
    try {
      const orderObjs = await this.getOrderObjEvent(block, this.EventEnum.DELETE_ORDER_OBJ);
      return orderObjs;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getOrderEvent(block, eventName) {
    try {
      const events = await Event.getPastEvents(this.ExchangeContract, eventName, block);
      // console.log(events);
      if (events.length === 0) return events;
      const orders = events.reduce((acc, event) => {
        const { returnValues } = event;
        const {
          _orderHash,
          _orderObjHash,
        } = returnValues;
        acc.push({
          _id: _orderObjHash,
          order: _orderHash,
        });
        return acc;
      }, []);
      return orders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCreateOrderEvent(block) {
    try {
      const order = await this.getOrderEvent(block, this.EventEnum.CREATE_ORDER);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async getDeleteOrderEvent(block) {
    try {
      const order = await this.getOrderEvent(block, this.EventEnum.DELETE_ORDER);
      return order;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getMatchOrderEvent(block, eventName) {
    try {
      const events = await Event.getPastEvents(this.ExchangeContract, eventName, block);
      if (events.length === 0) return events;
      const orders = events.reduce((acc, event) => {
        const { returnValues } = event;
        const {
          _orderHash, _matchOrderHash,
        } = returnValues;
        acc.push({
          _id: _orderHash,
          match: _matchOrderHash,
        });
        return acc;
      }, []);
      return orders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCreateMatchOrderEvent(block) {
    try {
      const matchorder = await this.getMatchOrderEvent(block, this.EventEnum.CREATE_MATCH_ORDER);
      return matchorder;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getDeleteMatchOrderEvent(block) {
    try {
      const matchorder = await this.getMatchOrderEvent(block, this.EventEnum.DELETE_MATCH_ORDER);
      return matchorder;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getReceiveTokenEvent(block) {
    try {
      const events = await Event.getPastEvents(this.ExchangeContract, this.EventEnum.RECEIVE_TOKEN, block);
      if (events.length === 0) return events;
      const orders = events.reduce((acc, event) => {
        const { returnValues } = event;
        const {
          _from, _contractAddress, _tokenId,
        } = returnValues;
        acc.push({
          from: _from,
          contractAddress: _contractAddress,
          tokenId: _tokenId,
          block: event.blockNumber,
          transactionHash: event.transactionHash,
        });
        return acc;
      }, []);
      return orders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSendBackTokenEvent(block) {
    try {
      const events = await Event.getPastEvents(this.ExchangeContract, this.EventEnum.SENDBACK_TOKEN, block);
      if (events.length === 0) return events;
      const orders = events.reduce((acc, event) => {
        const { returnValues } = event;
        const {
          _owner, _contractAddress, _tokenId,
        } = returnValues;
        acc.push({
          owner: _owner,
          contractAddress: _contractAddress,
          tokenId: _tokenId,
          block: event.blockNumber,
          transactionHash: event.transactionHash,
        });
        return acc;
      }, []);
      return orders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getExchangeTokenEvent(block) {
    try {
      const events = await Event.getPastEvents(this.ExchangeContract, this.EventEnum.EXCHANGE_TOKEN, block);
      if (events.length === 0) return events;
      const orders = events.reduce((acc, event) => {
        const { returnValues } = event;
        const {
          _orderHash,
          _matchOrderHash,
          _orderOwner,
          _orderContractAddress,
          _orderTokenId,
          _matchOrderOwner,
          _matchOrderContractAddress,
          _matchOrderTokenId,
        } = returnValues;
        acc.push({
          orderHash: _orderHash,
          matchOrderHash: _matchOrderHash,
          orderOwner: _orderOwner,
          orderContractAddress: _orderContractAddress,
          orderTokenId: _orderTokenId,
          matchOrderOwner: _matchOrderOwner,
          matchOrderContractAddress: _matchOrderContractAddress,
          matchOrderTokenId: _matchOrderTokenId,
          block: event.blockNumber,
          transactionHash: event.transactionHash,
        });
        return acc;
      }, []);
      return orders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new ExchangeContract(exchangeJson.abi, ExchangeAddress);
