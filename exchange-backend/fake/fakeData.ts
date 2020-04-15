import fs from "fs";
import path from "path";

export class FakeData {
    private ownName: string;
    private names: string[];
    private descriptions1: string[];
    private descriptions2: string[];

    constructor(ownName: string) {
        this.ownName = ownName;
        this.names = [];
        // tslint:disable-next-line:max-line-length
        this.descriptions1 = [];
        // tslint:disable-next-line:max-line-length
        this.descriptions2 = [];
    }

    public getName(tokenId: number): string {
        if(this.names.length === 0) {
            // tslint:disable-next-line:max-line-length
            this.names = fs.readFileSync(path.resolve(__dirname, `${this.ownName}name.txt`), "utf8").toString().split("\n");
        }
        const num: number = tokenId % 100;
        return this.names[num].trim();
    }

    public getDescriptions(tokenId: number): string[] {
        if (this.descriptions1.length === 0) {
        // tslint:disable-next-line:max-line-length
            this.descriptions1 = fs.readFileSync(path.resolve(__dirname, `${this.ownName}description1.txt`), "utf8").toString().split("\n");
        }
        if (this.descriptions2.length === 0) {
            // tslint:disable-next-line:max-line-length
            this.descriptions2 = fs.readFileSync(path.resolve(__dirname, `${this.ownName}description2.txt`), "utf8").toString().split("\n");
        }
        const num: number = tokenId%100;
        const desc1: string = this.descriptions1[num];
        const desc2: string = this.descriptions2[num];
        return [desc1, desc2];
    }
}
