const web3 = require('../web3');
const Event = require('../web3/Event');
const nfTokenJson = require('./NFToken.json');


class TokenContract {
  constructor(address) {
    this.EventEnum = {
      TRANSFER: 'Transfer',
    };
    this.abi = nfTokenJson.abi;
    this.address = address;
    this.TokenContract = new web3.eth.Contract(this.abi, this.address);
  }

  async getTransferEvent(block) {
    try {
      const events = await Event.getPastEvents(this.TokenContract, this.EventEnum.TRANSFER, block);
      if (events.length === 0) return events;
      const tokenEvents = events.reduce((acc, event) => {
        const { returnValues } = event;
        const {
          _from, _to, _tokenId,
        } = returnValues;
        acc.push({
          from: _from,
          to: _to,
          _id: _tokenId,
        });
        return acc;
      }, []);
      return tokenEvents;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = TokenContract;
