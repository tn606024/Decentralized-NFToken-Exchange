const config = require('config');
const Exchange = artifacts.require("Exchange");
const NFToken = artifacts.require("NFToken");
const NFToken2 = artifacts.require("NFToken2");
const ropsten_addresses = config.get("ropsten.addresses");

module.exports = function (deployer, network, accounts) {
    deployer.deploy(NFToken, { from: accounts[3] });
    if(network == "ropsten"){
        deployer.deploy(NFToken2, { from: ropsten_addresses[1]})
    } else {
        deployer.deploy(NFToken2, { from: accounts[3] })
    }
    // deployment steps
    deployer.deploy(Exchange, { from: accounts[3] });
};
