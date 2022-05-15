let accounts = await web3.eth.getAccounts()
let AccountHero = await AccountHero.deployed()
AccountHero.addFraction(accounts[0], 1, {from: accounts[1]})
AccountHero.payFraction(0, { value: "1000000000000000000"})