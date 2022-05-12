import ether from "ethers"

declare global {
   interface Window {
     ethereum: any
   }
 }

export default class etherController {
   async connectWallet() {
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
         
      } catch (error) {
         console.log(error);
      }
   }
}