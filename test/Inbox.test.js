const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
require('dotenv').config();
const provider = process.env.LOCAL_URI
const web3 = new Web3(provider);
const compiledFile = require('../compile');

const interface = compiledFile.abi;
const bytecode = compiledFile.evm.bytecode.object;
let acconts;
let inbox;
let initial_string = 'Hello';
beforeEach(  async () => {
    acconts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data:bytecode,arguments:[initial_string]})
        .send({from:acconts[0],gas:'1000000'});
})

describe('Inbox ',()=>{
    it('should deploys contracts',  ()=>{
        assert.ok(inbox.options.address);
    });
    it('should a default message',async ()=> {
        const message = await inbox.methods.message().call();
        assert.equal(message,initial_string)
    });
    it('should change message',  async () => {
        const newMessage = 'Bye'
        await inbox.methods.setMessage(newMessage).send({from: acconts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,newMessage)
    });
});