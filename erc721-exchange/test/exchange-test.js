const NFToken = artifacts.require("NFToken");
const NFToken2 = artifacts.require("NFToken2");
const Exchange = artifacts.require("Exchange");

contract('NFToken', (accounts) => {
    let NFTokenInstance;
    let NFToken2Instance;
    before(async () => {
        // run before all tests in this block
        NFTokenInstance = await NFToken.deployed();
        NFToken2Instance = await NFToken2.deployed();
    });


    it('generate token 1~3 should success', async () => {
        try{
            for (let i of [1,2,3]){
                await NFTokenInstance.generateToken({ from: accounts[0] })
                await NFToken2Instance.generateToken({ from: accounts[1] })
            } 
            const tokenCount = await NFTokenInstance.balanceOf(accounts[0])
            assert.equal(tokenCount, 3, "error token count");
            const ownerAdderss = await NFTokenInstance.ownerOf(1)
            assert.equal(ownerAdderss, accounts[0], "error token owner");

        }catch(error){
            console.log(error)
            throw error
        }
    });

    contract('Exchange', () => {
        let ExchangeInstance;
        before(async () => {
            // run before all tests in this block
            ExchangeInstance = await Exchange.deployed();
        });

        it('owner should ApprovedForAll to Exchange address', async () => {
            try{
                await NFTokenInstance.setApprovalForAll(ExchangeInstance.address, true, {from: accounts[0]})
                await NFToken2Instance.setApprovalForAll(ExchangeInstance.address, true, { from: accounts[1] })
                const approved = await NFTokenInstance.isApprovedForAll(accounts[0], ExchangeInstance.address)
                assert.equal(approved, true, "ApprovedForAll failed")
            }catch(error){
                console.log(error)
                throw error

            }
        })

        describe('test receiveErc721Token', () => { 
            it('Received token 1 should success', async () => {
                try {
                    let transaction
                    for( let i of [1,2,3]) {
                        transaction = await ExchangeInstance.receiveErc721Token(NFTokenInstance.address, i, { from: accounts[0] })

                    }
                    for( let i of [1,2,3]) {
                        await ExchangeInstance.receiveErc721Token(NFToken2Instance.address, i, { from: accounts[1]})
                    }
                    const nowTokenOwner = await NFTokenInstance.ownerOf(1)
                    assert.equal(nowTokenOwner, ExchangeInstance.address, "now token owner is not exchange contract")
                } catch (error) {
                    console.log(error)
                    throw error

                }
            });

            it('Check tokenToOwner is original owner', async () => {
                try {
                    const originalTokenOwner = await ExchangeInstance.getTokenOwner(NFTokenInstance.address, '1')
                    assert.equal(originalTokenOwner, accounts[0], "original token owner is not sender")
                } catch (error) {
                    console.log(error)
                    throw error

                }
            })

            it('Check OwnerToTokens length = 3 and Owner own token 1', async () => {
                try {
                    const OwnerTokens = await ExchangeInstance.getOwnerTokens(accounts[0], NFTokenInstance.address);
                    assert.equal(OwnerTokens.length, 3, "OwnerToTokens length not 1")
                    assert.equal(OwnerTokens[0], 1, "OwnerToTokens[0] not 1")
                } catch (error) {
                    console.log(error)
                    throw error

                }
            })

            it('TokenToIndex should be 0', async () => {
                try {
                    const TokenToIndex = await ExchangeInstance.getTokenIndex(NFTokenInstance.address, 1);
                    assert.equal(TokenToIndex, 0, "index not 0")
                } catch (error) {
                    console.log(error)
                    throw error

                }
            })

            it('MatchOrderToOwner match order should mapping to owner', async () => {
                try {
                    const hash = web3.utils.soliditySha3(NFTokenInstance.address, '1', accounts[0])
                    const owner = await ExchangeInstance.getMatchOrderOwner(hash);
                    assert.equal(owner, accounts[0], 'owner not match accounts[0]');
                } catch (error) {
                    console.log(error);
                    throw error
                }
            })

            it('HashToOrderObj should add orderHash to OrderObj', async () => {
                try{
                    const hash = web3.utils.soliditySha3(NFTokenInstance.address, '1', accounts[0])
                    const orderObj = await ExchangeInstance.getHashOrderObj(hash)
                    const owner = orderObj[0];
                    const contractAddress = orderObj[1];
                    const tokenId = orderObj[2]
                    assert.equal(owner, accounts[0], 'owner not match accounts');
                    assert.equal(contractAddress, NFTokenInstance.address, 'contract address not match');
                    assert.equal(tokenId, '1', 'token id not 1');
                } catch (error){
                    console.log(error);
                    throw error   
                }
            })
        })

        describe('test sendBackToken', () => {

            it('send Back Token 1 should success', async () => {
                try{
                    await ExchangeInstance.sendBackToken(NFTokenInstance.address, 1, { from: accounts[0]});
                    const owner = await NFTokenInstance.ownerOf(1);
                    assert.equal(owner, accounts[0], 'owner not equal account[0]');
                } catch (error){
                    console.log(error);
                    throw error

                }
            })

            it('tokenToOwner should be clean', async () => {
                try {
                    const owner = await ExchangeInstance.getTokenOwner(NFTokenInstance.address, 1);
                    assert.equal(owner, '0x0000000000000000000000000000000000000000', 'owner not  0');
                } catch (error) {
                    console.log(error);
                    throw error

                }
            })

            it('OwnerToTokens length should be 2', async () => {
                try {
                    const tokens = await ExchangeInstance.getOwnerTokens(accounts[0], NFTokenInstance.address);
                    assert.equal(tokens.length, 2, 'token length not 0');
                } catch (error) {
                    console.log(error);
                    throw error

                }
            })

            it('TokenToIndex 1 should be 0 and 2 should be 1 and 3 should be 0', async () => {
                try {
                    const index = await ExchangeInstance.getTokenIndex(NFTokenInstance.address, 1);
                    const index2 = await ExchangeInstance.getTokenIndex(NFTokenInstance.address, 2);
                    const index3 = await ExchangeInstance.getTokenIndex(NFTokenInstance.address, 3);
                    assert.equal(index, 0, 'token index  not 0');
                    assert.equal(index2, 1, 'token index  not 1');
                    assert.equal(index3, 0, 'token index  not 0');
                } catch (error) {
                    console.log(error);
                    throw error

                }
            })

            it('MatchOrderToOwner owner should be 0', async () => {
                try {
                    const hash = web3.utils.soliditySha3(NFTokenInstance.address, '1', accounts[0])
                    const owner = await ExchangeInstance.getMatchOrderOwner(hash);
                    assert.equal(owner, '0x0000000000000000000000000000000000000000', 'owner not  0');
                } catch (error) {
                    console.log(error);
                    throw error
                }
            })
        })



        describe('test create and delete order and match order', async () => {
            
            let orderHash;
            let matchOrderHash;

            describe('test create NFToken id=2 Order', async () => {
                it('Create order should success', async () => {
                    try{
                        await ExchangeInstance.createOrder(NFTokenInstance.address, 2, { from: accounts[0]});
                    } catch (error) {
                        console.log(error);
                        throw error
                    } 
                });

                it('OwnerToOrders length should be 1', async () => {
                    try {
                        const orders = await ExchangeInstance.getOwnerOrders(accounts[0]);
                        orderHash = orders[0];
                        assert.equal(orders.length, 1, 'order length not 1');
                    } catch (error) {
                        console.log(error);
                        throw error

                    }
                })

                it('OrderToOwner hash should mapping to owner', async () => {
                    try {
                        const owner = await ExchangeInstance.getOrderOwner(orderHash);
                        assert.equal(owner, accounts[0], 'order has not mapping to owner');
                    } catch (error) {
                        console.log(error);
                        throw error

                    }
                })

                it('OrderToIndex hash should mapping to 0', async () => {
                    try {
                        const index = await ExchangeInstance.getOrderIndex(orderHash);
                        assert.equal(index, 0, 'order index not 0');
                    } catch (error) {
                        console.log(error);
                        throw error

                    }
                })

                it('OrderToExist should be true', async () => {
                    try {
                        const exist = await ExchangeInstance.getOrderExist(orderHash);
                        assert.equal(exist, true, 'order exist not true');
                    } catch (error) {
                        console.log(error);
                        throw error

                    }
                })
                
                it('OrderToHash should exist', async () => {
                    try {
                        const trueHash = web3.utils.soliditySha3(NFTokenInstance.address, 2, accounts[0])
                        const hash = await ExchangeInstance.getOrderHash(orderHash);
                        assert.equal(hash, trueHash, 'hash is not true');
                    } catch (error) {
                        console.log(error);
                        throw error

                    }
                })
            })

            describe('test create NFToken2 id=1 matchOrder', async () => {

                it('Create matchOrder should success', async () => {
                    try {
                        await ExchangeInstance.createMatchOrder(NFToken2Instance.address, 1, orderHash, {from: accounts[1]})
                    } catch (error) {
                        console.log(error);
                        throw error
                    }
                })

                it('get match order hash and matchOrders length should be 1', async () => {
                    try {
                        const matchOrders = await ExchangeInstance.getOrderMatchOrders(orderHash);
                        matchOrderHash = matchOrders[0];
                        assert.equal(matchOrders.length, 1, 'match orders length not 1');
                    } catch (error) {
                        console.log(error);
                        throw error
                    }
                })

                it('MatchOrderToIndex should be 0', async () => {
                    try {
                        const matchOrderIndex = await ExchangeInstance.getOrderMatchOrderIndex(orderHash, matchOrderHash);
                        assert.equal(matchOrderIndex, 0, 'match order index not 0');
                    } catch (error) {
                        console.log(error);
                        throw error
                    }
                })
            })

            describe('test deleteMatchOrder', async () => {
                it('deleteMatchOrder should success', async () => {
                    try {
                        await ExchangeInstance.deleteMatchOrder(matchOrderHash, orderHash, { from: accounts[1] });
                    } catch (error) {
                        console.log(error);
                        throw error
                    }
                })

                it('OrderToMatchOrders length should be 0 ', async () => {
                    try {
                        const matchOrders = await ExchangeInstance.getOrderMatchOrders(orderHash);
                        assert.equal(matchOrders.length, 0, 'match orders length not 0 ')
                    } catch (error) {
                        console.log(error);
                        throw error
                    } 
                })

                it('MatchOrderToIndex match order should mapping to right index', async () => {
                    try {
                        const index = await ExchangeInstance.getOrderMatchOrderIndex(orderHash,matchOrderHash);
                        assert.equal(index, 0, 'match orders index not 0');
                    } catch (error) {
                        console.log(error);
                        throw error;
                    }
                })
            })

            describe('test deleteOrder', async () => {
                it('deleteOrder should success', async () => {
                    try {
                        await ExchangeInstance.deleteOrder(orderHash);
                    } catch (error) {
                        console.log(error);
                        throw error;
                    }
                })

                it('OrderToExist should be false', async () => {
                    try {
                        const exist = await ExchangeInstance.getOrderExist(orderHash);
                        assert.equal(exist, false, 'exist is true');
                    } catch (error) {
                        console.log(error);
                        throw error;
                    }
                })

                it('OrderToOwner should be 0', async () => {
                    try {
                        const owner = await ExchangeInstance.getOrderOwner(orderHash);
                        assert.equal(owner, '0x0000000000000000000000000000000000000000', 'owner is not zero');
                    } catch (error) {
                        console.log(error);
                        throw error;
                    }
                })

                it('OwnerToOrders length should be 0', async () => {
                    try {
                        const orders = await ExchangeInstance.getOwnerOrders(accounts[0]);
                        assert.equal(orders.length, 0, 'orders length is not 0');
                    } catch (error) {
                        console.log(error);
                        throw error;
                    }
                })
                
                it('OrderToIndex order mapping to index should be 0', async () => {
                    try {
                        const index = await ExchangeInstance.getOrderIndex(orderHash);
                        assert.equal(index, 0, 'index is not 0');
                    } catch (error) {
                        console.log(error);
                        throw error;
                    }
                })
            })
        })


        describe('test exchangeToken', async () => {
            let orderHash;
            let matchOrderHash;

            it('create order and matchOrder should success and get orderHash and matchOrderHash', async () => {
                await ExchangeInstance.createOrder(NFTokenInstance.address, 2, { from: accounts[0] });
                const orders = await ExchangeInstance.getOwnerOrders(accounts[0]);
                orderHash = orders[0];
                await ExchangeInstance.createMatchOrder(NFToken2Instance.address, 1, orderHash, { from: accounts[1] })
                const matchOrders = await ExchangeInstance.getOrderMatchOrders(orderHash);
                matchOrderHash = matchOrders[0];
            })

            it('exchangeToken should success', async () => {
                try {
                    let transaction = await ExchangeInstance.exchangeToken(orderHash, matchOrderHash,  {from:accounts[0], gas:2000000});
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            })

            it('token should transfer success', async () => {
                try {
                    const owner1 = await NFTokenInstance.ownerOf(2);
                    const owner2 = await NFToken2Instance.ownerOf(1);
                    assert.equal(owner1, accounts[1], 'owner not belongs to accounts[1]');
                    assert.equal(owner2, accounts[0], 'owner not belongs to accounts[0]');
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            })

        })
    })
})
