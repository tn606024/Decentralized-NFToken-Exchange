import config = require("config");
import mongoose = require("mongoose");
import {IContract} from "../types/IContract";

const collection: string = config.get("Contract.collection");

interface IContractModel extends IContract, mongoose.Document {
    _id: string;
}

const { Schema } = mongoose;

const ContractSchema: mongoose.Schema = new Schema({
    _id: {
        type: String,
        alias: "contract",
    },
    name:{
        type:String,
    },
});

export const Contract = mongoose.model<IContractModel>(collection, ContractSchema);
