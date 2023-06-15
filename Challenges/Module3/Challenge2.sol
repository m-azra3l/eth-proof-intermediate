// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

// Abstract contract
abstract contract MyAbstractContract {
    function myAbstractFunction() virtual public returns (uint256);
}

// Interface
interface MyInterface {
    // This function returns a string
    function myInterfaceFunction() external returns (string memory);
}

// Contract that implements both the abstract contract and the interface
contract MyContract is MyAbstractContract, MyInterface {
    // Public state variables that can be accessed outside the contract
    uint256 public myNumber;
    string public myString;

    // Implementation of the abstract function from MyAbstractContract
    function myAbstractFunction() override public returns (uint256) {
        // Set the myNumber state variable to 42
        myNumber = 42;
        // Return the value of myNumber
        return myNumber;
    }

    // Implementation of the function from MyInterface
    function myInterfaceFunction() override external returns (string memory) {
        // Set the myString state variable to "Hello, world!"
        myString = "Hello, Metacrafters!";
        // Return the value of myString
        return myString;
    }
}