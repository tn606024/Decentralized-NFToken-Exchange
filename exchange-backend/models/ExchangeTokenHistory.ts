import config = require("config");
import mongoose = require("mongoose");

const { Schema } = mongoose;

const collection: string = config.get("ExchangeTokenHistory.collection");
const contractCollection: string = config.get("Contract.collection");

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
    ref: contractCollection,
  },
  orderTokenId: {
    type: Number,
  },
  matchOrderOwner: {
    type: String,
  },
  matchOrderContractAddress: {
    type: String,
    ref: contractCollection,
  },
  matchOrderTokenId: {
    type: Number,
  },
  transactionHash: {
    type: String,
  },
});

ExchangeTokenHistorySchema.pre("find", function(next) {
  this.populate({
    path: "orderContractAddress",
    select: "_id name",
  }).populate({
    path: "matchOrderContractAddress",
    select: "_id name",
  });
  next();
});

ExchangeTokenHistorySchema.pre("findOne", function(next) {
  this.populate({
    path: "orderContractAddress",
    select: "_id name",
  }).populate({
    path: "matchOrderContractAddress",
    select: "_id name",
  });
  next();
});

export const ExchangeTokenHistory = mongoose.model(collection, ExchangeTokenHistorySchema);
