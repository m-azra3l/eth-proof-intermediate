// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Contract with Global Functions
contract Challenge3 {

    // Function to get the address of the sender of the current message (transaction)
    function getMessageSender() public view returns (address) {
        return msg.sender;
    }

    // Function to get the value (in wei) sent along with the current message (transaction)
    function getMessageValue() public payable returns (uint) {
        return msg.value;
    }

    // Function to get the data of the current message (transaction)
    function getMessageData() public pure returns (bytes calldata) {
        return msg.data;
    }

    // Function to get the amount of gas remaining
    function getMessageGas() public view returns (uint) {
        return gasleft();
    }
}
