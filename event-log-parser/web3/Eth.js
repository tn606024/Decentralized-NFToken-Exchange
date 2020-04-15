const web3 = require('./index');

class Eth {
  static async getBlockNumber() {
    try {
      const blockNumber = await web3.eth.getBlockNumber();
      return blockNumber;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = Eth;
