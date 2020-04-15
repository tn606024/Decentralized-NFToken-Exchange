import express = require("express");
import { NextFunction, Request, Response } from "express";
import { HistoryController } from "../controllers/historyController";

export class HistoryRoute {
    public router: express.Router;
    public path: string;
    private historyController: HistoryController;
    constructor() {
        this.path = "/history";
        this.router = express.Router();
        this.historyController = new HistoryController();
        this.config();
    }

    private config() {
        // getUserReceiveTokens
        this.router.get("/receive/:addr", async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.params.addr);
            next();
        }, this.historyController.getUserReceiveTokens);
        // getUserSendBackTokens
        this.router.get("/sendback/:addr", async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.params.addr);
            next();
        }, this.historyController.getUserSendBackTokens);
        // getUserExchangeHistory
        this.router.get("/exchange/:addr", async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.params.addr);
            next();
        }, this.historyController.getUserExchangeHistory);
    }
}
