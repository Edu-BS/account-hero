// // SPDX-License-Identifier: MIT
pragma solidity  ^0.6.6;

contract Expense {
    address public owner;
    
    mapping(address => uint) public balances;

    constructor() public {
        owner = msg.sender;
    }
}

contract AccountHero {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }



}