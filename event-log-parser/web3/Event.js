const web3 = require('./index');

class Event {
  static async getPastEvents(contract, event, block) {
    try {
      const events = await contract.getPastEvents(event, {
        fromBlock: web3.utils.numberToHex(block),
        toBlock: web3.utils.numberToHex(block),
      });
      return events;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = Event;
