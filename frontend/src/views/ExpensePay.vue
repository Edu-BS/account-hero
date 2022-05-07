<template>
    <main >
        <NavComponent />
        <div class="container mt-4">
            <h1 class="text-center">Confirmar el pago</h1>
            <div class="row mt-3">
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Gasto</h5>
                            <h6 class="card-subtitle mb-4 text-muted">{{ expense.date }}</h6>
                            <p class="card-text fw-bold">{{ expense.name }}</p>
                            <p class="card-text">{{ expense.description }}</p>
                            <p class="card-text">{{ expense.amount }}€</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 mt-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Receptor del pago</h5>
                            <p class="card-text">{{ expense.payer.name }}</p>
                            <p class="card-text">{{ expense.payer.username }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-4">
                <button class="btn btn-primary rounded-pill d-lg-none">Pagar el gasto</button>
            </div>
        </div>
        <footer class="footer fixed-bottom py-3 bg-light d-none d-lg-block green text-center">
            <button type="button" class="btn btn-primary rounded-pill">Pagar el gasto</button>
        </footer>
    </main>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
    
  },
};
</script>

<style>
</style>