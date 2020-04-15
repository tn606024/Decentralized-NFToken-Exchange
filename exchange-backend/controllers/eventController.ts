import config from "config";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { OrderObj } from "../models/orderObj";
import { ITokenModel, TokenSchema } from "../models/token";
import { IOrderObj } from "../types/IOrderObj";
import { TokenController } from "./tokenController";

interface IContractMapping {
    name: string;
    address: string;
}

interface ITokenModalMapping {
    model: mongoose.Model<ITokenModel, {}>;
    name: string;
    address: string;
}

export class EventController {
    private tokenController: TokenController;
    constructor() {
        this.tokenController = new TokenController();
    }
    public async getUserWalletNFTokens(req: Request, res: Response) {
        try {
            const contracts: IContractMapping[] = config.get("NFT");
            // tslint:disable-next-line:max-line-length
            const tokenModels: ITokenModalMapping[] = contracts.reduce((acc: ITokenModalMapping[], contract: IContractMapping) => {
                // tslint:disable-next-line:max-line-length
                const tokenModal: mongoose.Model<ITokenModel, {}> = mongoose.model<ITokenModel>(contract.name, TokenSchema);
                const token: ITokenModalMapping = {
                    model: tokenModal,
                    name: contract.name,
                    address: contract.address,
                };
                acc.push(token);
                return acc;
            },[]);
            // tslint:disable-next-line:max-line-length
            const allTokens = await tokenModels.reduce(async (accPromise: Promise<ITokenModel[]>, tokenModal: ITokenModalMapping) => {
                let acc: ITokenModel[] = await accPromise;
                const TokenModel = tokenModal.model;
                const tokens: ITokenModel[] = await TokenModel.find({
                    owner: req.params.addr,
                },
                    "_id, owner, contractAddress, tokenId",
                );
                acc = acc.concat(tokens);
                return acc;
            }, Promise.resolve([]));
            this.tokenController.extendTokenWithTokenInfo(allTokens);

            res.json(allTokens);
        } catch(error) {
            console.log(error);
            res.send(error);
        }
    }

    public async getUserNFTTokens(req: Request, res: Response) {
        let tokens;
        try {
            if (req.query.contract === undefined) {
                tokens = await OrderObj.find({
                    owner: req.params.addr,
                },
                    "_id contractAddress tokenId owner open match want info",
                ).populate({
                    path: "match",
                    populate: {
                        path: "contractAddress",
                        select: "_id name",
                    },
                    select: "_id contractAddress tokenId owner",
                }).populate({
                    path: "want",
                    populate:{
                        path: "contractAddress",
                        select: "_id name",
                    },
                    select: "_id contractAddress tokenId owner",
                });
            } else {
                tokens = await OrderObj.find({
                    contractAddress: req.query.contract,
                    owner: req.params.addr,
                },
                    "_id contractAddress tokenId owner open match want",
                ).populate({
                    path: "match",
                    populate: {
                        path: "contractAddress",
                        select: "_id name",
                    },
                    select: "_id contractAddress tokenId owner",
                }).populate({
                    path: "want",
                    populate: {
                        path: "contractAddress",
                        select: "_id name",
                    },
                    select: "_id contractAddress tokenId owner",
                });
            }
            console.log(tokens);
            this.tokenController.extendWithTokenInfo(tokens);
            console.log(tokens);
            res.json(tokens);
        } catch (error) {
            console.log(error);
            res.send(error);
        }

    }

