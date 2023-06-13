// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract StorageAndMemory {
    uint256[] storageArray; // storage variable
    function addValue(uint256 value) public {
        storageArray.push(value); // modify state variable
    }
    function getValue(uint256 index) public view returns (uint256) {
        return storageArray[index]; // read state variable
    }
    function sumValues(uint256[] memory values) public pure returns (uint256) {
        uint256 sum = 0;
        for (uint256 i = 0; i < values.length; i++) {
            sum += values[i]; // modify memory variable
        }
        return sum;
    }
}
