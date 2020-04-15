import { IContract } from "./IContract";
import { ITokenInfo } from "./ITokenInfo";

export interface IToken {
    _id: string;
    tokenId: number;
    owner: string;
    contractAddress: IContract;
    info: ITokenInfo;
}