    public async getUserOrders(req: Request, res: Response) {
        let orders;
        try {
            if (req.query.contract === undefined) {
                orders = await OrderObj.find({
                    open: true,
                    owner: req.params.addr,
                },
                    "contractAddress tokenId _id",
                ).populate({
                    path: "contractAddress",
                    select: "_id name",
                }).populate({
                    path: "match",
                    populate:{
                        path: "contractAddress",
                        select: "_id name",
                    },
                    select: "_id contractAddress tokenId",
                });
            } else {
                orders = await OrderObj.find({
                    contractAddress: req.query.contract,
                    open: true,
                    owner: req.params.addr,

                },
                    "contractAddress tokenId _id",
                ).populate({
                    path: "contractAddress",
                    select: "_id name",
                }).populate({
                    path: "match",
                    populate: {
                        path: "contractAddress",
                        select: "_id name",
                    },
                    select: "_id contractAddress tokenId",
                });
            }
            this.tokenController.extendWithTokenInfo(orders);
            res.json(orders);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    public async getUserMatchOrders(req: Request, res: Response) {
        let matchOrders;
        try {
            if (req.query.contract === undefined) {
                matchOrders = await OrderObj.find({
                    "owner": req.params.addr,
                    "want.0": {$exists: true},
                },
                    "contractAddress tokenId _id",
                ).populate({
                    path: "contractAddress",
                    select: "_id name",
                }).populate({
                    path: "want",
                    populate: {
                        path: "contractAddress",
                        select: "_id name",
                    },
                    select: "_id order contractAddress tokenId",
                });
            } else {
                matchOrders = await OrderObj.find({
                    contractAddress: req.query.contract,
                    open: true,
                    owenr: req.params.addr,
                },
                    "order contractAddress tokenId _id",
                ).populate({
                    path: "contractAddress",
                    select: "_id name",
                }).populate({
                    path: "want",
                    populate: {
                        path: "contractAddress",
                        select: "_id name",
                    },
                    select: "_id order contractAddress tokenId",
                });
            }
            this.tokenController.extendWithTokenInfo(matchOrders);
            res.json(matchOrders);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    public async getNFToken(req: Request, res: Response) {
        try {
            const nfToken = await OrderObj.findOne({
                _id: req.params.id,
            },
                "_id contractAddress tokenId owner open order match want",
            ).populate({
                path: "match",
                populate: {
                    path: "contractAddress",
                    select: "_id name",
                },
                select: "_id contractAddress tokenId owner open",
            }).populate({
                path: "want",
                populate: {
                    path: "contractAddress",
                    select: "_id name",
                },
                select: "_id contractAddress tokenId owner order",
            });
            console.log(nfToken);
            if(nfToken !== null) {
                this.tokenController.extendOneWithTokenInfo(nfToken!!);
                res.json(nfToken);
            } else {
                res.json(null);
            }

        } catch(error) {
            console.log(error);
            res.send(error);
        }
    }

    public async getChooseTokens(req: Request, res: Response) {
        try {
            const order = await OrderObj.findOne({
                order: req.query.order,
            },
                "match",
            ).populate({
                path: "match",
                select: "_id",
            });
            const matchArray: IOrderObj[] = order!!.match;
            const matchIdArray: string[] = matchArray.reduce((acc: string[], match: IOrderObj) => {
              const id: string = match._id;
              acc.push(id);
              return acc;
            }, []);
            const tokens = await OrderObj.find({
                _id: { $nin: matchIdArray},
                owner: req.params.addr,
                open: false,
            },
                "_id contractAddress tokenId",
            );
            this.tokenController.extendWithTokenInfo(tokens);
            res.json(tokens);
        } catch(error) {
            console.log(error);
            res.send(error);
        }
    }

    public async getOpenOrders(req: Request, res: Response) {
        try {
        if(req.query.search === undefined) {
           await this.getOpenOrdersWithNoSearch(req, res);
        } else {
          await this.getOpenOrdersWithSearch(req, res);
        }
        } catch(error) {
            console.log(error);
            res.send(error);
        }

    }

    private async getOpenOrdersWithNoSearch(req: Request, res: Response) {
        try {
            const tokens = await OrderObj.find({
                open: true,
            },
                "_id contractAddress tokenId",
            ).populate({
                path: "match",
                populate: {
                    path: "contractAddress",
                    select: "_id name",
                },
                select: "_id contractAddress tokenId owner",
            });
            this.tokenController.extendWithTokenInfo(tokens!!);
            res.json(tokens);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    private async getOpenOrdersWithSearch(req: Request, res: Response) {
        try {
            let tokens = await OrderObj.find({
                open: true,
            },
                "_id contractAddress tokenId",
            ).populate({
                path: "match",
                populate: {
                    path: "contractAddress",
                    select: "_id name",
                },
                select: "_id contractAddress tokenId owner",
            });
            tokens = tokens.filter((token) => {
                // tslint:disable-next-line:max-line-length
                if (token.contractAddress.name.includes(req.query.search) || token.tokenId.toString().includes(req.query.search)) {
                    return token;
                }
            });
            this.tokenController.extendWithTokenInfo(tokens!!);
            res.json(tokens);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}
