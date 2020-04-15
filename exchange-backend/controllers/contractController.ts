import { Request, Response } from "express";
import { FakeData } from "../fake/fakeData";
import { Contract } from "../models/contract";

export class ContractController {
    private FakeBot: FakeData;
    private FakeCat: FakeData;

    constructor() {
        this.FakeBot = new FakeData("bot");
        this.FakeCat = new FakeData("cat");
    }
    public async getContractsInfos(req: Request, res: Response) {
        try {
            const infos = await Contract.find({}, "_id name");
            res.json(infos);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    public async getTest1Infos(req: Request, res: Response) {
        try {
            res.json({
                image: `https://robohash.org/${req.params.id}`,
                name: this.FakeBot.getName(req.params.id),
                description: this.FakeBot.getDescriptions(req.params.id),
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    public async getTest2Infos(req: Request, res: Response) {
        try {
            res.json({
                image: `https://robohash.org/${req.params.id}?set=set4`,
                name: this.FakeCat.getName(req.params.id),
                description: this.FakeCat.getDescriptions(req.params.id),
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}
