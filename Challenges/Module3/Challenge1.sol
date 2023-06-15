// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract AcceptEther {

    // Payable address can receive Ether
    address payable public owner;

    // Payable constructor can receive Ether
    constructor() payable {
        // Set the owner of the contract to the address that deployed the contract
        owner = payable(msg.sender);
    }

    // Fallback function to receive Ether
    receive() external payable {}

    // Fallback function to handle any unrecognized calls
    fallback() external {
        // Revert with an error message if the function signature is not recognized
        revert("Unrecognized function call");
    }
}