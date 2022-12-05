import "@typechain/hardhat"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-ethers"
import "hardhat-gas-reporter"
import "dotenv/config"
import "solidity-coverage"
import "hardhat-deploy"
import "solidity-coverage"
import { HardhatUserConfig } from "hardhat/config"

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.9",
            },
            {
                version: "0.6.9",
            },
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0,
            5: 0,
            1: 0,
        },
    },
    mocha: {
        timeout: 200000, // 200 seconds max for running tests
    },
}

export default config
