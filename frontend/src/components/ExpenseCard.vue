<template>
<a @click="goToExpense" v-if="EthereumController" style="text-decoration: none; color: inherit;">
   <div class="card card-efect">
    <h5 class="card-header">{{name}}</h5>
    <div class="card-body">
      <p class="card-text">Descripcion: {{description}}</p>
      <p class="card-text">Fecha: {{data}}</p>
      <p class="card-text">Monto: {{Number.parseFloat(amount).toFixed(2)}}</p>
      <ul class="list-group list-group-flush">
        
        <p class="card-text">Usuarios:</p>
        <li class="list-group-item">
          <span v-if="isEther">
            <b>{{this.$auth.userName}}</b> <span class="text-success">{{myAmount()}} ETH</span>
          </span>
          <span v-else>
            <b>{{myFraction.user.username}}</b> <span :class="colorClass(myFraction)">{{Number.parseFloat(myFraction.amount).toFixed(2)}}</span>
          </span>

        </li>
        <li v-for="fraction in fractions.filter(fraction => fraction.user.username !== this.$auth.userName)"  :key="fraction._id" class="list-group-item">
          <span v-if="isEther">
            {{fraction.user.username}} <span :class="colorClass(fraction)">{{getEtherFractionDebt(fraction.address)}} ETH</span>
          </span>
          <span v-else>
            {{fraction.user.username}} <span :class="colorClass(fraction)">{{Number.parseFloat(fraction.amount).toFixed(2)}}</span>
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
      etherFractions: []
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
  },
  methods: {},
  async created() {
    if (this.isEther) {
      this.EthereumController = await EthereumController.getInstance();
      this.etherFractions =  await this.getEtherFractionsInfo()
    }
  },
  computed: {
    myFraction() {
      return this.fractions.find((fraction) => {
        return fraction.user.username === this.$auth.userName;
      });
    },
  },
  methods: {
    colorClass(fraction) {
     if (this.isEther) {
       if (fraction.isPaid) {
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
      return etherFractions;
    },
    getEtherFractionDebt(address) {
      let fraction = this.etherFractions.find(fraction => fraction.address === address);
      return fraction.debt
    },
    myAmount() {
      let otherDebts = 0
      this.etherFractions.forEach(fraction => {
        otherDebts += parseInt(fraction.debt)
      })
      return this.amount - otherDebts
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