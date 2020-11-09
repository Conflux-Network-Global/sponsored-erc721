const NFT = require("@aalu1418/sponsored-erc721")

const main = async () => {
  const nft = new NFT("http://test.confluxrpc.org", "0x8aa092e0660c59eab456efdbd39ae8d158e9a95b");

  // const tx = await nft.mint("0x18e33e342b0f3fFE0b0193950FE9F2e0378a81Ee", 1);
  // console.log("Mint TX hash:", tx.transactionHash);

  const list = await nft.getAssets("0x18e33e342b0f3fFE0b0193950FE9F2e0378a81Ee")
  console.log("Assets:", list);

}

main().catch(e => console.log(e))
