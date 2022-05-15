import { ethers } from "ethers"

const AccountHeroAbi = [
   
   {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "signature": "constructor"
    },
    {
      "constant": true,
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
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xf39cada8"
    },
    {
      "constant": true,
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
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xb58a7fc6"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x8da5cb5b"
    },
    {
      "constant": false,
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
          "name": "newFraction",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x65a494e9"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "fund",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0xb60d4288"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_fraction",
          "type": "address"
        }
      ],
      "name": "payFraction",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0x221c85ea"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_fraction",
          "type": "address"
        }
      ],
      "name": "getFraction",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x9bb61285"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getCredits",
      "outputs": [
        {
          "internalType": "contract Fraction[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x823a71af"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getDebts",
      "outputs": [
        {
          "internalType": "contract Fraction[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xc836ef2e"
    },
    {
      "constant": true,
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
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x68d673f5"
    },
    {
      "constant": true,
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
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xd4c645c2"
    }
  
]
const FractionAbi = [
   "function pay() public payable",
   "function getIsPaid() public view returns (bool)"
]

export default class EtherController {

   static async connectWallet() {
      try {
         const { ethereum } = window;
         if (!ethereum) {
            alert("Get MetaMask!");
            return;
         }
         const accounts = await ethereum.request({
            method: "eth_requestAccounts",
         });
         console.log("Connected", accounts[0]);
         return accounts[0];
      } catch (error) {
         console.log(error);
      }
   }

   static async getBalance(address) {
      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum)
         console.log(provider);
         const balance = await provider.getBalance(address)
         console.log(balance);
         return ethers.utils.formatEther(balance)
      } catch (error) {
         console.log(error);
      }
   }

   static async payTo(address, amount) {
      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum)
         const wallet = provider.getSigner()
         const tx = {
            to: address,
            value: ethers.utils.parseEther(amount),
         }
         console.log("tx -> ", tx);
         const txHash = await wallet.sendTransaction(tx)
         console.log(txHash);
      } catch (error) {
         console.log(error);
      }
   }

   static async fund() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const wallet = provider.getSigner()
      const accountHeroContract = new ethers.Contract("0x4ab652A5C2dd5C759E262D18E06eA99b70A95c2c", AccountHeroAbi, provider)

      const contractWithSigner = accountHeroContract.connect(wallet)
      const tx = contractWithSigner.fund({ value: ethers.utils.parseEther("1") })
      console.log("tx -> ", tx);
   }

   static async getTransaction(txHash) {
      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum)
         const transaction = await provider.getTransaction(txHash)
         // console.log(ethers.utils.formatEther(transaction.value));
         return transaction;
      } catch (error) {
         console.log(error);
      }
   }

   static async getCredits() {
      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum)
         const wallet = provider.getSigner()
         const accountHeroContract = new ethers.Contract("0xfeEd70F5feFc3eD2828dFd77705aD2B4d1BCa6f6", AccountHeroAbi, provider)
         console.log("Owner", await accountHeroContract.owner());
         const contractWithSigner = accountHeroContract.connect(wallet)
         let tx = await contractWithSigner.getCredits({from: "0xD2AEf5675951df7D53DC595c7971b446a66394BF"})
         console.log("tx => ", tx);
         return tx
      } catch (error) {
         console.log(error);
      }
   }

   static async getFractionDebt(fractionAddress) {
      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum)
         const wallet = provider.getSigner()
         const accountHeroContract = new ethers.Contract("0x70CaEd482c9df0f2271Ec9b2173e201778dE50a5", AccountHeroAbi, provider)
         // const contractWithSigner = accountHeroContract.connect(wallet)
         const tx = await accountHeroContract.getFractionDebt(fractionAddress)
         console.log("tx -> ", tx);
         return tx
      } catch (error) {
         console.log(error);
      }
   }

   static async createFraction(debtor, debt) {
      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum)
         const wallet = provider.getSigner()
         const accountHeroContract = new ethers.Contract("0x70CaEd482c9df0f2271Ec9b2173e201778dE50a5", AccountHeroAbi, provider)

         const contractWithSigner = accountHeroContract.connect(wallet)
         const tx = await contractWithSigner.addFraction(debtor, ethers.utils.parseEther(debt))
         console.log("tx -> ", tx);
         return tx
      } catch (error) {
         console.log(error);
      }
   }

   static async payFraction(fractionId, amount) {
      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum)
         const wallet = provider.getSigner()
         const accountHeroContract = new ethers.Contract("0x32c2375DD7cB8E5E1166a8100047fDfA93099E00", FractionAbi, provider)
         console.log("accountHeroContract -> ", accountHeroContract);
         // accountHeroContract.addFraction("0xC69c524E62E9A313530381D47CB3F892763f1E3C", ethers.utils.parseEther("1"))
         const contractWithSigner = accountHeroContract.connect(wallet)

         const tx = contractWithSigner.pay({ value: ethers.utils.parseEther(amount) })
         // const tx = {
         //    to: "0xD2AEf5675951df7D53DC595c7971b446a66394BF",
         //    value: ethers.utils.parseEther(amount),
         // }
         console.log("tx -> ", tx);
         const txHash = await wallet.sendTransaction(tx)
      } catch (error) {
         console.log(error);
      }
   }

}