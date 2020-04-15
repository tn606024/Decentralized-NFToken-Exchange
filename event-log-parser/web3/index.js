const Web3 = require('web3');
const config = require('config');

const web3ProviderUrl = config.get('Parser.provider');

const provider = new Web3.providers.HttpProvider(web3ProviderUrl);

const web3 = new Web3(provider);

module.exports = (web3);
