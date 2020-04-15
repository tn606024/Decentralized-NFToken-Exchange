const mongoose = require('mongoose');
const config = require('config');

const { Schema } = mongoose;

const collection = config.get('ExchangeTokenHistory.collection');

const ExchangeTokenHistorySchema = new Schema({
  block: {
    type: Number,
  },
  orderHash: {
    type: String,
  },
  matchOrderHash: {
    type: String,
  },
  orderOwner: {
    type: String,
  },
  orderContractAddress: {
    type: String,
  },
  orderTokenId: {
    type: Number,
  },
  matchOrderOwner: {
    type: String,
  },
  matchOrderContractAddress: {
    type: String,
  },
  matchOrderTokenId: {
    type: Number,
  },
  transactionHash: {
    type: String,
  },
});

const ExchangeTokenHistory = mongoose.model(collection, ExchangeTokenHistorySchema);


module.exports = ExchangeTokenHistory;
