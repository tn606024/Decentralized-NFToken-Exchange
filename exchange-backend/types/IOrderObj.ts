import { IContract } from "./IContract";
import { ITokenInfo } from "./ITokenInfo";

export interface IOrderObj {
    _id: string;
    owner: string;
    contractAddress: IContract;
    tokenId: number;
    open: boolean;
    match: IOrderObj[];
    want: IOrderObj[];
    order: string;
    info: ITokenInfo;
}
