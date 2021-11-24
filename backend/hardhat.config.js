/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-web3");
 require("@nomiclabs/hardhat-etherscan");
 require("@nomiclabs/hardhat-ethers");
 require('dotenv').config();
 require("./tasks/hellotask")

 const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL;
 const PRIVATE_KEY = process.env.PRIVATE_KEY;
 const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
  defaultNetwork: "kovan",
  networks: {
    hardhat: {
    },
    kovan: {
      url: KOVAN_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
