<template >
  <main>
    <NavComponent view="Expense" />
    <div v-if="!error" class="container text-center mt-4">
      <h1>{{expense.name}}</h1>
      <h6 class="text-muted">{{expense.date}}</h6>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum suscipit nam, consectetur repellendus quos eius quo aliquid error veritatis officiis tempora repudiandae ad tempore accusamus numquam quis voluptas magnam et.</p>
      <h3 class="">¿Quien a pagado?</h3>
      <p class="fs-5">{{expense.payer.username}}</p>
      <div class="container mt-5">
        <div class="row">
          <div class="col-4">
          </div>
          <div class="col-4 fw-bold">
            Gasto
          </div>
          <div class="col-4 fw-bold">
            Estado
          </div>
        </div>
        <ExpenseFractions :fractions="expense.fractions" :payer="expense.payer" />
      </div>
    </div>
    <div v-else class="container text-center mt-4">
      <h1>Error</h1>
      <p>{{error}}</p>
    </div>
    <footer v-if="this.$auth.userName !== expense.payer.username && !myFraction.isPaid" class="footer fixed-bottom py-3 bg-light green text-center">
      <button @click="payFraction" class="btn btn-primary rounded-pill">Pagar</button>
    </footer>
  </main>
</template>

<script>
import ExpenseFractions from "../components/ExpenseFractions.vue";
import ExpenseController from "../controllers/expenseController";
import EthereumController from "../blockchain/ethereumController";

export default {
  components: {
    ExpenseFractions,
  },
  data() {
    return {
      error: null,
      EthereumController: null,
      endpoint: import.meta.env.VITE_APP_URL_API,
      myFraction: {
        _id: "",
      },
      expense: {
        name: "",
        payer: {
          username: "",
        },
      },
      fractions: [],
    };
  },
  async created() {
    this.EthereumController = await EthereumController.getInstance();
    await this.getExpense();
  },
  methods: {
    async getExpense() {
      console.log("a");
      let expense = await ExpenseController.getExpense(
        `${this.endpoint}/etherExpense/${this.$route.params.id}`,
        this.$auth.token
      )
        .then(async (response) => {
          response.date = response.date.toDateString();
          console.log(response.fractions);
          return response;
        })
        .catch((error) => {
          this.error = error;
        });
      await this.setFractionsInfo(expense.fractions);

      this.expense = expense;
      this.expense.fractions = this.fractions;
    },
    async setFractionsInfo(_fractionsAddress) {
      for (const address of _fractionsAddress) {
        let fractionInfo = await this.EthereumController.getFractionInfo(
          address
        );
        // fractionInfo.amount = fractionInfo.debt
        fractionInfo.user = await this.getUserByWalletAddress(
          fractionInfo.debtor
        );
        fractionInfo.address = address;

        if (fractionInfo.isPaid) {
          fractionInfo.state = "Pagado";
        } else {
          fractionInfo.state = "Sín pagar";
        }

        this.fractions.push(fractionInfo);
        
      }
      console.log(this.fractions);
      console.log(this.EthereumController.address);
      // this.myFraction = this.fractions.find(fraction => fraction.debtor == this.EthereumController.address);
    },
    async getUserByWalletAddress(walletAddress) {
      return await fetch(`${this.endpoint}/user/wallet/${walletAddress}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.$auth.token}`,
        },
      })
        .then(async (response) => {
          return await response.json();
        })
        .catch((error) => {
          this.error = error;
        });
    },
    async payFraction() {
      console.log(this.expense);
      let myFraction = this.expense.fractions.find(fraction => fraction.user.username == this.$auth.userName);
      this.EthereumController.payFraction(myFraction.address, myFraction.debt);
      await this.getExpense()
    }
  },
};
</script>

<style>
</style>