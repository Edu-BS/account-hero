<template>
<a @click="goToExpense" style="text-decoration: none; color: inherit;">
   <div class="card card-efect">
    <h5 class="card-header">{{name}}</h5>
    <div class="card-body">
      <p class="card-text">Descripcion: {{description}}</p>
      <p class="card-text">Fecha: {{data}}</p>
      <p class="card-text">Monto: {{Number.parseFloat(amount).toFixed(2)}}</p>
      <ul class="list-group list-group-flush">
        
        <p class="card-text">Usuarios:</p>
        <li class="list-group-item">
          <b>{{myFraction.user.username}}</b> <span :class="colorClass(myFraction)">{{Number.parseFloat(myFraction.amount).toFixed(2)}}</span>
        </li>
        <li v-for="fraction in fractions.filter(fraction => fraction.user.username !== this.$auth.userName)"  :key="fraction._id" class="list-group-item">
          <!-- <div  !== this.$auth.userName"> -->
            {{fraction.user.username}} <span :class="colorClass(fraction)">{{Number.parseFloat(fraction.amount).toFixed(2)}}</span>
          <!-- </div> -->
        </li>
      </ul>
    </div>
  </div>
</a>
</template>

<script>
export default {
  props: {
    id: String,
    name: String,
    description: String,
    data: String,
    fractions: Array,
    amount: Number,
    isEther: Boolean,
  },
  methods: {},
  created() {},
  computed: {
    myFraction() {
      return this.fractions.find((fraction) => {
        return fraction.user.username === this.$auth.userName;
      });
    },
  },
  methods: {
    colorClass(fraction) {
      if (fraction.state === "unpaid") {
        return "text-danger";
      } else if (fraction.state === "pending") {
        return "text-warning";
      } else {
        return "text-success";
      }
    },
    goToExpense() {
      if (this.isEther) {
        this.$router.push(`/etherExpense/${this.id}`);
      } else {
        this.$router.push(`/expense/${this.id}`);
      }
    },
  },
};
</script>


<style>
.card-efect {
  transition: width 2s, left 2s, height 2s, opacity 2s, transform 0.5s;
  /*el transition tambien puedo el top*/
  -moz-transition: width 2s, left 2s, height 2s, opacity 2s, transform 0.5s;
}

.card-efect:hover {
  transform: scale(1.2);
  z-index: 90;
  box-shadow: 2px 2px 10px #666;
}
</style>