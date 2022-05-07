<template>
  <main>
    <NavComponent view="Expense" />
    <div class="container text-center mt-4">
      <h1>{{expense.title}}</h1>
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
    <footer v-if="this.$auth.userName !== expense.payer.username" class="footer fixed-bottom py-3 bg-light green text-center">
      <router-link :to="`/expense/${expense.id}/pay`" class="btn btn-primary rounded-pill">Pagar</router-link>
    </footer>
  </main>
</template>

<script>
import ExpenseFractions from "../components/ExpenseFractions.vue";

export default {
  components: {
    ExpenseFractions,
  },
  data() {
    return {
      expense: {
        id: "1",
        title: "Cena bar",
        description: "Cena en el bar de la esquina",
        date: new Date("2020-05-01").toDateString(),
        payer: {
          name: "Edu",
          username: "mrey",
        },
        fractions: [
          {
            _id: "5e9f8f8f8f8f8f8f8f8f8f8",
            username: "User1",
            amount: "100",
            status: "Pagado",
          },
          {
            _id: "fds",
            username: "User2",
            amount: "80",
            status: "Sin pagar",
          },
          {
            _id: "5e9f8f8f8f8f8f8f8f8f8",
            username: "User3",
            amount: "100",
            status: "Pendiente",
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>