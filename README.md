# Sponsored ERC721

## Contract
ERC721 Contract from [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/)
* Compiled using conflux-truffle (`cfxtruffle compile`)
* ABI/bytecode used for deployment

## Deploy
Javascript files for deploying NFT contract and setting up transaction sponsorship.

Function | Details
--|--
`node deploy <KEY_ENV>` | Deploy the corresponding ERC721 contract to Conflux testnet
`node sponsor <KEY_ENV> <CONTRACT_ADDR>`| Send CFX as sponsor for gas and collateral
`node checkSponsor <CONTRACT_ADDR>` | Check sponsorship parameters of contract address
`node addSponsored <KEY_ENV> <CONTRACT_ADDR> <SPONSORED_ADDR>` | Admin can add an address as a sponsored address for smart contract interaction
`node isSponsered <CONTRACT_ADDR> <USER_ADDR>` | Check if user is sponsored for the smart contract
`node destroy <KEY_ENV> <CONTRACT_ADDR>` | Destroy the contract and unstake storage collateral (only contract admin can call)


#### Example
Sample `.env` file:
```
ENDPOINT=http://test.confluxrpc.org
PRIVATE_KEY1=0x<private_key>
PRIVATE_KEY2=0x<private_key>
```

Sample function calls:
```
//for deploying contract
node deploy PRIVATE_KEY1
node sponsor PRIVATE_KEY2 <insert new contract address>
node checkSponsor <insert new contract address>
node addSponsored PRIVATE_KEY1 <insert new contract address> 0x15fd1E4F13502b1a8BE110F100EC001d0270552d
node isSponsored <insert new contract address> 0x15fd1E4F13502b1a8BE110F100EC001d0270552d

//for destroying contract
node destroy PRIVATE_KEY1 <insert new contract address>
```
Note: `PRIVATE_KEY1` is the creator of the contract and is the default admin, so it is used in the `addSponsored` command. `PRIVATE_KEY2` is used to represent any sponsor.

Contract address (testnet): \<insert new contract address\>

#### Resources
Sponsorship contract interface: https://github.com/Conflux-Chain/conflux-rust/blob/master/internal_contract/contracts/SponsorWhitelistControl.sol  
Documentation: https://developer.conflux-chain.org/docs/conflux-rust/internal_contract/internal_contract#sponsorwhitelistcontrol-contract
