// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

//A smart contract that demonstrates the use of view, pure, and payable functions.
contract FirstChallenge {

    uint256 public myUint; // state variable

    address public owner; // state variable

    //Initializes the contract setting the deployer as the initial owner and assign value to myUint
    constructor() {
        owner = msg.sender;
        myUint = 8;
    }

    // View function: Does not modify the state
    function viewFunction() public view returns (uint256) {
        return myUint;
    }

    // Pure function: Does not read or modify the state
    function pureFunction(uint256 x) public pure returns (uint256) {
        return x * 2;
    }

    // Payable function: Accepts and handles Ether
    function payableFunction() public payable {
        // Perform some operations with the received Ether
        // For example, let's increment a counter by the amount of Ether received
        uint256 etherReceived = msg.value;
        // Perform your desired operation here, such as updating a state variable or emitting an event
        // In this example, we'll emit an event to log the received Ether
        emit EtherReceived(msg.sender, etherReceived);
    }

    // Event to log the received Ether
    event EtherReceived(address indexed sender, uint256 amount);
}

// Derived contract that inherits from FirstChallenge
contract DerivedContract is FirstChallenge {

    // Access the view function from the base contract
    function derivedViewFunction() public view returns (uint256) {
        return viewFunction();
    }

    // Access the pure function from the base contract
    function derivedPureFunction(uint256 x) public pure returns (uint256) {
        return pureFunction(x);
    }

    // Access the payable function from the base contract
    function derivedPayableFunction() public payable {
        payableFunction();
    }
}
