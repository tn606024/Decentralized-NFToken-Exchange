pragma solidity 0.5.6;

import "./ownable.sol";
import "./safe-math.sol";
import "./erc721-token-receiver.sol";
import "./ERC165Checker.sol";

/**
 * @dev Interface to Interative with ERC-721 Contract.
 */
contract Erc721Interface {
    function transferFrom(address _from, address _to, uint256 _tokenId) external;
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
    function ownerOf(uint256 _tokenId) external view returns (address _owner);
}

/**
 * @dev Interface to Interative with CryptoKitties Contract.
 */
contract KittyInterface {
    mapping (uint256 => address) public kittyIndexToApproved;
    function transfer(address _to, uint256 _tokenId) external;
    function transferFrom(address _from, address _to, uint256 _tokenId) external;
    function ownerOf(uint256 _tokenId) external view returns (address _owner);
}


contract Exchange is Ownable, ERC721TokenReceiver {

    using SafeMath for uint256;
    using SafeMath for uint;
    using ERC165Checker for address;

    address constant internal  CryptoKittiesAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
    
    bytes4 internal constant ERC721_RECEIVED_THREE_INPUT = 0xf0b9e5ba;

    bytes4 internal constant ERC721_RECEIVED_FOUR_INPUT = 0x150b7a02;

    mapping (address => mapping (uint256 => address)) internal TokenToOwner;

    mapping (address => mapping (address => uint256[])) internal OwnerToTokens;

    mapping (address => mapping(uint256 => uint256)) internal TokenToIndex;

    mapping (address => bytes32[]) internal OwnerToOrders;

    mapping (bytes32 => address) internal OrderToOwner;

    mapping (bytes32 => uint) internal OrderToIndex;

    mapping (bytes32 => address) internal MatchOrderToOwner;
   
    mapping (bytes32 => bytes32[]) internal OrderToMatchOrders;

    mapping (bytes32 => mapping(bytes32 => uint)) internal OrderToMatchOrderIndex;

    mapping (bytes32 => bool) internal OrderToExist;

    bytes4[] internal SupportNFTInterface;

    struct OrderObj {
        // NFT's owner
        address owner;

        // NFT's contract address
        address contractAddress;
        
        // NFT's id
        uint256 tokenId;
    }

    mapping (bytes32 => OrderObj) internal HashToOrderObj;

    mapping(bytes32 => bytes32) internal OrderToHash;

    event ReceiveToken(
        address indexed _from, 
        address _contractAddress, 
        uint256 _tokenId
    );

    event SendBackToken(
        address indexed _owner, 
        address _contractAddress, 
        uint256 _tokenId
    );

    event SendToken(
        address indexed _to, 
        address _contractAddress, 
        uint256 _tokenId
    );

    event CreateOrderObj(
        bytes32 indexed _hash,
        address indexed _owner,
        address _contractAddress,
        uint256 _tokenId   
    );

    event DeleteOrderObj(
        bytes32 indexed _hash,
        address indexed _owner,
        address _contractAddress,
        uint256 _tokenId  
    );

    event CreateOrder(
        address indexed _from,
        bytes32 indexed _orderHash,
        bytes32 indexed _orderObjHash,
        address _contractAddress,
        uint256 _tokenId
    );

    event CreateMatchOrder(
        address indexed _from,
        bytes32 indexed _orderHash,
        bytes32 indexed _matchOrderHash,
        address _contractAddress,
        uint256 _tokenId
    );

    event DeleteOrder(
        address indexed _from,
        bytes32 indexed _orderHash,
        bytes32 indexed _orderObjHash
    );

    event DeleteMatchOrder(
        address indexed _from,
        bytes32 indexed _orderHash,
        bytes32 indexed _matchOrderHash
    );

    event ExchangeToken(
        bytes32 indexed _orderHash,
        bytes32 indexed _matchOrderHash,
        address _orderOwner,
        address _orderContractAddress,
        uint256 _orderTokenId,
        address _matchOrderOwner,
        address _matchOrderContractAddress,
        uint256 _matchOrderTokenId
    );

    modifier onlySenderIsOriginalOwner(
        address contractAddress, 
        uint256 tokenId
    ) 
    {
        require(TokenToOwner[contractAddress][tokenId] == msg.sender, "original owner should be message sender");
        _;
    }

    constructor () public {
        //nf-token
        SupportNFTInterface.push(0x80ac58cd);

        //nf-token-metadata
        SupportNFTInterface.push(0x780e9d63);

        //nf-token-enumerable
        SupportNFTInterface.push(0x5b5e139f);
    }

    function addSupportNFTInterface(
        bytes4 interface_id
    )
    external
    onlyOwner()
    {
        SupportNFTInterface.push(interface_id);
    }

    function onERC721Received(
        address _from, 
        uint256 _tokenId, 
        bytes calldata _data
    ) 
    external 
    returns (bytes4)
    {
        return ERC721_RECEIVED_THREE_INPUT;
    }

    function onERC721Received(
        address _operator,
        address _from,
        uint256 _tokenId,
        bytes calldata data
    )
    external
    returns(bytes4)
    {
        return ERC721_RECEIVED_FOUR_INPUT;
    }

    function createOrder(
        address contractAddress, 
        uint256 tokenId
    ) 
    external 
    onlySenderIsOriginalOwner(
        contractAddress, 
        tokenId
    ) 
    {
        bytes32 orderHash = keccak256(abi.encodePacked(contractAddress, tokenId, msg.sender, block.number));
        bytes32 orderObjHash = keccak256(abi.encodePacked(contractAddress, tokenId, msg.sender));
        require(OrderToExist[orderObjHash] != true, "Order already exist");
        _addOrder(msg.sender, orderHash, orderObjHash, contractAddress, tokenId);
    }

    function _addOrder(
        address sender, 
        bytes32 orderHash,
        bytes32 orderObjHash,
        address contractAddress, 
        uint256 tokenId
    ) 
    internal 
    {
        uint index = OwnerToOrders[sender].push(orderHash).sub(1);
        OrderToOwner[orderHash] = sender;
        OrderToIndex[orderHash] = index;
        OrderToExist[orderObjHash] = true;
        OrderToHash[orderHash] = orderObjHash;
        emit CreateOrder(msg.sender, orderHash, orderObjHash, contractAddress, tokenId);
    }

    function deleteOrder(
        bytes32 orderHash
    )
    external
    {
        require(OrderToOwner[orderHash] == msg.sender, "this order hash not belongs to this address");
        bytes32 orderObjHash = OrderToHash[orderHash];
        _removeOrder(msg.sender, orderHash, orderObjHash);
    }

    function _removeOrder(
        address sender,
        bytes32 orderHash,
        bytes32 orderObjHash
    )
    internal
    {
        OrderToExist[orderObjHash] = false;
        delete OrderToOwner[orderHash];
        delete OrderToHash[orderHash];
        uint256 orderIndex = OrderToIndex[orderHash];
        uint256 lastOrderIndex = OwnerToOrders[sender].length.sub(1);
        if (lastOrderIndex != orderIndex){
            bytes32 lastOwnerOrder = OwnerToOrders[sender][lastOrderIndex];
            OwnerToOrders[sender][orderIndex] = lastOwnerOrder;
            OrderToIndex[lastOwnerOrder] = orderIndex;
        }
        OwnerToOrders[sender].length--;
        emit DeleteOrder(msg.sender, orderHash, orderObjHash);
    }

    function createMatchOrder(
        address contractAddress,
        uint256 tokenId, 
        bytes32 orderHash
    ) 
    external 
    onlySenderIsOriginalOwner(
        contractAddress, 
        tokenId
    ) 
    {
        bytes32 matchOrderHash = keccak256(abi.encodePacked(contractAddress, tokenId, msg.sender));
        bytes32 orderObjHash = OrderToHash[orderHash];
        require(OrderToExist[matchOrderHash] != true, "Order already exist");
        require(OrderToExist[orderObjHash] == true, "This order is not exist");
        _addMatchOrder(matchOrderHash, orderHash);
        emit CreateMatchOrder(msg.sender, orderHash, matchOrderHash, contractAddress, tokenId);
    }

    function _addMatchOrder(
        bytes32 matchOrderHash, 
        bytes32 orderHash
    ) 
    internal 
    {
        uint inOrderIndex = OrderToMatchOrders[orderHash].push(matchOrderHash).sub(1);
        OrderToMatchOrderIndex[orderHash][matchOrderHash] = inOrderIndex;
    }

    function deleteMatchOrder(
        bytes32 matchOrderHash,
        bytes32 orderHash
    )
    external
    {
        bytes32 orderObjHash = OrderToHash[orderHash];
        require(MatchOrderToOwner[matchOrderHash] == msg.sender, "match order doens't belong to this address" );
        require(OrderToExist[orderObjHash] == true, "this order is not exist");
        _removeMatchOrder(orderHash, matchOrderHash);
    }

    function _removeMatchOrder(
        bytes32 orderHash,
        bytes32 matchOrderHash
    )
    internal
    {
        uint256 matchOrderIndex = OrderToMatchOrderIndex[orderHash][matchOrderHash];
        uint256 lastMatchOrderIndex = OrderToMatchOrders[orderHash].length.sub(1);
        if (lastMatchOrderIndex != matchOrderIndex){
            bytes32 lastMatchOrder = OrderToMatchOrders[orderHash][lastMatchOrderIndex];
            OrderToMatchOrders[orderHash][matchOrderIndex] = lastMatchOrder;
            OrderToMatchOrderIndex[orderHash][lastMatchOrder] = matchOrderIndex;
        }
        OrderToMatchOrders[orderHash].length--;
        emit DeleteMatchOrder(msg.sender, orderHash, matchOrderHash);
    }

    function exchangeToken(
        bytes32 order,
        bytes32 matchOrder
    ) 
    external 
    {
        require(OrderToOwner[order] == msg.sender, "this order doesn't belongs to this address");
        bytes32 orderObjHash = OrderToHash[order];
        OrderObj memory orderObj = HashToOrderObj[orderObjHash];
        uint index = OrderToMatchOrderIndex[order][matchOrder];
        require(OrderToMatchOrders[order][index] == matchOrder, "match order is not in this order");
        require(OrderToExist[matchOrder] != true, "this match order's token have open order");
        OrderObj memory matchOrderObj = HashToOrderObj[matchOrder];
        _sendToken(matchOrderObj.owner, orderObj.contractAddress, orderObj.tokenId);
        _sendToken(orderObj.owner, matchOrderObj.contractAddress, matchOrderObj.tokenId);
        _removeMatchOrder(order, matchOrder);
        _removeOrder(msg.sender, order, orderObjHash);
        emit ExchangeToken(orderObjHash, matchOrder, orderObj.owner, orderObj.contractAddress, orderObj.tokenId, matchOrderObj.owner, matchOrderObj.contractAddress, matchOrderObj.tokenId);
    }

    function receiveErc721Token(
        address contractAddress, 
        uint256 tokenId
    ) 
    external  
    {
        bool checkSupportErc165Interface = false;
        if(contractAddress != CryptoKittiesAddress){
            for(uint i = 0; i < SupportNFTInterface.length; i++){
                if(contractAddress._supportsInterface(SupportNFTInterface[i]) == true){
                    checkSupportErc165Interface = true;
                }
            }
            require(checkSupportErc165Interface == true, "not supported Erc165 Interface");
            Erc721Interface erc721Contract = Erc721Interface(contractAddress);
            require(erc721Contract.isApprovedForAll(msg.sender,address(this)) == true, "contract doesn't have power to control this token id");
            erc721Contract.transferFrom(msg.sender, address(this), tokenId);
        }else {
            KittyInterface kittyContract = KittyInterface(contractAddress);
            require(kittyContract.kittyIndexToApproved(tokenId) == address(this), "contract doesn't have power to control this cryptoKitties's id");
            kittyContract.transferFrom(msg.sender, address(this), tokenId);
        }
        _addToken(msg.sender, contractAddress, tokenId);
        emit ReceiveToken(msg.sender, contractAddress, tokenId);

    }

    function _addToken(
        address sender, 
        address contractAddress, 
        uint256 tokenId
    ) 
    internal 
    {   
        bytes32 matchOrderHash = keccak256(abi.encodePacked(contractAddress, tokenId, sender));
        MatchOrderToOwner[matchOrderHash] = sender;
        HashToOrderObj[matchOrderHash] = OrderObj(sender,contractAddress,tokenId);
        TokenToOwner[contractAddress][tokenId] = sender;
        uint index = OwnerToTokens[sender][contractAddress].push(tokenId).sub(1);
        TokenToIndex[contractAddress][tokenId] = index;
        emit CreateOrderObj(matchOrderHash, sender, contractAddress, tokenId);
    }

    function sendBackToken(
        address contractAddress, 
        uint256 tokenId
    ) 
    external 
    onlySenderIsOriginalOwner(
        contractAddress, 
        tokenId
    ) 
    {
        bytes32 orderHash = keccak256(abi.encodePacked(contractAddress, tokenId, msg.sender));
        require(OrderToExist[orderHash] != true, 'this order still open');
        _sendToken(msg.sender, contractAddress, tokenId);
        emit SendBackToken(msg.sender, contractAddress, tokenId);
    }  

    function _sendToken(
        address sendAddress,
        address contractAddress, 
        uint256 tokenId
    )
    internal
    {   
        if(contractAddress != CryptoKittiesAddress){
            Erc721Interface erc721Contract = Erc721Interface(contractAddress);
            require(erc721Contract.ownerOf(tokenId) == address(this), "exchange contract should have this token");
            erc721Contract.transferFrom(address(this), sendAddress, tokenId);
        }else{
            KittyInterface kittyContract = KittyInterface(contractAddress);
            require(kittyContract.ownerOf(tokenId) == address(this), "exchange contract should have this token");
            kittyContract.transfer(sendAddress, tokenId);
        }
        _removeToken(contractAddress, tokenId);
        emit SendToken(sendAddress, contractAddress, tokenId);
    }

    function _removeToken(
        address contractAddress, 
        uint256 tokenId
    ) 
    internal 
    {
        address owner = TokenToOwner[contractAddress][tokenId];
        bytes32 orderHash = keccak256(abi.encodePacked(contractAddress, tokenId, owner));
        delete HashToOrderObj[orderHash];
        delete MatchOrderToOwner[orderHash];
        delete TokenToOwner[contractAddress][tokenId];
        uint256 tokenIndex = TokenToIndex[contractAddress][tokenId];
        uint256 lastOwnerTokenIndex = OwnerToTokens[owner][contractAddress].length.sub(1);
        if (lastOwnerTokenIndex != tokenIndex){
            uint256 lastOwnerToken = OwnerToTokens[owner][contractAddress][lastOwnerTokenIndex];
            OwnerToTokens[owner][contractAddress][tokenIndex] = lastOwnerToken;
            TokenToIndex[contractAddress][lastOwnerToken] = tokenIndex;
        }
        OwnerToTokens[owner][contractAddress].length--;
        emit DeleteOrderObj(orderHash, owner, contractAddress, tokenId);
    }

    function getTokenOwner(
        address contractAddress, 
        uint256 tokenId
    ) 
    external 
    view 
    returns (address)
    {
        return TokenToOwner[contractAddress][tokenId];
    }
    
    function getOwnerTokens(
        address ownerAddress, 
        address contractAddress
    ) 
    external 
    view 
    returns (uint256[] memory)
    {
        return OwnerToTokens[ownerAddress][contractAddress];
    }

    function getTokenIndex(
        address contractAddress, 
        uint256 tokenId
    ) 
    external 
    view
    returns (uint256)
    {
        return TokenToIndex[contractAddress][tokenId];
    }

    function getOwnerOrders(
        address ownerAddress
    ) 
    external 
    view 
    returns (bytes32[] memory){
        return OwnerToOrders[ownerAddress];
    }

    function getOrderOwner(
        bytes32 order
    ) 
    external 
    view 
    returns (address)
    {
        return OrderToOwner[order];
    }

    function getOrderIndex(
        bytes32 order
    ) 
    external 
    view 
    returns (uint)
    {
        return OrderToIndex[order];
    }

    function getOrderExist(
        bytes32 order
    )
    external
    view
    returns (bool){
        bytes32 orderObjHash = OrderToHash[order];
        return OrderToExist[orderObjHash];
    }

    function getMatchOrderOwner(
        bytes32 matchOrder
    ) 
    external 
    view 
    returns (address)
    {
        return MatchOrderToOwner[matchOrder];
    }

    function getOrderMatchOrderIndex(
        bytes32 order,
        bytes32 matchOrder
    ) 
    external 
    view 
    returns (uint)
    {
        return OrderToMatchOrderIndex[order][matchOrder];
    }

    function getOrderMatchOrders(
        bytes32 order
    ) 
    external 
    view 
    returns (bytes32[] memory)
    {
        return OrderToMatchOrders[order];
    }

    function getHashOrderObj(
        bytes32 hashOrder
    )
    external
    view
    returns(
        address, 
        address, 
        uint256
    )
    {
        OrderObj memory orderObj = HashToOrderObj[hashOrder];
        return(
            orderObj.owner,
            orderObj.contractAddress,
            orderObj.tokenId
        );
    }

    function getOrderHash(
        bytes32 orderHash
    )
    external
    view
    returns(bytes32){
        return OrderToHash[orderHash];
    }
}

