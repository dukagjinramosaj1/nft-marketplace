// require('dotenv').config()
var HDWalletProvider = require("@truffle/hdwallet-provider")

var mnemonic="stem degree remind flip merit student dizzy cigar share kitchen travel phrase"

module.exports = {
  contracts_build_directory: './client/src/contracts',

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    // matic_test: {
    //   provider: () =>
    //     new HDWalletProvider({
    //       mnemonic,
    //       providerOrUrl:
    //       'https://polygon-mumbai.g.alchemy.com/v2/nqb9TsPLh6v7sDiAHQ_eZeWIe7AG-y7J',
    //       chainId: 80001,
    //     }),
    //   network_id: 80001, // Ropsten's id
    // },
  },
  
  compilers: {
    solc: {
      version: "^0.8.7",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  }
};
