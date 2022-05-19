<template>
<a @click="goToExpense" style="text-decoration: none; color: inherit;">
   <div class="card card-efect" :class="{'border-2': this.$auth.userId == payerId}">
    <h5 class="card-header">{{name}}</h5>
    <div class="card-body">
      <p class="card-text">Descripcion: {{description}}</p>
      <p class="card-text">Fecha: {{data}}</p>
      <p class="card-text">Monto: {{Number.parseFloat(amount).toFixed(2)}}</p>
        <!-- {{etherFractions}} -->
      <ul v-if="!isEther" class="list-group list-group-flush">
        <p class="card-text">Usuarios:</p>
        <li class="list-group-item" v-if="!isEther">
          <span >
            <b>{{myFraction.user.username}}</b> <span :class="colorClass(myFraction)">{{Number.parseFloat(myFraction.amount).toFixed(2)}}</span>
          </span>

        </li>
        <li v-for="fraction in fractions.filter(fraction => fraction.user.username !== this.$auth.userName)" :key="fraction._id" class="list-group-item">
          <span >
            {{fraction.user.username}} <span :class="colorClass(fraction)">{{Number.parseFloat(fraction.amount).toFixed(2)}}</span>
          </span>
        </li>
      </ul>
      <ul v-else-if="isEtherLoaded" class="list-group list-group-flush">
        <li v-for="fraction in fractions" :key="fraction._id" class="list-group-item">
          <span >
            <!-- {{fraction}} -->
            {{fraction.user.username}} <span :class="colorClass(fraction)">{{getEtherFractionDebt(fraction.address)}} ETH</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</a>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core';
import EthereumController from "../blockchain/ethereumController";

export default {
  data() {
    return {
      EthereumController: null,
      etherFractions: [],
      isLoaded: false,
      isEtherLoaded: false,
    }
  },
  props: {
    id: String,
    name: String,
    description: String,
    data: String,
    fractions: Array,
    amount: Number,
    isEther: Boolean,
    payerId: String,
  },
  async created() {
    if (this.isEther) {
      this.EthereumController = await EthereumController.getInstance();
      this.etherFractions =  await this.getEtherFractionsInfo()
    }
  },
  watch:{
    etherFractions: {
      handler(newFractions) {
        this.isEtherLoaded = true;
      },
      deep: true,
    },
  },
  computed: {
    myFraction() {
      if (!this.isEther) {
        return this.fractions.find((fraction) =>  fraction.user.username === this.$auth.userName);
      } else if (this.payerId == this.$auth.userId) {
        return {
          user: {
            username: this.$auth.userName,
          },
          isPaid: true,
          address: null,
          amount: this.myAmount(),
        }
      } else {
        return this.fractions.find((fraction) =>  fraction.user.username === this.$auth.userName);
      }
    },
  },
  methods: {
    colorClass(fraction) {
     if (this.isEther) {
       let etherFraction = this.etherFractions.find(etherFraction => etherFraction.address === fraction.address)
       console.log("etherFraction", etherFraction);
       if (etherFraction.isPaid) {
         return 'text-success'
       } else {
         return 'text-danger'
       }
     } else {
        if (fraction.state === "unpaid") {
          return "text-danger";
        } else if (fraction.state === "pending") {
          return "text-warning";
        } else {
          return "text-success";
        }
     }
    },
    goToExpense() {
      if (this.isEther) {
        this.$router.push(`/etherExpense/${this.id}`);
      } else {
        this.$router.push(`/expense/${this.id}`);
      }
    },
    async getEtherDebt(address) {
      const debt = await this.EthereumController.getFractionDebt(address)
      return debt;
    },
    async getEtherFractionsInfo() {
      const etherFractions = []
      for (const fraction of this.fractions) {
        let etherFraction = await this.EthereumController.getFractionInfo(fraction.address)
        etherFraction.address = fraction.address
        etherFractions.push(etherFraction);
      }
      this.isLoaded = true;
      return etherFractions;
    },
    getEtherFractionDebt(address) {
      if (this.etherFractions.length > 0 && address) {
        console.log(address, this.etherFractions);
        let fraction = this.etherFractions.find(fraction => fraction.address === address);
        return fraction.debt
      } else {
        return 0
      }
    },
    myEtherFraction() {
      let myFraction = this.fractions.find(fraction => fraction.user.username === this.$auth.userName)
      let myEtherFraction = this.etherFractions.find(fraction => fraction.address === myFraction.address)
      return myEtherFraction
    },
    myAmount() {
      let amount = 0
      console.log(this.payerId == this.$auth.userId);
      if (this.payerId === this.$auth.userId) {
        let otherDebts = 0
        this.etherFractions.forEach(fraction => {
          otherDebts += parseInt(fraction.debt)
        })
        amount = this.amount - otherDebts
      } else {
          console.log("this.fraction", this.fractions);
          let myFraction = this.fractions.find(fraction => fraction.user.username === this.$auth.userName)
          console.log("myFraction", myFraction);
          console.log("this.etherFractions", this.etherFractions);
          let myEtherFraction = this.etherFractions.find(fraction => fraction.address === myFraction.address)
          amount = myEtherFraction.debt 
      }
      return amount
    }
  },
};
</script>


<style>
.card-efect {
  transition: width 2s, left 2s, height 2s, opacity 2s, transform 0.5s;
  /*el transition tambien puedo el top*/
  -moz-transition: width 2s, left 2s, height 2s, opacity 2s, transform 0.5s;
}

.card-efect:hover {
  transform: scale(1.2);
  z-index: 90;
  box-shadow: 2px 2px 10px #666;
}
</style>