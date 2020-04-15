import express = require("express");
import { NextFunction, Request, Response } from "express";
import { ContractController } from "../controllers/contractController";

export class ApiRoute {
    public router: express.Router;
    public path: string;
    constructor() {
        this.path = "/api";
        this.router = express.Router();
    }
}
