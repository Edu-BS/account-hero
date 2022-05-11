<template>
<router-link :to="'/expense/' + id" style="text-decoration: none; color: inherit;">
   <div class="card">
    <h5 class="card-header">{{name}}</h5>
    <div class="card-body">
      <p class="card-text">Descripcion: {{description}}</p>
      <p class="card-text">Fecha: {{data}}</p>
      <p class="card-text">Monto: {{amount}}</p>
      <ul class="list-group list-group-flush">
        <p class="card-text">usuarios:</p>
        <li v-for="fraction in fractions" :key="fraction._id" 
            class="list-group-item">
            {{fraction.user.username}} <span :class="colorClass(fraction)">{{fraction.amount}}</span>
        </li>
      </ul>
    </div>
  </div>
</router-link>
</template>

<script>
export default {
    props: {
        id: String,
        name: String,
        description: String,
        data: String,
        fractions: Array,
        amount: Number
    },
    methods: {
      
    },

    created() {
      console.log(this.fractions)
    },

    methods : {

      colorClass(fraction) {
        if (fraction.state === "unpaid") {
          return "text-danger"
        } else if (fraction.state === "pending") {
          return "text-warning"
        } else  {
          return "text-success"
        }
      }
    }
};
</script>

<style>
</style>