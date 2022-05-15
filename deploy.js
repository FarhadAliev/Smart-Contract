const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFile = require('./compile');
const interface = compiledFile.abi;
const bytecode = compiledFile.evm.bytecode.object;

let provider = new HDWalletProvider({
    mnemonic: {
        phrase: "turtle awful island trial shaft clap street venue fence aspect favorite vote"
    },
    providerOrUrl:"https://rinkeby.infura.io/v3/703a958d45a24d3f95faac6bdff17337",
    network_id: 4, // Rinkeby's network ID
    gas: 6712390, // Varies
    gasPrice: 10000000000, // See https://rinkeby.etherscan.io/blocks
});

const web3 = new Web3(provider);

const deploy = async (web3,interface,bytecode)=>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account',accounts[0]);
    const result = await new web3.eth.Contract(interface)
        .deploy({data:bytecode,arguments:['Hello']})
        .send({from:accounts[0]});
    console.log('Contract deployed to',result.options.address);
    provider.engine.stop();
};

deploy(web3,interface,bytecode);


