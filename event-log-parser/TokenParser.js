const _ = require('lodash');
const mongoose = require('mongoose');
const config = require('config');
const TokenContract = require('./token/index');
const TokenSchema = require('./models/Token');
const EventStatus = require('./models/EventStatus');
const Eth = require('./web3/Eth');
const Helper = require('./Helper');


class TokenParser {
  constructor(name) {
    this.name = name;
    this.address = config.get(`${this.name}.address`);
    this.initialBlock = config.get(`${this.name}.initialBlock`);
    this.breakTime = config.get('Parser.breakTime');
    this.waitBlock = config.get('Parser.waitBlock');
    this.tokenContract = new TokenContract(this.address);
    this.Token = mongoose.model(name, TokenSchema);
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

  async handleTransferEvent(block) {
    try {
      const events = await this.tokenContract.getTransferEvent(block);
      if (events.length !== 0) {
        const arr = events.map(async (event) => {
          if (event.from === '0x0000000000000000000000000000000000000000000000000000000000000000') {
            const token = new this.Token({
              _id: event._id,
              owner: event.to,
            });
            const returnValue = await token.save();
            return returnValue;
          }
          const tokenIsExist = await this.Token.findOne({
            _id: event._id,
          });
          if (tokenIsExist === undefined || tokenIsExist === null) {
            const token = new this.Token({
              _id: event._id,
              owner: event.to,
              contractAddress: this.address,
              tokenId: event._id,
            });
            const returnValue = await token.save();
            return returnValue;
          }
          const returnValue = await this.Token.findByIdAndUpdate({
            _id: event._id,
          }, {
            owner: event.to,
          }, {
            upsert: true,
            new: true,
          });
          return returnValue;
        });
        const results = await Promise.all(arr);
        return results;
      }
      return events;
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
        await this.handleTransferEvent(i);
        console.log(`${i} handleTransferEvent done`);
        await this.updateStatus(this.name, i);
        console.log(`${i} block done`);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

  async updateEvent() {
    let tokenStatus;
    let block;
    while (true) {
      try {
        console.log('start updateEvent');
        tokenStatus = await EventStatus.findOne({
          _id: this.name,
        });
        block = tokenStatus.status;
        console.log(`db block:${block}`);
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
      let tokenStatus = await EventStatus.findOne({
        _id: this.name,
      });
      if (tokenStatus === null) {
        tokenStatus = await this.updateStatus(this.name, this.initialBlock);
      }
      await this.updateEvent();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = TokenParser;
