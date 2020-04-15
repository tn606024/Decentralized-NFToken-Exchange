import web3 from './web3';
import NFTokenJson from './build/NFToken.json';

export default address => (new web3.eth.Contract(NFTokenJson.abi, address));
