import { ethers } from "ethers"

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
         const txHash = await wallet.sendTransaction(tx)
         console.log(txHash);
      } catch (error) {
         console.log(error);
      }
   }

}