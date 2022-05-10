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
    <footer v-if="this.$auth.userName !== expense.payer.username" class="footer fixed-bottom py-3 bg-light green text-center">
      <router-link :to="`/expense/${expense.id}/pay`" class="btn btn-primary rounded-pill">Pagar</router-link>
    </footer>
  </main>
</template>

<script>
import ExpenseFractions from "../components/ExpenseFractions.vue";
import ExpenseController from "../controllers/expenseController";

export default {
  components: {
    ExpenseFractions,
  },
  data() {
    return {
      error: null,
      endpoint: import.meta.env.VITE_APP_URL_API,
      expense: {
        name: "",
        payer: {
          username: "",
        },
      },
    };
  },
  created() {
    this.getExpense();
  },
  methods: {
    async getExpense() {
      const expense = await ExpenseController.getExpense(
        `${this.endpoint}/expense/${this.$route.params.id}`,
        this.$auth.token
      )
        .then((response) => {
          response.date = response.date.toDateString();
          for (let index = 0; index < response.fractions.length; index++) {
            // console.log(response.fractions[index].state);
            switch (response.fractions[index].state) {
              case "payed":
                response.fractions[index].state = "Pagado";
                break;
              case "pending":
                response.fractions[index].state = "Pendiente";
                break;
              case "unpaid":
                response.fractions[index].state = "Sín pagar";
                break;
            }
          }
          this.expense = response;
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
  },
};
</script>

<style>
</style>