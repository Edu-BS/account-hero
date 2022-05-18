var AccountHero = artifacts.require("./AccountHero.sol");

module.exports = async function(deployer) {
  deployer.deploy(AccountHero);
  // deployer.deploy(Fraction("0xD2AEf5675951df7D53DC595c7971b446a66394BF", 1));
};
