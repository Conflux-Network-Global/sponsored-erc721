const { Conflux } = require("js-conflux-sdk");
const format = require('js-conflux-sdk/src/util/format');

require("dotenv").config();
const { abi, bytecode } = require("../contract/build/contracts/NFTBase.json");

async function main() {
  const cfx = new Conflux({
    url: process.env.ENDPOINT
    // logger: console,
  });
  const PRIVATE_KEY = format.privateKey(process.env[process.argv[2]]);

  // ================================ Account =================================
  const account = cfx.wallet.addPrivateKey(PRIVATE_KEY); // create account instance
  console.log("Sender Address:", account.address); // 0x1bd9e9be525ab967e633bcdaeac8bd5723ed4d6b

  // ================================ Contract ================================
  // create contract instance
  const contract = cfx.Contract({
    abi,
    bytecode
  });

  // estimate deploy contract gas use
  const estimate = await contract.constructor().estimateGasAndCollateral();
  console.log(JSON.stringify(estimate)); // {"gasUsed":"175050","storageCollateralized":"64"}

  // deploy the contract, and get `contractCreated`
  const receipt = await contract
    .constructor()
    .sendTransaction({ from: account })
    .executed();
  console.log(receipt);
}

main().catch(e => console.error(e));
