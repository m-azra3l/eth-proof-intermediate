// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

// Counter.sol
contract Counter {

    // Private variable to store the count
    uint256 private count; 

    // Event to notify when the count is increased
    event CountIncreased(address indexed user, uint256 newValue); 

    function getCount() public view returns (uint256) {
        // Returns the current count value
        return count; 
    }

    function increaseCount() public {
        // Increments the count by 1
        count++; 
        // Emits an event to notify about the count increase
        emit CountIncreased(msg.sender, count); 
    }
}

// Proxy.sol
contract Proxy {

    // Address of the current implementation contract
    address private currentImplementation; 
    // Address of the admin who can upgrade the implementation
    address private admin; 

    constructor(address _initialImplementation) {
        // Set the initial implementation contract
        currentImplementation = _initialImplementation; 
        // Set the admin address to the deployer of the proxy contract
        admin = msg.sender; 
    }

    fallback() external payable {
        // Fallback function to delegate calls to the current implementation contract
        _delegate(currentImplementation); 
    }

    function upgrade(address _newImplementation) public {
        // Only the admin can upgrade the implementation
        require(msg.sender == admin, "Only admin can upgrade"); 
        // Set the new implementation contract
        currentImplementation = _newImplementation; 
    }

    function _delegate(address implementation) private {
        // Delegate the call to the implementation contract
        (bool success, bytes memory data) = implementation.delegatecall(msg.data); 
        // Check if the delegatecall was successful; revert and provide an error message if not
        require(success, string(data)); 

        assembly {
            // Return the result of the delegatecall
            return(add(data, 0x20), mload(data)) 
        }
    }

    // The receive function allows the contract to receive Ether
    receive() external payable {}
}
