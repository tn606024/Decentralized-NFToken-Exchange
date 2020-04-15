import config = require("config");
import mongoose = require("mongoose");
import {IOrderObj} from "../types/IOrderObj";

interface IOrderObjModel extends IOrderObj, mongoose.Document {
    _id: string;
}

const { Schema } = mongoose;
const collection: string = config.get("OrderObj.collection");
const contractCollection: string = config.get("Contract.collection");

const OrderObjSchema: mongoose.Schema = new Schema({
    _id: {
        type: String,
        alias: "hash",
    },
    owner: {
        type: String,
    },
    contractAddress: {
        type: String,
        ref: contractCollection,
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
        default: "",
    },
    info: {
        img:{
            type: String,
        },
        name: {
            type: String,
        },
        descriptions: [{
            type: String,
            default: [],
        }],
    },
});

OrderObjSchema.pre("find", function(next) {
    this.populate({
        path: "contractAddress",
        select: "_id name",
    });
    next();
});

OrderObjSchema.pre("findOne", function(next) {
    this.populate({
        path: "contractAddress",
        select: "_id name",
    });
    next();
});

export const OrderObj = mongoose.model<IOrderObjModel>(collection, OrderObjSchema);
