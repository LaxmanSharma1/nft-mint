// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;
// OpenZeppelin Contracts 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; 
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";


import "hardhat/console.sol";

contract NftPro is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; 
    
    constructor() ERC721 ("SquareNFT","SQUARE") {
        console.log("This is my First NFT Contract."); 
    }

    function makeAnEpicNFT() public {
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, "https://jsonkeeper.com/b/6FO0");

        _tokenIds.increment();
    }
}