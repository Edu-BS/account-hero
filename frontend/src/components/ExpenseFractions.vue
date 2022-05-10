<template>
<div>
    <div v-for="fraction in fractions" :key="fraction._id" class="row mt-3">
        <div class="col-4">
            {{ fraction.user.username }}
        </div>
        <div class="col-4">
            {{ fraction.amount }}€
        </div>
        <div class="col-4" :style="statusColor(fraction.state)">
            <div v-if="fraction.state == 'Pendiente' && this.$auth.userName == payer.username">
                <router-link to="" class="btn btn-outline-warning text-black rounded-pill btn-sm align-middle">Confirmar</router-link>
            </div>
            <div v-else>
                {{ fraction.state }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
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
  },
};
</script>

<style>
</style>