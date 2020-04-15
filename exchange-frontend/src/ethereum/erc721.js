import web3 from './web3';
import Erc721Json from './build/ERC721.json';

export default address => (new web3.eth.Contract(Erc721Json.abi, address));
