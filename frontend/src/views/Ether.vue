<template>
   <div class="home">
      <!-- <img alt="Vue logo" src="../public/" /> -->
      <br/>
      <button class="primaryButton" @click="connectWallet">Connect Wallet</button>
      <button class="primaryButton" @click="getBalance">Get balance</button>
      <button class="primaryButton" @click="payTo">Pay</button>
      <button class="primaryButton" @click="getTransaction">Get transaction</button>
      <p>Balance: {{balance}}</p>
      <p>Your account is: {{currentAccount}}</p>
   </div>
</template>

<script>
// import EtherController from '../../dist/etherController'
import EtherController from '../controllers/etherController'

export default {
   name: "Home",
   data() {
      return {
         balance: 0,
         ether: {
            account: null,
         },
         currentAccount: "",
         contractAddress:
            "set this to your contract address, if you have more than one contract create more specific variables(greeterAddress or votingAddress)",
      };
   },
   async mounted() {
      // this.checkIfWalletIsConnected();
      this.currentAccount = await EtherController.connectWallet()
   },
   methods: {
      async connectWallet() {
         this.currentAccount = await EtherController.connectWallet()
      },
      async getBalance() {
         this.balance = await EtherController.getBalance(this.currentAccount)
      },
      async payTo() {
         await EtherController.payTo("0xC69c524E62E9A313530381D47CB3F892763f1E3C", "1")
      },
      async getTransaction() {
         await EtherController.getTransaction("0x36c1163320387f5b7fe3da97b9d40377376990e97b39b90ad29fd027a12e1025")
            .then((result) => {
               console.log(result)
            })
      },
   },
   //    checkIfWalletIsConnected: async function () {
   //       try {
   //          const { ethereum } = window;
   //          if (!ethereum) {
   //             alert("Make sure you have metamask!");
   //             return;
   //          } else {
   //             console.log("We have the ethereum object", ethereum);
   //          }
   //          const accounts = await ethereum.request({ method: "eth_accounts" });
   //          if (accounts.length !== 0) {
   //             const account = accounts[0];
   //             console.log("Found an authorized account:", account);
   //             this.currentAccount = account;
   //          } else {
   //             console.log("No authorized account found");
   //          }
   //       } catch (error) {
   //          console.log(error);
   //       }
   //    },
   //    connectWallet: async function () {
   //       try {
   //          const { ethereum } = window;
   //          if (!ethereum) {
   //             alert("Get MetaMask!");
   //             return;
   //          }
   //          const accounts = await ethereum.request({
   //             method: "eth_requestAccounts",
   //          });
   //          console.log("Connected", accounts[0]);
   //          this.currentAccount = accounts[0];
   //       } catch (error) {
   //          console.log(error);
   //       }
   //    },
   // },
};
</script>