import express = require("express");
import { NextFunction, Request, Response } from "express";
import { ContractController } from "../controllers/contractController";

export class ContractRoute {
    public router: express.Router;
    public path: string;
    private contractController: ContractController;
    constructor() {
        this.path = "/contract";
        this.router = express.Router();
        this.contractController = new ContractController();
        this.config();
    }

    private config() {
        // getContractInfos
        this.router.get("/infos", async (req: Request, res: Response, next: NextFunction) => {
            next();
        }, this.contractController.getContractsInfos);

        // getTest1Info
        this.router.get("/test1/:id", async (req: Request, res: Response, next: NextFunction) => {
            next();
        }, this.contractController.getTest1Infos);

        // getTest2Info
        this.router.get("/test2/:id", async (req: Request, res: Response, next: NextFunction) => {
            next();
        }, this.contractController.getTest2Infos);

    }
}
