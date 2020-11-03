const { Conflux } = require("js-conflux-sdk");
require("dotenv").config();

const cfx = new Conflux(process.env.ENDPOINT)
const account = cfx.wallet.addPrivateKey(process.env.PRIVATE_KEY)
const contract = cfx.Contract

const mint = async (id, address) => {

};

const getAssets = async address => {};

module.exports = {
  mint,
  getAssets
};
