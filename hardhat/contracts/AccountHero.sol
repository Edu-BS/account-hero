// SPDX-License-Identifier: MIT
pragma solidity <0.7.0;

contract Fraction {
    address payable public owner;
    address public debtor;
    uint256 public debt;
    bool public isPaid;

    constructor(
        address payable _owner,
        address _debtor,
        uint256 _debt
    ) public {
        owner = _owner;
        debtor = _debtor;
        debt = _debt; // wei
        isPaid = false;
    }

    function setPaid() public {
        isPaid = true;
    }
}

contract AccountHero {
    address public owner;   
    
    event NewFraction(Fraction fractionAddress);

    mapping(address => Fraction[]) public creditors;
    mapping(address => Fraction[]) public debtors;

    constructor() public {
        owner = msg.sender;
    }

    function addFraction(address _debtor, uint256 _debt)
        public
        returns (Fraction)
    {
        Fraction fraction = new Fraction(msg.sender, _debtor, _debt);

        creditors[msg.sender].push(fraction);
        debtors[_debtor].push(fraction);

        emit NewFraction(fraction);

        return fraction;
    }

    function fund() public payable {}

    function payFraction(address _fraction) public payable {
        Fraction fraction = Fraction(_fraction);

        require(msg.value >= fraction.debt(), "Not enough money");
        require(!fraction.isPaid(), "Fraction already paid");
        fraction.owner().transfer(msg.value); // Posible reentrancy vulnerability
        fraction.setPaid();
    }

    function getCredits() public view returns (Fraction[] memory) {
        return creditors[msg.sender];
    }

    function getDebts() public view returns (Fraction[] memory) {
        return debtors[msg.sender];
    }

    function getFractionDebt(address _fraction) public view returns (uint256) {
        Fraction fraction = Fraction(_fraction);
        return fraction.debt();
    }

    function getFractionIsPaid(address _fraction) public view returns (bool) {
        Fraction fraction = Fraction(_fraction);
        return fraction.isPaid();
    }

    function getFractionDebtor(address _fraction) public view returns (address) {
        Fraction fraction = Fraction(_fraction);
        return fraction.debtor();
    }
}
