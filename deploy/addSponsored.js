const { Conflux, Drip } = require("js-conflux-sdk");
const format = require("js-conflux-sdk/src/util/format");

require("dotenv").config();

async function main() {
  const cfx = new Conflux({
    url: process.env.ENDPOINT
    // logger: console,
  });

  const PRIVATE_KEY = format.privateKey(process.env[process.argv[2]]);
  const CONTRACT_ADDR = format.address(process.argv[3]);
  const ADD_ADDR = format.address(process.argv[4]);

  // ================================ Account =================================
  const account = cfx.wallet.addPrivateKey(PRIVATE_KEY); // create account instance
  console.log("Admin Address:", account.address); //sponsor account

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.InternalContract("SponsorWhitelistControl");

  let receipt = await contract
    .addPrivilegeByAdmin(CONTRACT_ADDR, [ADD_ADDR])
    .sendTransaction({ from: account }) //transaction sponsorship fund (1000x maximum)
    .executed();
  console.log("Added Sponsored:", receipt);
}

main().catch(e => console.error(e));
