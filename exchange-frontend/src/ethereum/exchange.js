import web3 from './web3';
import ExchangeJson from './build/Exchange.json';
import { ExchangeAddress } from '../constants/ContractAddress';

const Exchange = new web3.eth.Contract(ExchangeJson.abi, ExchangeAddress);

export default Exchange;
