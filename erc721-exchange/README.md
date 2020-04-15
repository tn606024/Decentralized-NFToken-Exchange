Decentralized NFToken Exchange 
=====================

This repository contains the solidity code of a decentralized NFToken Exchange, this is a DApp on Ethereum local network using Truffle Framework.

If you want use this dapp on ropsten testnet or mainnet,  we also have deployed contract, please 
check [deployed contract](#deployed-contract). 

I develop a DApp where the users can exchange NFToken like cryptoKitties, etheremon..., as 
long as they meet the [Erc721 standard](http://erc721.org/).

Cause it's not easy to get free erc721 token on ropsten testnet, I create two fake Erc721 contract
(NFToken, NFToken2) in this repository so that users can easy to get token and test exchange function.

It still in early development phrase, I can't guarantee that contract has no security risks.

Contents
--------

 - [Install](#install)
 - [Test](#test)
 - [Send NFToken to Exchange](#send-token-to-exchange)
 - [Order and MatchOrder](#order-and-matchorder)
 - [Exchange NFToken](#exchange-nftoken)
 - [Deployed Contract](#deployed-contract)
 - [Get Erc721 token on testnet](#get-erc721-token-on-testnet)
 - [Erc721 sample project](#erc721-sample-project)


Install
-------

Dapp was developed with truffle framework, you can read truffle's document to know how to test
and deploy.

If you need to run a local blockchain, You need to pay attention to configure and run Ganache.

- [truffle document](https://github.com/trufflesuite/truffle)
- [Ganache](https://truffleframework.com/ganache)

Test
-------

You can understand the flow of the entire program by testing and read it code.

`truffle test`

Send NFToken to Exchange
-------

First, if you want to exchange NFToken with others, you must transfer your NFToken to Exchange contract,
but please don't directly send your NFToken. 

You must call `setApprovalForAll` on your NFToken Contract and set true to Exchange contract address, and then call `receiveErc721Token` on Exchange Contract. Exchange Contract will instead you to transfer NFToken to itself and record necessary information so you can exchange token success. 

Don't worried about your NFToken lost, if you want get your NFToken back,just call `sendBackToken` and your NFToken will back to your original address.

Order and MatchOrder
------

Order or matchorder is a hash can mapping to one NFToken's inforamtion.

If you want to exchange your NFToken on Exchange Contract, you must call `createOrder` to create an order first. it will create a hash and you can use it to search information(owner, NFToken contract address, NFToken id) by call `getHashOrderObj`. 

If other people like your NFToken and want to provide their NFToken to exchange with you, they can call `createMatchOrder` and fill the hash in the parameters to show that they want to exchange with you. 

You just checked by `getOrderMatchOrders` that will return an array include all hash that want to exchange with you.


Exchange NFToken
------

If you are an order's owner, find one matchorder in your order's mathorder array and The NFToken it represents you want to exchange, you can call `exchangeToken` and fill in the parameters of both hashes. 

As long as matchorder is effective, the transaction happens immediately, The NFTokens will be sent to the corresponding address.

Deployed Contract
-------

There already have deployed contract on Ropsten testnet and Mainnet, you can use etherscan Write Contract UI interface to interact with contract.

### Ropsten

 - [NFToken](https://ropsten.etherscan.io/address/0x6d82ead6d066df929c00b9136b7278e652ab66f3)

 - [NFToken2](https://ropsten.etherscan.io/address/0xb476f49c6ea0d7f37bb343a2513b4410f7482a82)

 - [Exchange](https://ropsten.etherscan.io/address/0xe8995D80361794262B5eD2E08fEA06f2a1FE48f7)

 ### Mainnet

 - [Exchange](https://etherscan.io/address/0xc5d11922c11b6130c5889d975e2cf6db837f8868)

Get Erc721 token on testnet
------

you can call `generateToken()` on NFToken or NFToken2 contract and then you can get free erc721 token
to test.

Erc721 sample project
------

NFToken and NFToken2 is duplicate and slightly modified from this link

[ethereum-erc721](https://github.com/0xcert/ethereum-erc721)


