<template>
  <main>
    <NavComponent view="Dashboard" />
    <div v-if="group" class="container mb-5">
     <div class="border border-1 rounded-3 m-4 d-lg-none">
        <div class="d-flex">
          
          <div class="col-12 text-center m-3 my-4">
            <p class="fw-bold fs-2 mb-4">{{ group.name }}</p>
          </div>
          <!-- <div class="col-1 col-md-1 ms-auto m-3">
            <router-link to="">
              <img class="img-fluid" src="/gear.png" alt="" />
            </router-link>
          </div> -->
        </div>
        <div class="row justify-content-center">
          <div class="col-3 text-center fw-bold">
            <p class="mb-0 text-secondary">{{numUsers}}</p>
            <p>Miembros</p>
          </div>
          <div v-if="!group.isEtherGroup" class="col-3 text-center fw-bold">
            <p class="mb-0 text-secondary">{{totalGasto}}</p>
            <p>Gastos</p>
          </div>
          <div v-if="!group.isEtherGroup" class="col-3 text-center fw-bold">
            <p class="mb-0 text-secondary">{{totalDeuda}}€</p>
            <p>Debes</p>
          </div>
        </div>
      </div>
      <div class="d-none d-lg-block container-fluid mt-5">
        <div class="card">
          <div class="card-body d-flex justify-content-evenly">
            <h1 class="fs-2">{{group.name}}</h1>
          </div>
          <div class="card-body d-flex justify-content-evenly">
            <div class="col-3 text-center fw-bold">
              <p class="mb-0 text-secondary">{{numUsers}}</p>
              <p>Miembros</p>
            </div>
            <div class="col-3 text-center fw-bold">
              <p class="mb-0 text-secondary">{{totalGasto}}</p>
              <p>Gastos</p>
            </div>
            <div v-if="!group.isEtherGroup" class="col-3 text-center fw-bold">
              <p class="mb-0 text-secondary">{{totalDeuda}}</p>
              <p>Debes</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Add groups button -->
      <div class="text-center justify-content-center d-lg-none">
        
          <router-link :to="`/group/${this.$route.params.id}/expense/create`" class="btn btn-primary rounded-pill btn-circle align-middle fw-bold fs-1">
            <img v-if="group.isEtherGroup" class="mb-2" src="/ether.png" height="35" alt="">
            <p v-else>+</p>
          </router-link>
      </div>


      <!-- Groups container -->
      <div v-if="group != null && isLoaded"  class="row justify-content-center mt-4 mx-auto">
        <div v-for="expense in group.expenses"  :key="expense._id"  class="col-lg-4 col-xs col-md-6 col-sm-6 my-3">
          <ExpenseCard v-if="isLoaded"
          :name="expense.name"
          :id="expense._id"
          :description="expense.description"
          :data="new Date(expense.date).toDateString()"
          :amount="expense.amount"
          :fractions="expense.fractions"
          :isEther="group.isEtherGroup"
          :payerId="expense.payer"
          />
           
        </div>
      </div>
    </div>
        <footer class="footer d-none d-lg-block fixed-bottom py-3 bg-light text-center">
      <router-link :to="`/group/${this.$route.params.id}/expense/create`" class="btn btn-primary rounded-pill">Crear gasto</router-link>
    </footer>
  </main> 
</template>
<script>
import ExpenseCard from "../components/ExpenseCard.vue";
import EthereumController from "../blockchain/ethereumController";
import { ref } from "vue";
export default {
  components: {
    ExpenseCard,
  },
  data() {
    return {
      error: null,
      EthereumController: null,
      isLoaded: false,
      group: {
        expenses: [],
        isEtherGroup: false,
        users: [],
      },
    };
  },
  async mounted() {
    this.EthereumController = await EthereumController.getInstance()
    await this.getGroup();
    console.log("this.group", this.group);
  },
  methods: {
    async getGroup() {
      const res = await fetch(
        import.meta.env.VITE_APP_URL_API + "/group/" + this.$route.params.id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.$auth.token,
          },
        }
      );
      const data = await res.json();
      if (data.etherExpenses) {
        data.expenses = data.etherExpenses;
        this.group = await this.getFractionsInfo(data);
      } else {
        this.isLoaded = true;
        this.group = data;
      }
    },
    async getFractionsInfo(group) {
      for (let expenseIndex = 0; expenseIndex < group.expenses.length; expenseIndex++) {
        const expense = group.expenses[expenseIndex];
        for (let fractionIndex = 0; fractionIndex < expense.fractions.length; fractionIndex++) {
          let fraction = expense.fractions[fractionIndex];
          fraction = {
            address: fraction,
          };
          const debtorWalletAddress = await this.EthereumController.getFractionDebtor(
            fraction.address
          );
          fraction.user = group.users.find(
            (user) => user.walletAddress === debtorWalletAddress
          );
          expense.fractions[fractionIndex] = fraction;
        }        
      }
      this.isLoaded = true;
      return group;
    },
    async createExpense() {
      if (this.group.isEtherGroup) {
        this.$router.push(`/group/${this.$route.params.id}/expense/create`);
      } else {
        this.$router.push(`/group/${this.$route.params.id}/expense/create`);
      }
    },
  },
  computed: {
    numUsers() {
      let numUsers = 0;
      if (this.group) {
        numUsers = this.group.users.length;
      }
      return numUsers;
    },
    totalGasto() {
      let gasto = 0;
      // verifico si cargo el grupo
      if (this.group) {
        let expenses = this.group.expenses;
        // recorro todos los gastos del grupo
        expenses.forEach((expense) => {
          let i = 0;
          let existeUser = false;
          // recorro las fracciones del grupo
          while (i < expense.fractions.length && !existeUser) {
            let fraction = expense.fractions[i];
            // verifico si en este gasto tiene que pagar algo el usuario logeado
            if (fraction.user._id === this.$auth.userId) {
              // gasto += fraction.amount;
              gasto += expense.amount;
              existeUser = true;
            }
            i++;
          }
        });
      }
      return Number.parseFloat(gasto).toFixed(2);
    },
    totalDeuda() {
      let deuda = 0;
      if (this.group) {
        let expenses = this.group.expenses;
        // recorro los gastos
        expenses.forEach((expense) => {
          let fractions = expense.fractions;
          // recorro las fraciones
          fractions.forEach((fraction) => {
            if (fraction.user._id === this.$auth.userId) {
              deuda += fraction.amount;
            }
          });
        });
      }
      return Number.parseFloat(deuda).toFixed(2);
    },
  },
};
</script>