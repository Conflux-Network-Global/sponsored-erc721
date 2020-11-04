const { Conflux } = require("js-conflux-sdk");
require("dotenv").config();
const abi = require("./abi.json");

const cfx = new Conflux({ url: process.env.ENDPOINT });
const contract = cfx.Contract({});

class NFT {
  constructor(endpoint, address) {
    this.cfx = new Conflux(endpoint);
    this.account = this.cfx.wallet.addPrivateKey(process.env.PRIVATE_KEY);
    this.contract = this.cfx.Contract({ abi, address });
  }

  async mint(id, address) {
    return this.contract.mint(address, id).executed();
  }

  async getAssets(userAddr) {
    const number = await this.contract.balanceOf(userAddr);
    const list = [];
    for (let i = 0; i < Number(number); i++) {
      const id = await this.contract.tokenOfOwnerByIndex(userAddr, i);
      list.push(id);
    }
    return list;
  }
}

module.exports = NFT;
