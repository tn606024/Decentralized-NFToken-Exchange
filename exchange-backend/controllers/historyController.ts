import config from "config";
import { Request, Response } from "express";
import mongoose from "mongoose";

import { ExchangeTokenHistory } from "../models/ExchangeTokenHistory";
import { TokenHistorySchema } from "../models/tokenHistory";
const TokenHistoryCollection: string = config.get("TokenHistory.collection");
const ReceiveTokenHistory = mongoose.model(`Receive${TokenHistoryCollection}`, TokenHistorySchema);
const SendBackTokenHistory = mongoose.model(`SendBack${TokenHistoryCollection}`, TokenHistorySchema);

export class HistoryController {

    public async getUserReceiveTokens(req: Request, res: Response) {
        try {
            const tokens = await ReceiveTokenHistory.find({
                from: req.params.addr,
            }, "block from contractAddress tokenId transactionHash");
            res.json(tokens);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    public async getUserSendBackTokens(req: Request, res: Response) {
        try {
            const tokens = await SendBackTokenHistory.find({
                owner: req.params.addr,
            }, "block owner contractAddress tokenId transactionHash");
            res.json(tokens);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    public async getUserExchangeHistory(req: Request, res: Response) {
        try {
            const tokens = await ExchangeTokenHistory.find({
                $or:[
                    {orderOwner: req.params.addr},
                    {matchOrderOwner: req.params.addr},
                ],
            },
            // tslint:disable-next-line:max-line-length
            "block orderHash matchOrderHash orderOwner orderContractAddress orderTokenId matchOrderOwner matchOrderContractAddress matchOrderTokenId transactionHash");
            res.json(tokens);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

}
