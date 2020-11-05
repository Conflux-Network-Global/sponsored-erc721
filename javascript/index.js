const { Conflux } = require("js-conflux-sdk");
require("dotenv").config();
const abi = require("./abi.json");

class NFT {
  constructor(url, address) {
    this.cfx = new Conflux({ url });
    this.account = this.cfx.wallet.addPrivateKey(process.env.PRIVATE_KEY);
    this.contract = this.cfx.Contract({ abi, address });
  }

  async mint(address, id) {
    return this.contract
      .safeMint(address, id)
      .sendTransaction({ from: this.account })
      .executed();
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
