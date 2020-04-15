import express = require("express");
import {NextFunction, Request, Response} from "express";
import { EventController } from "../controllers/eventController";

export class EventRoute {
    public router: express.Router;
    public path: string;
    private eventContoller: EventController;
    constructor() {
        this.path = "/event";
        this.router = express.Router();
        this.eventContoller = new EventController();
        this.config();
    }

    private config() {
        // getUserWalletNFTokens
        this.router.get("/wallet/:addr", async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.params.addr);
            console.log(req.query.contract);
            next();
        }, this.eventContoller.getUserWalletNFTokens.bind(this.eventContoller));
        // getUserNFTTokens
        this.router.get("/tokens/:addr", async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.params.addr);
            console.log(req.query.contract);
            next();
        }, this.eventContoller.getUserNFTTokens.bind(this.eventContoller));

        // getUserOrders
        this.router.get("/orders/:addr", async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.params.addr);
            console.log(req.query.contract);
            next();
        }, this.eventContoller.getUserOrders.bind(this.eventContoller));

        // getUserMatchOrders
        this.router.get("/matchOrders/:addr", async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.params.addr);
            console.log(req.query.contract);
            next();
        }, this.eventContoller.getUserMatchOrders.bind(this.eventContoller));

        // getNFToken

        this.router.get("/token/:id", async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.params.id);
            next();
        }, this.eventContoller.getNFToken.bind(this.eventContoller));

        // getChooseTokens

        this.router.get("/tokens/choose/:addr", async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.params.addr);
            console.log(req.query.order);
            next();
        }, this.eventContoller.getChooseTokens.bind(this.eventContoller));

        // getOpenOrders

        this.router.get("/orders/open/:addr", async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.params.addr);
            next();
        }, this.eventContoller.getOpenOrders.bind(this.eventContoller));
    }
}
