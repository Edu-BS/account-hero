import { ethers } from "ethers"

const AccountHeroAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract Fraction",
        "name": "fractionAddress",
        "type": "address"
      }
    ],
    "name": "NewFraction",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "fractionAddress",
        "type": "address"
      }
    ],
    "name": "NewFractionAddress",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_debtor",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_debt",
        "type": "uint256"
      }
    ],
    "name": "addFraction",
    "outputs": [
      {
        "internalType": "contract Fraction",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "creditors",
    "outputs": [
      {
        "internalType": "contract Fraction",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "debtors",
    "outputs": [
      {
        "internalType": "contract Fraction",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fund",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCredits",
    "outputs": [
      {
        "internalType": "contract Fraction[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDebts",
    "outputs": [
      {
        "internalType": "contract Fraction[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_fraction",
        "type": "address"
      }
    ],
    "name": "getFractionDebt",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_fraction",
        "type": "address"
      }
    ],
    "name": "getFractionDebtor",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_fraction",
        "type": "address"
      }
    ],
    "name": "getFractionIsPaid",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_fraction",
        "type": "address"
      }
    ],
    "name": "payFraction",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]
export default class EtherController {

  static async getInstance() {
    try {
      const accounts = await this.connectWallet()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      const accountHeroContractAddress = "0x1d493B807363803A1d37e9f18400f3dF4Aa3CBa4"
      const accountHeroContract = new ethers.Contract(accountHeroContractAddress, AccountHeroAbi, this.provider)
      const accountHeroContractSigned = accountHeroContract.connect(this.wallet)

      return new EtherController({
        accounts, signer, provider, accountHeroContractAddress, accountHeroContract, accountHeroContractSigned
      })
    } catch (error) {
      console.log(error);
    }
  }

  constructor(async_params) {
    if (typeof async_params === 'undefined') {
      throw new Error("EtherController: you need to initialize the controller with init()");
    }
    this.accounts = async_params.accounts;
    this.provider = async_params.provider;
    this.address = this.accounts[0]
    this.signer = async_params.signer;
    this.accountHeroContractAddress = async_params.accountHeroContractAddress;
    this.accountHeroContract = async_params.accountHeroContract;
    this.accountHeroContractSigned = async_params.accountHeroContractSigned;

    console.log("accounts ->", this.accounts);
    console.log("provider ->", this.provider);
    console.log("signer ->", this.signer);
    console.log("accountHeroContract ->", this.accountHeroContract);
    console.log("accountHeroContractSigned ->", this.accountHeroContractSigned);
  }

  async getSigner() {
    let signer = this.provider.getSigner()
    console.log("Signer -> ", signer);
    return signer
  }

  async getAccountHeroContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accountHeroContract = new ethers.Contract(this.accountHeroContractAddress, AccountHeroAbi, provider)
    return accountHeroContract
  }

  async getAccountHeroContractSigned() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    console.log(this.accountHeroContractAddress);
    const accountHeroContract = new ethers.Contract(this.accountHeroContractAddress, AccountHeroAbi, provider)

    const accountHeroContractSigned = accountHeroContract.connect(signer)
    return accountHeroContractSigned
  }

  static async connectWallet() {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Se necesita la aplicación MetaMask!");
        return;
      }
      let accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts;
    } catch (error) {
      if (error.code === 4001) {
        alert("Es necesario que permitas vincules su wallet");
      }
    }
  }

  async getBalance(address) {
    try {
      let balance = await this.provider.getBalance(address)
      return balance
    } catch (error) {
      console.log(error);
    }
  }

  async payTo(address, amount) {
    try {
      const tx = {
        to: address,
        value: ethers.utils.parseEther(amount),
      }
      const txHash = await this.wallet.sendTransaction(tx)
      console.log(txHash);
      return txHash
    } catch (error) {
      console.log(error);
    }
  }

  async createFraction(debtor, debt) {
    try {
      const accountHeroContractSigned = await this.getAccountHeroContractSigned()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      
      const txFraction = await accountHeroContractSigned.addFraction(debtor, ethers.utils.parseEther(debt.toString()))
      let txReceipt = await provider.getTransactionReceipt(txFraction.hash)

      const fractionAddress = ethers.utils.defaultAbiCoder.decode(["address"], txReceipt.logs[0].data)

      return fractionAddress
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async getFractionDebt(fractionAddress) {
    const accountHeroContract = this.getAccountHeroContract()
    const fractionDebt = await accountHeroContract.getFractionDebt(fractionAddress)
    return ethers.utils.parseEther(fractionDebt)
  }

  async getFractionDebtor(fractionAddress) {
    const accountHeroContract = await this.getAccountHeroContract()
    const debtor = await accountHeroContract.getFractionDebtor(fractionAddress)
    console.log("fractionDebtor -> ", debtor);
    return debtor
  }

}