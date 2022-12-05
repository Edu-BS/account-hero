import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { deployments, ethers } from "hardhat"
import { AccountHero, Fraction } from "../../typechain-types"

describe("AccountHero SmartContract tests", function () {
    const PRICE = ethers.utils.parseEther("0.1")
    let accountHero: AccountHero, deployer: SignerWithAddress, account1: SignerWithAddress
    beforeEach(async () => {
        await deployments.fixture(["all", "accountHero"])
        accountHero = await ethers.getContract("AccountHero")
        const accounts = await ethers.getSigners()
        deployer = accounts[0]
        account1 = accounts[1]
    })

    it("adds fraction", async () => {
        const addFractionTx = await accountHero.addFraction(account1.address, PRICE)
        // console.log(addFractionTx)
        const addFractionTxReceipt = await addFractionTx.wait(1)
        // console.log(addFractionTxReceipt.events![0].args)

        const account1Debts = await accountHero.connect(account1).getDebts()
        const deployerCredits = await accountHero.connect(deployer).getCredits()

        assert.equal(account1Debts[0], deployerCredits[0])
    })

    describe("testPayFraction", () => {
        it("fails when the value is lower than debt", async () => {
            await accountHero.connect(deployer).addFraction(account1.address, PRICE)

            const addFractionTx = await accountHero
                .connect(deployer)
                .addFraction(account1.address, PRICE)
            const addFractionTxReceipt = await addFractionTx.wait(1)
            let fraction

            try {
                fraction = await addFractionTxReceipt.events![0].args!.fractionAddress
                // console.log(fraction)
            } catch (error) {
                console.log(error)
            }
            await expect(
                accountHero
                    .connect(account1)
                    .payFraction(fraction, { value: ethers.utils.parseEther("0.05") })
            ).to.be.revertedWith("Not enough money")
        })

        it("fails when the fraction is already paied", async () => {
            await accountHero.connect(deployer).addFraction(account1.address, PRICE)

            const addFractionTx = await accountHero
                .connect(deployer)
                .addFraction(account1.address, PRICE)
            const addFractionTxReceipt = await addFractionTx.wait(1)
            let fraction

            try {
                fraction = await addFractionTxReceipt.events![0].args!.fractionAddress
                await accountHero.connect(account1).payFraction(fraction, { value: PRICE })
            } catch (error) {
                console.log(error)
            }

            await expect(
                accountHero.connect(account1).payFraction(fraction, { value: PRICE })
            ).to.be.revertedWith("Fraction already paid")
        })

        it("change paid state to true when is paid",async () => {
            let fractionAddress
            
            await accountHero.connect(deployer).addFraction(account1.address, PRICE)
            const addFractionTx = await accountHero
                .connect(deployer)
                .addFraction(account1.address, PRICE)
            const addFractionTxReceipt = await addFractionTx.wait(1)

            try {
                fractionAddress = await addFractionTxReceipt.events![0].args!.fractionAddress
                await accountHero.connect(account1).payFraction(fractionAddress, { value: PRICE })
            } catch (error) {
                console.log(error)
            }
            const fraction: Fraction = await ethers.getContractAt("Fraction", fractionAddress)
            
            const isPaidBeforePay = await fraction.isPaid()
            await accountHero.connect(account1).payFraction(fractionAddress, {value: PRICE})
            const isPaidAfterPay = await fraction.isPaid()

            assert.isFalse(isPaidBeforePay)
            assert.isTrue(isPaidAfterPay)
        })
    })
})
