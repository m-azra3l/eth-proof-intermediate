// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;


contract ViewPureContract {

    // A pure function that takes two uints and returns their sum
    function add(uint a, uint b) public pure returns (uint) {
        return a + b;
    }

    // A pure function that takes two uints and returns their product
    function multiply(uint a, uint b) public pure returns (uint) {
        return a * b;
    }

    // A view function that takes two uints, calls the add and multiply functions,
    // and returns their sum
    function getTotal(uint a, uint b) public view returns (uint) {
        uint sum = add(a, b);
        uint product = multiply(a, b);
        return sum + product;
    }

}
