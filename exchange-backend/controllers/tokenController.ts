import { FakeData } from "../fake/fakeData";
import { ITokenModel } from "../models/token";
import { IOrderObj } from "../types/IOrderObj";
import { ITokenInfo } from "../types/ITokenInfo";

export class TokenController {
    private FakeBot: FakeData;
    private FakeCat: FakeData;

    constructor() {
        this.FakeBot = new FakeData("bot");
        this.FakeCat = new FakeData("cat");
    }

    public extendWithTokenInfo(tokens: IOrderObj[]): IOrderObj[] {
        const extendTokens: IOrderObj[] = tokens.reduce((acc: IOrderObj[], token: IOrderObj) => {
          const info: ITokenInfo = this.getTokenInfo(token.contractAddress.name, token.tokenId);
          token.info = info;
          acc.push(token);
          return acc;
        },[]);
        return extendTokens;
    }

    public extendTokenWithTokenInfo(tokens: ITokenModel[]): ITokenModel[] {
        const extendTokens: ITokenModel[] = tokens.reduce((acc: ITokenModel[], token: ITokenModel) => {
            const info: ITokenInfo = this.getTokenInfo(token.contractAddress.name, Number(token._id));
            token.info = info;
            acc.push(token);
            return acc;
        }, []);
        return extendTokens;
    }

    public extendOneWithTokenInfo(token: IOrderObj): IOrderObj {
        const info: ITokenInfo = this.getTokenInfo(token.contractAddress.name, token.tokenId);
        token.info = info;
        return token;
    }

    public getTokenInfo(name: string, id: number): ITokenInfo {
        if(name === "CryptoBot") {
            return {
                img: `https://robohash.org/${id}`,
                name: this.FakeBot.getName(id),
                descriptions: this.FakeBot.getDescriptions(id),
            };
        } else if (name === "CryptoCat") {
            return {
                img: `https://robohash.org/${id}?set=set4`,
                name: this.FakeCat.getName(id),
                descriptions: this.FakeCat.getDescriptions(id),
            };
        } else {
            return {
                img: ``,
                name:``,
                descriptions:[],
            };
        }
    }

}
