require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  contracts_build_directory: "./build/stagenet/truffle",
  networks: {
    telos: {
      network_id: 41,
      provider: () =>
        new HDWalletProvider(
        process.env.PRIVATE_KEY,
        "https://testnet.telos.net/evm"
      ),
      gas: 670000000,
      gasPrice: 2100000000000
    },
    stagenet: {
      network_id: 41,
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "http://testrpc.us.telos.net:7000/evm"
        ),
      gas: 6700000,
      gasPrice: 500000000000
    },
  },
  compilers: {
    solc: {
      version: "0.6.6",
      settings: {
        optimizer: {
          enabled: true,
          runs: 100
        }
      }
    }
  },
  db: {
    enabled: false
  }
};
