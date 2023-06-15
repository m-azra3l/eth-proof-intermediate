// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract EPITokenMint {

    // Declare public variables
    string public tokenName;
    string public tokenSymbol;
    uint256 public totalSupply;
    address public owner;

    // Create a mapping of addresses to balances
    mapping(address => uint256) public balance;

    // Constructor function that sets the token name, symbol, and owner
    constructor() {
        tokenName = "Eth Proof Intermediate Module 3 Token";
        tokenSymbol = "EIM";
        owner = msg.sender;
    }

    // Modifier that only allows the owner to execute a function
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action!");
        _;
    }

    // Function that allows the owner to mint new tokens
    function mint(uint256 _amount) public onlyOwner {
        totalSupply += _amount;
        balance[msg.sender] += _amount;
    }

    // Function that allows anyone to burn their own tokens
    function burn(uint256 _amount) public {
        totalSupply -= _amount;
        balance[msg.sender] -= _amount;
    }

    // Function that allows anyone to transfer tokens to another address
    function transfer(address _recipient, uint256 _amount) public {
        require(msg.sender != _recipient,"You can not transfer token(s) to yourself!");
        require(balance[msg.sender] >= _amount, "Transfer amount exceeds balance");
        balance[msg.sender] -= _amount;
        balance[_recipient] += _amount;
    }
}
