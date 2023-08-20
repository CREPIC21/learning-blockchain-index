/**This script will take our raw contract code and spit out both the ABI and the bytecode for the contract. */

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
module.exports = output.contracts['Inbox.sol'].Inbox;
// console.log(output.contracts['Inbox.sol'].Inbox.evm);
// console.log(output.contracts['Inbox.sol'].Inbox);


/**Running the compile script 
 * node compile.js
 * 
*/
