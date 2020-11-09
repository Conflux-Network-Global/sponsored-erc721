# Sponsored ERC-721

Package for interacting with sponsored NFTs on Conflux network

## Setup Instructions
```
npm install @aalu1418/sponsored-erc721
```

For full functionality make sure to also deploy corresponding contracts described here: https://github.com/Conflux-Network-Global/sponsored-erc721

## Functionality
Requires a `.env` file in the working directory.
```
PRIVATE_KEY=<conflux private key>
```

### Commands

```javascript
//initialize connection
//input: conflux network endpoint, NFT address
//output: nft object
const nft = new NFT("http://test.confluxrpc.org", "0x8aa092e0660c59eab456efdbd39ae8d158e9a95b");

//mint NFT to user address
//input: user address, NFT id
//output: conflux network transaction hash
const tx = await nft.mint("0x18e33e342b0f3fFE0b0193950FE9F2e0378a81Ee", 1);
console.log("Mint TX hash:", tx.transactionHash);

//get NFT assets for specific user address
//input: address
//output: array of NFT ids
const list = await nft.getAssets("0x18e33e342b0f3fFE0b0193950FE9F2e0378a81Ee")
console.log("Assets:", list);
```
