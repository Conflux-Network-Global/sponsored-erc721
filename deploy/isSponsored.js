const { Conflux } = require("js-conflux-sdk");
const format = require('js-conflux-sdk/src/util/format');
require("dotenv").config();

async function main() {
  const cfx = new Conflux({
    url: process.env.ENDPOINT
    // logger: console,
  });

  const CONTRACT_ADDR = format.address(process.argv[2]);
  const USER_ADDR = format.address(process.argv[3]);

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.InternalContract("SponsorWhitelistControl");

  let receipt = await contract.isWhitelisted(CONTRACT_ADDR, USER_ADDR);
  console.log("Sponsored?", receipt);
}

main().catch(e => console.error(e));
