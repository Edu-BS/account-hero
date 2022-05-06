<template>
  <main>
    <NavComponent view="Expense" />
    <div class="container text-center mt-4">
      <h1>{Nombre del gasto}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum suscipit nam, consectetur repellendus quos eius quo aliquid error veritatis officiis tempora repudiandae ad tempore accusamus numquam quis voluptas magnam et.</p>
      <h3 class="fw-bold">¿Quien a pagado?</h3>
      <p class="fs-5">{Usuario X}</p>
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
        <ExpenseFractions />
      </div>
    </div>
    <footer class="footer fixed-bottom py-3 bg-light green text-center">
      <router-link to="/expense/pay" class="btn btn-primary rounded-pill">Pagar</router-link>
    </footer>
  </main>
</template>

<script>
import ExpenseFractions from "../components/ExpenseFractions.vue";

export default {
  components: {
    ExpenseFractions
  },
}
</script>

<style>

</style>