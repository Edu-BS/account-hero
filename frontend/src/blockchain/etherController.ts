import { ethers } from "ethers";

declare global {
   interface Window {
      ethereum: any
   }
}

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

   static async getBalance(address: string) {
      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum)
         const balance = await provider.getBalance(address)
         return ethers.utils.formatEther(balance)
      } catch (error) {

      }
   }

}