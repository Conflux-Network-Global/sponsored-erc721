const { Conflux, Drip } = require("js-conflux-sdk");
const format = require('js-conflux-sdk/src/util/format');

require("dotenv").config();

async function main() {
  const cfx = new Conflux({
    url: process.env.ENDPOINT
    // logger: console,
  });

  const PRIVATE_KEY = format.privateKey(process.env[process.argv[2]]);
  const CONTRACT_ADDR = format.address(process.argv[3]);

  // ================================ Account =================================
  const account = cfx.wallet.addPrivateKey(PRIVATE_KEY); // create account instance
  console.log("Sponsor Address:", account.address); //sponsor account

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.InternalContract("SponsorWhitelistControl");

  let receipt = await contract
    .setSponsorForGas(
      CONTRACT_ADDR,
      Drip.fromGDrip(10) //transaction gas maximum
    )
    .sendTransaction({ from: account, value: Drip.fromCFX(1) }) //transaction sponsorship fund (1000x maximum)
    .executed();
  console.log("Gas Sponsor:", receipt);

  receipt = await contract
    .setSponsorForCollateral(CONTRACT_ADDR) //contract address
    .sendTransaction({ from: account, value: Drip.fromCFX(5) }) //collateral sponsor fund
    .executed();
  console.log("Collateral Sponsor:", receipt);
}

main().catch(e => console.error(e));
