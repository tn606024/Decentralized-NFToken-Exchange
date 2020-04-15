import config = require("config");
import mongoose = require("mongoose");

const { Schema } = mongoose;

// const collection = config.get('TokenHistory.collection');
const contractCollection: string = config.get("Contract.collection");

export const TokenHistorySchema = new Schema({
    block: {
        type: Number,
    },
    contractAddress: {
        type: String,
        ref: contractCollection,
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

TokenHistorySchema.pre("find", function(next) {
    this.populate({
        path: "contractAddress",
        select: "_id name",
    });
    next();
});

TokenHistorySchema.pre("findOne", function(next) {
    this.populate({
        path: "contractAddress",
        select: "_id name",
    });
    next();
});
