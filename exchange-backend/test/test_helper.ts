import mongoose from "mongoose";
import { OrderObj } from "../models/orderObj";
import Server from "../server";
describe("initial setting",() => {
    before(function(done) {
        this.timeout(10000);
        Server.on("app_started", () => {
            done();
        });
    });

    before((done) => {
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost:27017/exchange");

        // Get the default connection
        const db = mongoose.connection;

        // Bind connection to error event (to get notification of connection errors)
        db.once("open", () => { console.log("mongo open!"); })
            .on("error", console.error.bind(console, "MongoDB connection error:"));
        done();
    });

    before((done) => {
        const { orderobjs } = mongoose.connection.collections;
        orderobjs.drop(() => {
            done();
        });
    });

    before(async () => {
        const orderObj1 = new OrderObj(
            {
                _id: "0x2bc33d93d812203a7537c2276c32737fddc6df766e2271db66f5bd5cfc273e12",
                open: true,
                match: [
                    "0xddf7c4d24f60760043d5d60f46e6314bc95ef0fe594ce9751380ce33de9dfd75"
                ],
                want: [],
                order: "0x210cea64cff234472f1f9345f624a1d0bd02e73e116fdf92c00b4f15ec7a1aed",
                owner: "0x89fBF9dA0a7B47C16c32e0FE87e99339e89510C6",
                contractAddress: "0x6d82Ead6d066DF929C00b9136B7278e652ab66f3",
                tokenId: 11,
            });
        const orderObj2 = new OrderObj({
            _id: "0xddf7c4d24f60760043d5d60f46e6314bc95ef0fe594ce9751380ce33de9dfd75",
            open: false,
            match: [],
            want: [
                "0x2bc33d93d812203a7537c2276c32737fddc6df766e2271db66f5bd5cfc273e12",
            ],
            order: "",
            owner: "0x457Cf662b8334C0AB1a382901a93481e5027B0a6",
            contractAddress: "0xb476f49C6ea0D7f37Bb343A2513b4410F7482a82",
            tokenId: 5,
        });
        await orderObj1.save();
        await orderObj2.save();
    });
});
