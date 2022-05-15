const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFile = require('./compile');
let provider = require('./provider');
require('dotenv').config();
const interface = compiledFile.abi;
const bytecode = compiledFile.evm.bytecode.object;
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


