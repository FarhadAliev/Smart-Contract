const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();
module.exports= new HDWalletProvider({
    mnemonic: {
        phrase: process.env.MNEMONIC
    },
    providerOrUrl:process.env.PROVIDER_URL,
    network_id: 4,
    gas: 6712390,
    gasPrice: 10000000000
});