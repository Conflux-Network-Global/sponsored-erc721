const NFT = require("./index.js")

const main = async () => {
  const nft = new NFT("http://test.confluxrpc.org", "0x86d07b3511b380f63678e071ebbcc3b3c7cb0b2c");

  await nft.mint("", "");

  await nft.getAssets("")

}

main().catch(e => console.log(e))
