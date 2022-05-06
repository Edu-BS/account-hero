<template>
<div>
    <div v-for="fraction in fractions" :key="fraction._id" class="row mt-3">
        <div class="col-4">
            {{ fraction.username }}
        </div>
        <div class="col-4">
            {{ fraction.amount }}€
        </div>
        <div class="col-4" :style="statusColor(fraction.status)">
            <div v-if="fraction.status == 'Pendiente' && this.$auth.userName == payer.username">
                <router-link to="" class="btn btn-outline-warning text-black rounded-pill btn-sm align-middle">Confirmar</router-link>
            </div>
            <div v-else>
                {{ fraction.status }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      payer: {
        username: "edbosu",
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
    };
  },
  methods: {
    statusColor(status) {
      switch (status) {
        case "Pagado":
          return "color: green";
        case "Pendiente":
          return "color: orange";
        case "Sin pagar":
          return "color: red";
        default:
          return "";
      }
    },
  },
};
</script>

<style>
</style>