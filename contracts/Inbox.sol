// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Inbox {
    string public message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    /**Getters functions */
    function getMessage() public view returns (string memory) {
        return message;
    }
}
