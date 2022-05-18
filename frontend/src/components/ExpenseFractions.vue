<template>
<div>
    <div v-if="this.error" class="alert alert-warning alert-dismissible fade show" role="alert">
    {{ this.error }}
    <button @click="deleteError" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div v-for="fraction in fractions" :key="fraction._id" class="row mt-3">
        <div class="col-4">
            {{ fraction.user.username }}
        </div>
        <div class="col-4">
            <p v-if="fraction.debt">{{ fraction.debt }} ETH</p>
            <p v-else-if="fraction.amount">{{ fraction.amount }}€</p>
        </div>
        <div class="col-4" :style="statusColor(fraction.state)">
            <div v-if="fraction.state == 'Pendiente' && this.$auth.userName == payer.username">
                <button @click="confirmFraction(fraction._id)" class="btn btn-outline-warning text-black rounded-pill btn-sm align-middle">Confirmar</button>
            </div>
            <div v-else>
                {{ fraction.state }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import FractionController from "../controllers/fractionController";

export default {
  props: {
    error: null,
    fractions: {
      type: Object,
      required: true,
    },
    payer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    statusColor(status) {
      switch (status) {
        case "Pagado":
          return "color: green";
        case "Pendiente":
          return "color: orange";
        case "Sín pagar":
          return "color: red";
        default:
          return "";
      }
    },
    async confirmFraction(fractionId) {
      await FractionController.confirmFraction(`${this.$parent.endpoint}/fraction/${fractionId}/confirm`, this.$auth.token)
        .then((response) => {
          if (response.state == 'paid') {
            this.fractions.find(fraction => fraction._id == fractionId).state = "Pagado";
          }
        })
        .catch((error) => {
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