// SPDX-License-Identifier: WTFPL

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTBase is ERC721 {
    address private owner;

    constructor() ERC721("MyCollectible", "MCO") public {
      owner = msg.sender;
    }

    //exposing the saf
    function safeMint(address to, uint256 tokenId) public {
      require(msg.sender == owner, "NFTBase: Only owner can mint");
      _safeMint(to, tokenId);
    }

    function safeMint(address to, uint256 tokenId, bytes calldata _data) public {
      require(msg.sender == owner, "NFTBase: Only owner can mint");
      _safeMint(to, tokenId, _data);
    }

}
