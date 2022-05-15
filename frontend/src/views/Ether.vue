<template>
   <div class="home">
      <!-- <img alt="Vue logo" src="../public/" /> -->
      <br/>
      <button class="btn btn-primary col-auto" @click="connectWallet">Connect Wallet</button>
      <br>
      <button class="btn btn-primary col-auto" @click="getBalance">Get balance</button>
      <br>
      <button class="btn btn-primary col-auto" @click="payTo">Pay</button>
      <br>
      <input v-model="transaction_input" type="text">
      <button class="btn btn-primary" @click="getTransaction">Get transaction</button>
      <br>
      <button class="btn btn-primary" @click="createFraction">Create fraction</button>
      <br>
      <label for="">Fraction address</label>
      <input v-model="fractionAddress_input" type="text">
      <button class="btn btn-primary" @click="getFractionDebt">Get fraction debt</button>
      <br>
      <button class="btn btn-primary" @click="fund">Fund</button>
      <br>
      <button class="btn btn-primary" @click="getCredits">Get credits</button>
      <br>
      <button class="btn btn-primary" @click="payFraction">Pay fraction</button>
      <p>Balance: {{balance}}</p>
      <p>Your account is: {{currentAccount}}</p>
      <ul>
         <li v-for="fraction in fractions" :key="fraction.hash">
            {{fraction}}
         </li>
      </ul>
   </div>
</template>

<script>
// import EtherController from '../../dist/etherController'
import EtherController from "../controllers/etherController";

export default {
  name: "Home",
  data() {
    return {
      fractionAddress_input: "",
      transaction_input: "",
      fractions: [],
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
    //  this.currentAccount = await EtherController.connectWallet();
  },
  methods: {
    async connectWallet() {
      this.currentAccount = await EtherController.connectWallet();
    },
    async getBalance() {
      this.balance = await EtherController.getBalance(this.currentAccount);
    },
    async payTo() {
      await EtherController.payTo(
        // "0xC69c524E62E9A313530381D47CB3F892763f1E3C",
        "0x4648D23cEad2FD5b527084a8A735A89c2a54c6ef",
        "1"
      );
    },
    async fund() {
      await EtherController.fund(
        "0x4648D23cEad2FD5b527084a8A735A89c2a54c6ef",
        "1"
      );
    },
    async getTransaction() {
      await EtherController.getTransaction(
        this.transaction_input
        //   "0x36c1163320387f5b7fe3da97b9d40377376990e97b39b90ad29fd027a12e1025"
      ).then((result) => {
        console.log(result);
      });
    },
    async createFraction() {
      await EtherController.createFraction(
        "0xC69c524E62E9A313530381D47CB3F892763f1E3C",
        "1"
      )
        .then((res) => {
          this.fractions.push(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getFractionDebt(fractionAddress) {
      fractionAddress = this.fractionAddress_input
      await EtherController.getFractionDebt(fractionAddress)
        .then((res) => {
          console.log("Debt ->",res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getCredits() {
      await EtherController.getCredits()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    },
    async payFraction() {
      await EtherController.payFraction("0xB9d3da95f746127E55Baf17c13a2148B3e3A72FE", "1.0")
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
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