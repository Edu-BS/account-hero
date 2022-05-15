const AccountHero = artifacts.require("AccountHero");

contract("AccountHero", accounts => {
    it("Test 1", () =>
        AccountHero.deployed()
            .then(instance => {
                instance.addFraction("0xD2AEf5675951df7D53DC595c7971b446a66394BF", 1)
                instance.payFraction(0, {from: accounts[0], value: 1})
            })
    )
})