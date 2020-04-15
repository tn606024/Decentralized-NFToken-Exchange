import config = require("config");
import mongoose = require("mongoose");
import { IToken } from "../types/IToken";

export interface ITokenModel extends IToken, mongoose.Document {
    _id: string;
}

const { Schema } = mongoose;
const contractCollection: string = config.get("Contract.collection");

export const TokenSchema = new Schema({
    _id: {
        type: Number,
    },
    tokenId:{
        type: Number,
    },
    owner: {
        type: String,
    },
    contractAddress: {
        type: String,
        ref: contractCollection,
    },
    info: {
        img: {
            type: String,
        },
        name: {
            type: String,
        },
        description: {
            type: String,
        },
    },
});

TokenSchema.pre("find", function(next) {
    this.populate({
        path: "contractAddress",
        select: "_id name",
    });
    next();
});
