const { Web3 } = require('web3'); // portal to ethereum word
const ganache = require('ganache'); // hosts local test network giving us accounts to play with
const assert = require('assert'); // 
const { abi, evm } = require('../compile.js'); // abi and bytecode from our Inbox contract

/*
 below line of code is what creates an instance of web3 and tells that instance to 
 attempt to connect to this local test network that we are hosting on our machine solely for the purpose of running these tests in the future
 */
const web3 = new Web3(ganache.provider());

/* Promise example */
// beforeEach(() => {
//     // Get a list of all accounts from Ganache
//     web3.eth.getAccounts()
//         .then(fetchedAccounts => {
//             console.log(fetchedAccounts);
//         });

//     // Use one of those accounts to deploy the contract
// });

/* Async/await */
const interface = abi;
const bytecode = evm.bytecode.object;
let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';
// console.log(interface)
// console.log(bytecode)

// any logic that we place inside beforeEach() function will be executed before each IT statement inside of our describe() code
beforeEach(async () => {
    try {
        // Get a list of all accounts from Ganache
        accounts = await web3.eth.getAccounts();
        // console.log(accounts);

        // Use one of those accounts to deploy the contract
        inbox = await new web3.eth.Contract((interface))
            .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
            .send({ from: accounts[0], gas: '1000000' });
    } catch (error) {
        console.error("Error during contract deployment:", error);
    }
});

describe('Inbox', () => {
    // Test to check if contract was deployed
    it('Deploys a contract', () => {
        // If inbox options address is null or undefined, then this test will fail
        assert.ok(inbox.options.address);
        console.log("Inbox contract address is: %s", inbox.options.address);
        // console.log(inbox);
    });

    // Test to check that when we deploy our in-box contract, we get some initial value for our message passed in
    it('Checks if initial value is sent when deploying a contract', async () => {
        /* contract has a property called methods which is an object that contains all of the different public functions that exist in our contract
        - getMessage() -> first set of parentheses as being some way to customize the list of arguments that's being passed to the function
        - call() -> second set is going to customize exactly how that function gets called
        */
        const initialValue = await inbox.methods.getMessage().call(); // call() is read only instant operation
        assert.equal(initialValue, INITIAL_STRING);
    });

    // Test to check if the message was set to new message
    it('Checks the new value of the message set by setMessage function', async () => {
        newSetMessage = 'New Message!!!';
        const response = await inbox.methods.setMessage(newSetMessage).send({ from: accounts[0] }); // when we send, that means we want to make a change to the data that exists inside of our contract, we also have to specify who is paying the gas to actually modify some data inside of our contract
        console.log('Hello response: %s', response);
        const newMessage = await inbox.methods.getMessage().call();
        console.log('Hello new message: %s', newMessage);
        assert.equal(newSetMessage, newMessage);
    })
});

// /**Running the tests
//  * npm run test -> 'test' script from package.json
//  */


