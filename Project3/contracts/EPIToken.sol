// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract EPITokenMint {

    string public tokenName;
    string public tokenSymbol;
    uint public totalSupply;
    address public owner;

    mapping(address => uint) public balance;

    constructor(string memory _tokenName, string memory symbol) {
        tokenName = _tokenName;
        tokenSymbol = symbol;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action!");
        _;
    }

    function mint(uint _amount) public onlyOwner {
        totalSupply += _amount;
        balance[msg.sender] += _amount;
    }

    function burn(uint256 _amount) public {
        totalSupply -= _amount;
        balance[msg.sender] -= _amount;
    }

    function transfer(address _recipient, uint _amount) public {
        require(msg.sender != _recipient,"You can not transfer token(s) to yourself!");
        assert(balance[msg.sender] >= _amount);
        balance[msg.sender] -= _amount;
        balance[_recipient] += _amount;
    }
}
