const mongoose = require('mongoose');
const config = require('config');

const { Schema } = mongoose;

const collection = config.get('OrderObj.collection');
const OrderObjSchema = new Schema({
  _id: {
    type: String,
    alias: 'hash',
  },
  owner: {
    type: String,
  },
  contractAddress: {
    type: String,
  },
  tokenId: {
    type: Number,
  },
  open: {
    type: Boolean,
    default: false,
  },
  match: [{
    type: String,
    ref: collection,
    default: [],
  }],
  want: [{
    type: String,
    ref: collection,
    default: [],
  }],
  order: {
    type: String,
    default: '',
  },
});

module.exports = OrderObjSchema;
