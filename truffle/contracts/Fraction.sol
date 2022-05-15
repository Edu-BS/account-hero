// SPDX-License-Identifier: MIT
pragma solidity <0.7.0;

contract Fraction {
    address payable public owner;
    address public debtor;
    uint public debt;
    bool public isPaid;

    // event fractionPaid(address indexed _owner, address indexed _debtor, uint _debt);
    // event newFraction(address indexed _owner, address indexed _debtor, uint _debt, bool _isPaid);


    constructor(address payable _owner, address _debtor, uint _debt) public {
        owner = _owner;
        debtor = _debtor;
        debt = _debt;
        isPaid = false;
    }

    function getOwner() public view returns (address payable) {
        return owner;
    }

    function getDebt() public view returns (uint) {
        return debt;
    }

    function getIsPaid() public view returns (bool) {
        return isPaid;
    }

    function setPaid() public {
        isPaid = true;
    }

}