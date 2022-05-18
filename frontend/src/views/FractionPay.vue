<template>
    <main >
        <NavComponent />
        <div class="container mt-4">
          <div v-if="this.error" class="alert alert-warning alert-dismissible fade show" role="alert">
            {{ this.error }}
            <button @click="deleteError" type="button" class="btn-close" data-bs-dismiss="alert"
              aria-label="Close"></button>
          </div>
            <h1 class="text-center">Confirmar el pago</h1>
            <div class="row mt-3">
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Gasto</h5>
                            <h6 class="card-subtitle mb-4 text-muted">{{ expense.date }}</h6>
                            <p class="card-text fw-bold">{{ expense.name }}</p>
                            <p class="card-text">{{ expense.description }}</p>
                            <p class="card-text">{{ fraction.amount }}€</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 mt-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Receptor del pago</h5>
                            <p class="card-text">{{ expense.payer.username }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer fixed-bottom py-3 bg-light  green text-center">
            <button @click="payFraction" type="button" class="btn btn-primary rounded-pill">Pagar el gasto</button>
        </footer>
    </main>
</template>

<script>
import FractionController from "../controllers/fractionController";
export default {
  data() {
    return {
      error: null,
      endpoint: import.meta.env.VITE_APP_URL_API,
      expense: {
        payer: {
          username: "",
        },
      },
      fraction: {
        name: "Cena bar",
        description: "Cena en el bar de la esquina",
        amount: 10,
        date: new Date("2020-05-01").toDateString(),
        payer: {
          name: "Edu",
          username: "edubs",
        },
      },
    };
  },
  created() {
    this.getFraction();
  },
  methods: {
    async getFraction() {
      const fraction = await FractionController.getFraction(
        `${this.endpoint}/expense/${this.$route.params.expenseId}/fraction/${this.$route.params.fractionId}`,
        this.$auth.token
      ).then((response) => {
        response.date = new Date(response.date).toDateString();
        this.fraction = response.fractions;
        this.expense = response;
      });
    },
    async payFraction() {
      console.log(this.fraction._id);
      await FractionController.payFraction(
        `${this.endpoint}/fraction/${this.fraction._id}/pay`,
        this.$auth.token
      )
        .then((response) => {
          this.$router.push(`/expense/${this.$route.params.expenseId}`);
        })
        .catch((error) => {
          console.log(error);
          this.error = error.message;
        });
    },
    deleteError() {
      this.error = null;
    }
  },
};
</script>

<style>
</style>