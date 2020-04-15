import bodyParser = require("body-parser");
import config = require("config");
import cors = require("cors");
import express = require("express");
import mongoose = require("mongoose");
import { ApiRoute } from "./routes/apiRoute";
import { ContractRoute } from "./routes/contractRoute";
import { EventRoute } from "./routes/eventRoute";
import { HistoryRoute } from "./routes/historyRoute";

export class App {
    public app: express.Application;
    public apiRoute: ApiRoute;
    public eventRoute: EventRoute;
    public contractRoute: ContractRoute;
    public historyRoute: HistoryRoute;
    private mongoUrl: string;

    constructor() {
        this.app = express();
        this.apiRoute = new ApiRoute();
        this.eventRoute = new EventRoute();
        this.contractRoute = new ContractRoute();
        this.historyRoute = new HistoryRoute();
        this.mongoUrl = config.get("Mongo.location");
        this.config();
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        // this.app.use((req, res, next) => {

        //     // Website you wish to allow to connect
        //     res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000");

        //     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

        //     // Request methods you wish to allow
        //     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

        //     // Request headers you wish to allow
        //     res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

        //     // Set to true if you need the website to include cookies in the requests sent
        //     // to the API (e.g. in case you use sessions)
        //     res.setHeader("Access-Control-Allow-Credentials", "true");

        //     // Pass to next layer of middleware
        //     next();
        // });
        this.app.use(`${this.apiRoute.path}${this.eventRoute.path}`, this.eventRoute.router);
        this.app.use(`${this.apiRoute.path}${this.contractRoute.path}`, this.contractRoute.router);
        this.app.use(`${this.apiRoute.path}${this.historyRoute.path}`, this.historyRoute.router);
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(`${this.mongoUrl}/exchange`, { useNewUrlParser: true });
        const db: mongoose.Connection = mongoose.connection;
        // Bind connection to error event (to get notification of connection errors)
        db.once("open", () => { console.log("mongo open!"); })
            .on("error", console.error.bind(console, "MongoDB connection error:"));

    }
}

// export default new App().app;
