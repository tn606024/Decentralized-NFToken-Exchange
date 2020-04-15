const mongoose = require('mongoose');
// const config = require('config');

const { Schema } = mongoose;

// const collection = config.get('TokenHistory.collection');

const TokenHistorySchema = new Schema({
  block: {
    type: Number,
  },
  contractAddress: {
    type: String,
  },
  tokenId: {
    type: Number,
  },
  from: {
    type: String,
  },
  owner: {
    type: String,
  },
  transactionHash: {
    type: String,
  },
});


module.exports = TokenHistorySchema;
