<template>
  <main>
    <NavComponent view="Dashboard" />
    
    <div class="container mb-5">
     <div class="border border-1 rounded-3 m-4 d-lg-none">
        <div class="d-flex">
          <div class="col-3 col-md-2 m-3 me-0">
            <img class="img-fluid" src="../../public/profile_icon.png" alt="" />
          </div>
          <div class="col-auto ms-3 m-3">
            <p class="fw-bold fs-4">{{ this.$auth.userName }}</p>
          </div>
          <div class="col-1 col-md-1 ms-auto m-3">
            <router-link to="">
              <img class="img-fluid" src="../../public/gear.png" alt="" />
            </router-link>
          </div>
        </div>
        <div class="row justify-content-center fs-4">
          <div class="col-3 text-center fw-bold">
            <p class="mb-0 text-secondary">{{numUsers}}</p>
            <p>Miembros</p>
          </div>
          <div class="col-3 text-center fw-bold">
            <p class="mb-0 text-secondary">{{totalGasto}}</p>
            <p>Gastos</p>
          </div>
          <div class="col-3 text-center fw-bold">
            <p class="mb-0 text-secondary">{{totalDeuda}}</p>
            <p>Debes</p>
          </div>
        </div>
      </div>

      <!-- Add groups button -->
      <div class="text-center justify-content-center d-lg-none">
          <router-link :to="'/group/' + this.$route.params.id + '/expense/create'" class="btn btn-primary rounded-pill btn-circle align-middle fw-bold fs-1">+</router-link>
      </div>



          <!-- Groups container -->
      <div v-if="group != null" class="row justify-content-center mt-4 mx-auto">
        <div v-for="expense in group.expenses"  :key="expense._id"  class="col-lg-4 col-xs col-md-6 col-sm-6 my-3">
          <ExpenseCard 
          :name="expense.name"
          :id="expense._id"
          :description="expense.description"
          :data="new Date(expense.date).toDateString()"
          :amount="expense.amount"
          :fractions="expense.fractions"
          />
        </div>
      </div>

    </div>
        <footer class="footer d-none d-lg-block fixed-bottom py-3 bg-light text-center">
      <router-link :to="'/group/' + this.$route.params.id + '/expense/create'" class="btn btn-primary rounded-pill">Crear gasto</router-link>
    </footer>
  </main> 
</template>
<script>
import ExpenseCard from "../components/ExpenseCard.vue";


export default {

  components : {
    ExpenseCard
  },
    data() {
        return {
            group: null
        };
    },
    created() {
        this.getGroup();
    },
    methods: {
        async getGroup() {
            const res = await fetch(import.meta.env.VITE_APP_URL_API + "/group/" + this.$route.params.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + this.$auth.token,
                },
            });
            const data = await res.json();
            this.group = data;
        }
    },
    computed: {
        numUsers() {
            let numUsers = 0;
            console.log(this.group)
            if (this.group) {
                numUsers = this.group.users.length;
            }
            return numUsers;
        },
        totalGasto() {
            let gasto = 0;
            // verifico si cargo el grupo
            if (this.group) {
                let expenses = this.group.expenses;
                // recorro todos los gastos del grupo 
                expenses.forEach(expense => {
                    let i = 0;
                    let existeUser = false;
                    // recorro las fracciones del grupo 
                    while (i < expense.fractions.length && !existeUser) {
                        let fraction = expense.fractions[i];
                        // verifico si en este gasto tiene que pagar algo el usuario logeado 
                        if (fraction.user === this.$auth.userId) {
                            gasto += expense.amount;
                            existeUser = true;
                        }
                        i++;
                    }
                });
            }
            return Number.parseFloat(gasto).toFixed(2);
        },
        totalDeuda() {
            let deuda = 0;
            if (this.group) {
                let expenses = this.group.expenses;
                // recorro los gastos 
                expenses.forEach(expense => {
                    let fractions = expense.fractions;
                    // recorro las fraciones 
                    fractions.forEach(fraction => {
                        if (fraction.user === this.$auth.userId) {
                            deuda += fraction.amount;
                        }
                    });
                });
            }
            return Number.parseFloat(deuda).toFixed(2);
        }
    },
}
</script>