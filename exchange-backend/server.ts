import express = require("express");
import { App } from "./app";

// Create a new express application instance
class Server {
    public app: express.Application;

    constructor() {
        this.app = new App().app;
        this.start();
    }

    public start() {
        this.app.listen(3001, () => {
            console.log("Example app listening on port 3001!");
        });
    }
}

export default new Server().app;
