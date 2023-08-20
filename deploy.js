// This script will deploy contract on Sepolia network
// - you can deploy it on any other test network using different by changing the rpc URL

// Import and configure dotenv
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compile.js');

const interface = abi;
const bytecode = evm.bytecode.object;
const INITIAL_STRING = 'Hi there!';

const provider = new HDWalletProvider(
    // By providing mneumonic, we are able to unlock and generate the public key, private key and address of our account in Metamask
    process.env.SEED,
    process.env.SEPOLIA_RPC_URL
);

/*
 below line of code is what creates an instance of web3 and tells that instance to 
 attempt to connect to this local test network that we are hosting on our machine solely for the purpose of running these tests in the future
 */
const web3 = new Web3(provider);

const deploy = async () => {
    try {
        // Get a list of all accounts from Ganache
        const accounts = await web3.eth.getAccounts();
        // console.log(accounts);
        console.log('Attempting to deploy from account:', accounts[0]);

        // Use one of those accounts to deploy the contract
        const result = await new web3.eth.Contract((interface))
            .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
            .send({ from: accounts[0], gas: '1000000' });

        console.log('Contract deployed to address: ', result.options.address);
    } catch (error) {
        console.error("Error during contract deployment:", error);
    }
    provider.engine.stop(); // to prevent a hanging deployment
};
deploy();

/**Running the deploy script 
 * node deploy.js
 * 
*/