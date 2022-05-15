// SPDX-License-Identifier: MIT
pragma solidity <0.7.0;

// pragma solidity >=0.4.21 <0.6.0;

// import "./Fraction.sol";

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

    mapping(address => Fraction[]) public creditors;
    mapping(address => Fraction[]) public debtors;

    constructor() public {
        owner = msg.sender;
        Fraction f = new Fraction(
            msg.sender,
            address(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2),
            1
        );
        creditors[msg.sender].push(f);
        debtors[address(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2)].push(f);
        // Fraction f = new Fraction(msg.sender, 1);
        // fractions.push(f);
    }

    function addFraction(address _debtor, uint256 _debt)
        public
        returns (Fraction newFraction)
    {
        Fraction fraction = new Fraction(msg.sender, _debtor, _debt);

        creditors[msg.sender].push(fraction);
        debtors[_debtor].push(fraction);

        return fraction;
    }

    function fund() public payable {}

    function payFraction(address _fraction) public payable {
        Fraction fraction = Fraction(_fraction);

        require(msg.value >= fraction.debt(), "Not enough money");
        require(!fraction.isPaid(), "Fraction already paid");
        fraction.owner().transfer(msg.value);
        fraction.setPaid();
    }

    function getFraction(address _fraction) public returns (bytes memory) {
        Fraction fraction = Fraction(_fraction);
        // bytes memory fractionString = abi.encodePacked(fraction);
        return abi.encodePacked(fraction);
        // return fraction;
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
}
