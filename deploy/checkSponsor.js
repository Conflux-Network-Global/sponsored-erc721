const { Conflux } = require("js-conflux-sdk");
const format = require('js-conflux-sdk/src/util/format');
require("dotenv").config();

async function main() {
  const cfx = new Conflux({
    url: process.env.ENDPOINT
    // logger: console,
  });

  const CONTRACT_ADDR = format.address(process.argv[2]);

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.InternalContract("SponsorWhitelistControl");

  let receipt = await contract.getSponsorForGas(CONTRACT_ADDR);
  console.log("Gas Sponsor:", receipt);

  receipt = await contract.getSponsoredBalanceForGas(CONTRACT_ADDR);
  console.log("Gas Sponsor Balance:", receipt);

  receipt = await contract.getSponsoredGasFeeUpperBound(CONTRACT_ADDR);
  console.log("Gas Sponsor Upper Bound:", receipt);

  receipt = await contract.getSponsorForCollateral(CONTRACT_ADDR);
  console.log("Collateral Sponsor:", receipt);

  receipt = await contract.getSponsoredBalanceForCollateral(CONTRACT_ADDR);
  console.log("Collateral Sponsor Balance:", receipt);
}

main().catch(e => console.error(e));
