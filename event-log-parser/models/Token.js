const mongoose = require('mongoose');

const { Schema } = mongoose;


const TokenSchema = new Schema({
  _id: {
    type: Number,
  },
  owner: {
    type: String,
  },
  tokenId: {
    type: Number,
  },
  contractAddress: {
    type: String,
  },
});

module.exports = TokenSchema;
