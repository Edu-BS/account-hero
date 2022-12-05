import { ethers } from "hardhat"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { AccountHero } from "../typechain-types"
import "../hardhat.config"

const deployAccountHero: DeployFunction = async function ({ getNamedAccounts, deployments }) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    // const accountHero: AccountHero = await ethers.getContract("AccountHero")

    const accountHero = await deploy("AccountHero", {
        from: deployer,
        args: [],
        log: true,
    })
}

export default deployAccountHero
deployAccountHero.tags = ["all", "accountHero"]

